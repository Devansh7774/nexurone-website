#!/usr/bin/env node
/**
 * Hostinger / supply-chain malware scanner + cleaner
 *
 * Detects the obfuscated payload that was previously injected into
 * postcss.config.mjs (crypto-miner / remote-eval style malware).
 *
 * Usage:
 *   node scripts/security-clean.js           # scan only (exit 1 if infected)
 *   node scripts/security-clean.js --fix    # scan + auto-clean known files
 *   node scripts/security-clean.js --strict  # also fail on suspicious package scripts
 *
 * Wired as:
 *   npm run security:scan
 *   npm run security:clean
 *   npm run build  (prebuild runs the scanner)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = new Set(process.argv.slice(2));
const DO_FIX = args.has('--fix') || args.has('-f');
const STRICT = args.has('--strict');

/** Known-good postcss config (Tailwind v4). */
const CLEAN_POSTCSS = `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`;

/**
 * Patterns matching the Hostinger-injected malware family and similar payloads.
 * Keep these specific enough to avoid false positives in normal app code.
 */
const MALWARE_PATTERNS = [
  { id: 'obfuscator-hex-fn', re: /_0x[a-f0-9]{4,}\s*=\s*_0x[a-f0-9]{4,}/i },
  { id: 'global-i-marker', re: /global\.i\s*=\s*['"]A10-\*\d/ },
  { id: 'block-multiple', re: /\bBLOCK_MULTIPLE\s*=\s*0x[0-9a-f]+n\b/ },
  { id: 'nonce-fanout', re: /\bNONCE_FANOUT\s*=/ },
  { id: 'indexer-url', re: /\bINDEXER_URL\s*=/ },
  { id: 'rpc-endpoints', re: /\bRPC_ENDPOINTS\s*=/ },
  { id: 'spawn-detached', re: /spawn\s*\([^)]*detached\s*:\s*!?\s*\(/ },
  { id: 'eval-payload', re: /\beval\s*\(\s*_0x/ },
  { id: 'eth-rpc-calls', re: new RegExp(['eth', '_getBlo|eth', '_blockN|eth', '_getTra'].join('')) },
  { id: 'createRequire-hijack', re: /createRequire\(import\.meta\.url\)[\s\S]{0,200}export default config[\s\S]{50,}_0x/ },
  { id: 'appended-after-export', re: /export default config;\s*global\./ },
  { id: 'appended-after-export-obf', re: /export default config;\s*\S{0,40}_0x[a-f0-9]+/ },
];

const HIGH_RISK_FILES = [
  'postcss.config.mjs',
  'postcss.config.js',
  'postcss.config.cjs',
  'next.config.mjs',
  'next.config.js',
  'next.config.ts',
  'eslint.config.mjs',
  'eslint.config.js',
  'tailwind.config.js',
  'tailwind.config.ts',
  'tailwind.config.mjs',
  'middleware.js',
  'middleware.ts',
  'src/middleware.js',
  'src/middleware.ts',
  'proxy.js',
  'src/proxy.js',
];

const SCAN_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.json']);
const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
  'public',
  'uploads',
  'agent-transcripts',
]);

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith('.') && entry.name !== '.env.example') continue;

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!SCAN_EXTENSIONS.has(ext)) continue;

    // Skip huge vendor dumps
    try {
      if (statSync(full).size > 2_000_000) continue;
    } catch {
      continue;
    }

    out.push(full);
  }

  return out;
}

function matchPatterns(content) {
  const hits = [];
  for (const pattern of MALWARE_PATTERNS) {
    if (pattern.re.test(content)) hits.push(pattern.id);
  }
  return hits;
}

function isPostcssBloated(content) {
  // Clean postcss is ~100 bytes; infected copy was ~32KB
  return (
    content.includes('@tailwindcss/postcss') &&
    content.includes('export default config') &&
    content.length > 1500
  );
}

