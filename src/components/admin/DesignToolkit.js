'use client';

import { useState } from 'react';
import {
  Table, Palette, Type, AlertCircle, Code2, Copy, CheckCheck,
  ChevronDown, Plus, MousePointerClick, ImageIcon, BarChart3,
  HelpCircle, Play, Scale, Link2, ListOrdered,
} from 'lucide-react';
import { ImageInsertModal, VideoInsertModal, ButtonInsertModal } from './MediaInsertModal';
import SmoothCollapse from '@/components/ui/SmoothCollapse';

// ─── Ready-to-use blocks (Nexuron brand) ─────────────────────────────────────

const BLOCKS = {
  actions: [
    {
      id: 'button',
      label: 'Simple button',
      desc: 'Link or on-click action',
      icon: MousePointerClick,
      interactive: true,
    },
    {
      id: 'cta',
      label: 'CTA button',
      desc: 'Call-to-action with link',
      icon: MousePointerClick,
      html: `<div style="text-align:center;margin:2rem 0;padding:28px 24px;background:linear-gradient(135deg,#eff6ff,#f8fafc);border:1px solid #bfdbfe;border-radius:12px;">
  <p style="font-size:1.125rem;font-weight:700;color:#00102a;margin:0 0 8px;">Ready to grow your business?</p>
  <p style="color:#64748b;margin:0 0 16px;font-size:0.95rem;">Talk to our team and get a free consultation.</p>
  <a href="/contact" style="display:inline-block;background:#2f6bff;color:#fff;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:0.95rem;">Contact Nexuron</a>
</div>`,
    },
    {
      id: 'related-links',
      label: 'Related links',
      desc: 'Read also section',
      icon: Link2,
      html: `<div style="margin:1.5rem 0;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
  <p style="font-weight:700;color:#00102a;margin:0 0 12px;font-size:0.95rem;">📚 Read also</p>
  <ul style="margin:0;padding-left:18px;line-height:1.9;color:#334155;">
    <li><a href="/insights" style="color:#2f6bff;text-decoration:none;">Related article one</a></li>
    <li><a href="/case-study" style="color:#2f6bff;text-decoration:none;">Related article two</a></li>
    <li><a href="/contact" style="color:#2f6bff;text-decoration:none;">Related article three</a></li>
  </ul>
</div>`,
    },
  ],
  media: [
    {
      id: 'figure',
      label: 'Image + caption',
      desc: 'URL, alt text, size',
      icon: ImageIcon,
      interactive: true,
    },
    {
      id: 'video',
      label: 'YouTube video',
      desc: 'Paste link, set title & size',
      icon: Play,
      interactive: true,
    },
  ],
  callouts: [
    {
      id: 'info',
      label: 'Info tip',
      desc: 'Tips & notes',
      icon: AlertCircle,
      preview: 'bg-blue-50 border-l-4 border-blue-500 text-blue-900',
      html: `<div style="background:#eff6ff;border-left:4px solid #2f6bff;padding:16px 20px;border-radius:0 8px 8px 0;margin:1.25rem 0;">
  <p style="font-weight:700;color:#00102a;margin:0 0 6px;font-size:1rem;">💡 Quick tip</p>
  <p style="color:#334155;margin:0;line-height:1.6;">Replace this text with your tip or note for readers.</p>
</div>`,
    },
    {
      id: 'warning',
      label: 'Warning',
      desc: 'Important caution',
      icon: AlertCircle,
      preview: 'bg-amber-50 border-l-4 border-amber-500 text-amber-900',
      html: `<div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:16px 20px;border-radius:0 8px 8px 0;margin:1.25rem 0;">
  <p style="font-weight:700;color:#92400e;margin:0 0 6px;font-size:1rem;">⚠️ Important</p>
  <p style="color:#78350f;margin:0;line-height:1.6;">Replace this with a warning or caution message.</p>
</div>`,
    },
    {
      id: 'success',
      label: 'Success',
      desc: 'Positive result',
      icon: AlertCircle,
      preview: 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900',
      html: `<div style="background:#ecfdf5;border-left:4px solid #10b981;padding:16px 20px;border-radius:0 8px 8px 0;margin:1.25rem 0;">
  <p style="font-weight:700;color:#065f46;margin:0 0 6px;font-size:1rem;">✅ Success</p>
  <p style="color:#047857;margin:0;line-height:1.6;">Replace this with a positive result or achievement.</p>
</div>`,
    },
    {
      id: 'key-takeaway',
      label: 'Key takeaway',
      desc: 'Dark highlight box',
      icon: AlertCircle,
      preview: 'bg-[#00102a] text-white',
      html: `<div style="background:#00102a;color:#e2e8f0;padding:20px 24px;border-radius:12px;margin:1.25rem 0;">
  <p style="font-weight:700;color:#60a5fa;margin:0 0 8px;font-size:1rem;">📌 Key takeaway</p>
  <p style="margin:0;line-height:1.7;">Replace this with the main point you want readers to remember.</p>
</div>`,
    },
  ],
  content: [
    {
      id: 'faq',
      label: 'FAQ item',
      desc: 'Question + answer',
      icon: HelpCircle,
      html: `<div style="margin:1.25rem 0;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
  <div style="background:#f8fafc;padding:14px 18px;border-bottom:1px solid #e2e8f0;">
    <p style="font-weight:700;color:#00102a;margin:0;font-size:1rem;">Your question here?</p>
  </div>
  <div style="padding:14px 18px;background:#fff;">
    <p style="color:#475569;margin:0;line-height:1.7;">Your answer goes here. Add more FAQ blocks for each question.</p>
  </div>
</div>`,
    },
    {
      id: 'stats',
      label: 'Stats row',
      desc: '3 key numbers',
      icon: BarChart3,
      html: `<div style="display:flex;flex-wrap:wrap;gap:12px;margin:1.5rem 0;">
  <div style="flex:1;min-width:120px;text-align:center;padding:20px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
    <p style="font-size:1.75rem;font-weight:800;color:#2f6bff;margin:0;">50+</p>
    <p style="font-size:0.8rem;color:#64748b;margin:6px 0 0;font-weight:600;">Happy Clients</p>
  </div>
  <div style="flex:1;min-width:120px;text-align:center;padding:20px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
    <p style="font-size:1.75rem;font-weight:800;color:#2f6bff;margin:0;">5+</p>
    <p style="font-size:0.8rem;color:#64748b;margin:6px 0 0;font-weight:600;">Years Experience</p>
  </div>
  <div style="flex:1;min-width:120px;text-align:center;padding:20px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
    <p style="font-size:1.75rem;font-weight:800;color:#2f6bff;margin:0;">100%</p>
    <p style="font-size:0.8rem;color:#64748b;margin:6px 0 0;font-weight:600;">Client Satisfaction</p>
  </div>
</div>`,
    },
    {
      id: 'pros-cons',
      label: 'Pros & cons',
      desc: 'Side-by-side compare',
      icon: Scale,
      html: `<div style="display:flex;flex-wrap:wrap;gap:12px;margin:1.5rem 0;">
  <div style="flex:1;min-width:200px;padding:18px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;">
    <p style="font-weight:700;color:#065f46;margin:0 0 10px;">✓ Pros</p>
    <ul style="margin:0;padding-left:18px;color:#047857;line-height:1.8;"><li>First advantage</li><li>Second advantage</li></ul>
  </div>
  <div style="flex:1;min-width:200px;padding:18px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
    <p style="font-weight:700;color:#991b1b;margin:0 0 10px;">✗ Cons</p>
    <ul style="margin:0;padding-left:18px;color:#b91c1c;line-height:1.8;"><li>First limitation</li><li>Second limitation</li></ul>
  </div>
</div>`,
    },
    {
      id: 'pull-quote',
      label: 'Pull quote',
      desc: 'Quote with author',
      icon: Type,
      html: `<blockquote style="border:none;background:#f8fafc;padding:24px 28px;border-radius:12px;margin:1.5rem 0;border-left:4px solid #2f6bff;">
  <p style="font-size:1.15rem;font-style:italic;color:#334155;margin:0;line-height:1.7;">"Your inspiring quote goes here."</p>
  <footer style="margin-top:12px;font-size:0.875rem;color:#64748b;font-weight:600;">— Author name</footer>
</blockquote>`,
    },
    {
      id: 'badge',
      label: 'Label badge',
      desc: 'Small tag label',
      icon: Type,
      html: `<p style="margin:1rem 0;"><span style="display:inline-block;background:#2f6bff;color:#fff;font-size:0.75rem;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.04em;">YOUR LABEL</span></p>`,
    },
    {
      id: 'steps',
      label: 'Numbered steps',
      desc: '3-step process',
      icon: ListOrdered,
      html: `<ol style="list-style:none;padding:0;margin:1.25rem 0;">
  <li style="display:flex;gap:14px;align-items:flex-start;padding:14px;background:#f8fafc;border-radius:10px;margin-bottom:8px;border:1px solid #e2e8f0;">
    <span style="background:#2f6bff;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;flex-shrink:0;">1</span>
    <span style="padding-top:4px;color:#334155;">Describe step one here.</span>
  </li>
  <li style="display:flex;gap:14px;align-items:flex-start;padding:14px;background:#f8fafc;border-radius:10px;margin-bottom:8px;border:1px solid #e2e8f0;">
    <span style="background:#2f6bff;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;flex-shrink:0;">2</span>
    <span style="padding-top:4px;color:#334155;">Describe step two here.</span>
  </li>
  <li style="display:flex;gap:14px;align-items:flex-start;padding:14px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
    <span style="background:#2f6bff;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;flex-shrink:0;">3</span>
    <span style="padding-top:4px;color:#334155;">Describe step three here.</span>
  </li>
</ol>`,
    },
  ],
  tables: [
    {
      id: 'table-3col',
      label: 'Comparison table',
      desc: 'Feature vs options',
      icon: Table,
      html: `<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.95rem;">
  <thead>
    <tr style="background:#00102a;color:#fff;">
      <th style="padding:12px 16px;text-align:left;">Feature</th>
      <th style="padding:12px 16px;text-align:center;">Option A</th>
      <th style="padding:12px 16px;text-align:center;background:#2f6bff;">Option B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px 16px;border:1px solid #e2e8f0;font-weight:500;">Feature 1</td>
      <td style="padding:10px 16px;border:1px solid #e2e8f0;text-align:center;">✓</td>
      <td style="padding:10px 16px;border:1px solid #e2e8f0;text-align:center;background:#eff6ff;">✓</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="padding:10px 16px;border:1px solid #e2e8f0;font-weight:500;">Feature 2</td>
      <td style="padding:10px 16px;border:1px solid #e2e8f0;text-align:center;">✗</td>
      <td style="padding:10px 16px;border:1px solid #e2e8f0;text-align:center;background:#eff6ff;">✓</td>
    </tr>
  </tbody>
</table>`,
    },
  ],
  colors: [
    { name: 'Blue', text: '#00102a', bg: '#eff6ff', border: '#bfdbfe' },
    { name: 'Navy', text: '#e2e8f0', bg: '#00102a', border: '#1e293b' },
    { name: 'Green', text: '#065f46', bg: '#ecfdf5', border: '#a7f3d0' },
    { name: 'Purple', text: '#5b21b6', bg: '#f5f3ff', border: '#ddd6fe' },
  ],
  code: [
    {
      id: 'code-block',
      label: 'Code snippet',
      desc: 'With filename header',
      icon: Code2,
      html: `<div style="margin:1.25rem 0;">
  <div style="background:#1e293b;color:#94a3b8;font-size:0.75rem;padding:8px 16px;border-radius:8px 8px 0 0;font-family:monospace;">📄 example.js</div>
  <pre style="background:#0f172a;color:#e2e8f0;padding:20px;border-radius:0 0 8px 8px;overflow-x:auto;margin:0;font-family:monospace;font-size:0.875rem;line-height:1.7;"><code>// Your code here
const greeting = "Hello World";
console.log(greeting);</code></pre>
</div>`,
    },
    {
      id: 'terminal',
      label: 'Terminal',
      desc: 'Shell command line',
      icon: Code2,
      html: `<code style="display:block;background:#0f172a;color:#86efac;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:0.875rem;margin:1.25rem 0;">$ npm install your-package</code>`,
    },
  ],
};