function checkPackageJsonScripts() {
  const pkgPath = path.join(ROOT, 'package.json');
  if (!existsSync(pkgPath)) return [];

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const scripts = pkg.scripts || {};
  const findings = [];
  const suspicious =
    /(curl\s|wget\s|powershell\s+-|Invoke-Expression|node\s+-e\s+.*_0x|eval\(|base64\s+-d|\/tmp\/|\\\\temp\\\\)/i;

  for (const [name, value] of Object.entries(scripts)) {
    if (suspicious.test(String(value))) {
      findings.push({
        file: 'package.json',
        hits: [`suspicious-script:${name}`],
        detail: String(value).slice(0, 160),
      });
    }
  }

  for (const hook of ['preinstall', 'install', 'postinstall', 'prepublish']) {
    if (scripts[hook] && /node\s|curl|wget|http/i.test(scripts[hook])) {
      // allow benign local scripts
      if (!String(scripts[hook]).includes('scripts/')) {
        findings.push({
          file: 'package.json',
          hits: [`risky-lifecycle:${hook}`],
          detail: scripts[hook],
        });
      }
    }
  }

  return findings;
}

function restorePostcss(filePath) {
  writeFileSync(filePath, CLEAN_POSTCSS, 'utf8');
}

function main() {
  console.log('Nexuron security scan');
  console.log(`Root: ${ROOT}`);
  console.log(`Mode: ${DO_FIX ? 'scan + fix' : 'scan only'}${STRICT ? ' (strict)' : ''}`);
  console.log('');

  const infected = [];
  const cleaned = [];
  const warnings = [];

  // 1) High-risk config files first
  for (const relPath of HIGH_RISK_FILES) {
    const full = path.join(ROOT, relPath);
    if (!existsSync(full)) continue;

    const content = readFileSync(full, 'utf8');
    const hits = matchPatterns(content);
    if (isPostcssBloated(content) && !hits.length) {
      hits.push('bloated-postcss');
    }

    if (!hits.length) continue;

    infected.push({ file: relPath, hits });

    if (DO_FIX && /postcss\.config\.(mjs|js|cjs)$/.test(relPath)) {
      restorePostcss(full);
      cleaned.push(relPath);
      console.log(`FIXED  ${relPath}  [${hits.join(', ')}]`);
    } else {
      console.log(`INFECTED  ${relPath}  [${hits.join(', ')}]`);
    }
  }

  // 2) Broader repo scan
  const files = walk(ROOT);
  for (const full of files) {
    const r = rel(full);
    if (HIGH_RISK_FILES.includes(r)) continue;
    if (r === 'scripts/security-clean.js') continue;

    // Prefer likely injection points; still scan app/source for this malware family
    const interesting =
      r.startsWith('scripts/') ||
      /(^|\/)(postcss|next|eslint|tailwind|middleware|proxy|instrumentation)/.test(r) ||
      r.startsWith('src/') ||
      !r.includes('/');

    if (!interesting) continue;

    let content;
    try {
      content = readFileSync(full, 'utf8');
    } catch {
      continue;
    }

    const hits = matchPatterns(content);
    if (!hits.length) continue;

    infected.push({ file: r, hits });
    console.log(`INFECTED  ${r}  [${hits.join(', ')}]`);
  }

  // 3) package.json lifecycle scripts
  const scriptFindings = checkPackageJsonScripts();
  for (const finding of scriptFindings) {
    if (STRICT) {
      infected.push(finding);
      console.log(`SUSPECT   ${finding.file}  [${finding.hits.join(', ')}]`);
    } else {
      warnings.push(finding);
      console.log(`WARN      ${finding.file}  [${finding.hits.join(', ')}]`);
    }
  }

  // Re-verify postcss after fix
  const postcssPath = path.join(ROOT, 'postcss.config.mjs');
  if (existsSync(postcssPath)) {
    const content = readFileSync(postcssPath, 'utf8');
    const hits = matchPatterns(content);
    if (hits.length || isPostcssBloated(content)) {
      if (DO_FIX) {
        restorePostcss(postcssPath);
        console.log('FIXED  postcss.config.mjs (forced restore)');
      } else {
        console.log('INFECTED  postcss.config.mjs still dirty');
      }
    } else {
      console.log('OK       postcss.config.mjs');
    }
  }

  console.log('');
  console.log(`Findings: ${infected.length}`);
  console.log(`Cleaned:  ${cleaned.length}`);
  console.log(`Warnings: ${warnings.length}`);

  const stillBad = infected.filter((item) => !cleaned.includes(item.file));
  if (stillBad.length) {
    console.error('');
    console.error('Security scan FAILED. Do not deploy until cleaned.');
    if (!DO_FIX) {
      console.error('Tip: run  npm run security:clean');
    }
    process.exit(1);
  }

  console.log('');
  console.log('Security scan PASSED.');
  process.exit(0);
}

main();