function BlockRow({ block, onInsert, onCopy, onMediaRequest }) {
  const Icon = block.icon;

  function handleAdd() {
    if (block.id === 'figure') {
      onMediaRequest('image');
      return;
    }
    if (block.id === 'video') {
      onMediaRequest('video');
      return;
    }
    if (block.id === 'button') {
      onMediaRequest('button');
      return;
    }
    onInsert(block.html, block.label);
  }

  return (
    <div className="group flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white hover:border-[#2f6bff]/40 hover:bg-slate-50/50 transition">
      {block.preview ? (
        <div className={`w-8 h-8 rounded-md shrink-0 ${block.preview}`} aria-hidden />
      ) : Icon ? (
        <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-[#2f6bff]" />
        </div>
      ) : null}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-800 leading-tight">{block.label}</p>
        {block.desc && (
          <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">{block.desc}</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleAdd}
        title={`Add ${block.label}`}
        className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md nexuron-btn-solid"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
      {!block.interactive && block.html && (
      <button
        type="button"
        onClick={() => onCopy(block.html)}
        title="Copy HTML"
        className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition opacity-0 group-hover:opacity-100"
      >
        <Copy className="w-3 h-3" />
      </button>
      )}
    </div>
  );
}

function ColorRow({ color, onInsert }) {
  const html = `<div style="background:${color.bg};color:${color.text};border:1px solid ${color.border};padding:16px 20px;border-radius:8px;margin:1.25rem 0;line-height:1.6;">Your content here. Edit this text after inserting.</div>`;
  return (
    <button
      type="button"
      onClick={() => onInsert(html, `${color.name} box`)}
      className="w-full flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white hover:border-[#2f6bff]/40 transition text-left"
    >
      <div
        className="w-8 h-8 rounded-md shrink-0 border"
        style={{ backgroundColor: color.bg, borderColor: color.border }}
        aria-hidden
      />
      <span className="flex-1 text-xs font-semibold text-slate-800">{color.name} box</span>
      <Plus className="w-3.5 h-3.5 text-[#2f6bff] shrink-0" />
    </button>
  );
}

function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 text-left"
      >
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-600">
          <Icon className="w-3.5 h-3.5 text-[#2f6bff]" />
          {title}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ease-out ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <SmoothCollapse open={open}>
        <div className="p-2 space-y-1.5 border-t border-slate-100">{children}</div>
      </SmoothCollapse>
    </div>
  );
}

export default function DesignToolkit({ onInsert, insertNotice }) {
  const [copied, setCopied] = useState(false);
  const [mediaModal, setMediaModal] = useState(null);

  function handleCopy(html) {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      {mediaModal === 'image' && (
        <ImageInsertModal onClose={() => setMediaModal(null)} onInsert={onInsert} />
      )}
      {mediaModal === 'video' && (
        <VideoInsertModal onClose={() => setMediaModal(null)} onInsert={onInsert} />
      )}
      {mediaModal === 'button' && (
        <ButtonInsertModal onClose={() => setMediaModal(null)} onInsert={onInsert} />
      )}

      {(insertNotice || copied) && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-2">
          {insertNotice && (
            <p className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
              <CheckCheck className="w-3 h-3 shrink-0" /> {insertNotice}
            </p>
          )}
          {copied && (
            <p className="text-[11px] font-medium text-emerald-700">HTML copied</p>
          )}
        </div>
      )}

      <Section title="Actions" icon={MousePointerClick} defaultOpen>
        {BLOCKS.actions.map((block) => (
          <BlockRow key={block.id} block={block} onInsert={onInsert} onCopy={handleCopy} onMediaRequest={setMediaModal} />
        ))}
      </Section>

      <Section title="Media" icon={ImageIcon} defaultOpen>
        {BLOCKS.media.map((block) => (
          <BlockRow key={block.id} block={block} onInsert={onInsert} onCopy={handleCopy} onMediaRequest={setMediaModal} />
        ))}
      </Section>

      <Section title="Callouts" icon={AlertCircle}>
        {BLOCKS.callouts.map((block) => (
          <BlockRow key={block.id} block={block} onInsert={onInsert} onCopy={handleCopy} onMediaRequest={setMediaModal} />
        ))}
      </Section>

      <Section title="Content" icon={Type}>
        {BLOCKS.content.map((block) => (
          <BlockRow key={block.id} block={block} onInsert={onInsert} onCopy={handleCopy} onMediaRequest={setMediaModal} />
        ))}
      </Section>

      <Section title="Tables" icon={Table}>
        {BLOCKS.tables.map((block) => (
          <BlockRow key={block.id} block={block} onInsert={onInsert} onCopy={handleCopy} onMediaRequest={setMediaModal} />
        ))}
      </Section>

      <Section title="Color boxes" icon={Palette}>
        {BLOCKS.colors.map((c) => (
          <ColorRow key={c.name} color={c} onInsert={onInsert} />
        ))}
      </Section>

      <Section title="Code" icon={Code2}>
        {BLOCKS.code.map((block) => (
          <BlockRow key={block.id} block={block} onInsert={onInsert} onCopy={handleCopy} onMediaRequest={setMediaModal} />
        ))}
      </Section>
    </div>
  );
}
