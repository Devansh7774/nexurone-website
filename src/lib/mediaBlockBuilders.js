/** Escape text for safe HTML attribute values. */
export function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Extract YouTube video ID from URL or raw ID. */
export function parseYoutubeId(input) {
  const trimmed = String(input || '').trim();
  if (!trimmed) return null;

  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = trimmed.startsWith('http') ? new URL(trimmed) : new URL(`https://${trimmed}`);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      return /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        const id = url.searchParams.get('v');
        return id && /^[\w-]{11}$/.test(id) ? id : null;
      }
      const embedMatch = url.pathname.match(/^\/embed\/([\w-]{11})/);
      if (embedMatch) return embedMatch[1];
      const shortsMatch = url.pathname.match(/^\/shorts\/([\w-]{11})/);
      if (shortsMatch) return shortsMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

export const MEDIA_SIZES = {
  full: { label: 'Full width', width: '100%', maxWidth: '100%' },
  large: { label: 'Large (90%)', width: '90%', maxWidth: '900px' },
  medium: { label: 'Medium (75%)', width: '75%', maxWidth: '640px' },
  small: { label: 'Small (50%)', width: '50%', maxWidth: '400px' },
};

function figureWrapperStyle(size, align) {
  const s = MEDIA_SIZES[size] || MEDIA_SIZES.full;
  const base = `margin:1.5rem 0;width:${s.width};max-width:${s.maxWidth};`;
  if (align === 'left') return `${base}margin-right:auto;margin-left:0;`;
  if (align === 'right') return `${base}margin-left:auto;margin-right:0;`;
  return `${base}margin-left:auto;margin-right:auto;`;
}

export function buildImageFigureHtml({
  src,
  alt,
  title = '',
  caption = '',
  size = 'full',
  align = 'center',
}) {
  const safeSrc = escapeAttr(src);
  const safeAlt = escapeAttr(alt || 'Image');
  const safeTitle = title ? ` title="${escapeAttr(title)}"` : '';
  const captionHtml = caption.trim()
    ? `<figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:10px;font-style:italic;">${escapeAttr(caption)}</figcaption>`
    : '';

  return `<figure style="${figureWrapperStyle(size, align)}">
  <img src="${safeSrc}" alt="${safeAlt}"${safeTitle} loading="lazy" decoding="async" style="width:100%;height:auto;border-radius:12px;display:block;" />
  ${captionHtml}
</figure>`;
}

export function buildYoutubeFigureHtml({
  videoId,
  title = 'YouTube video',
  caption = '',
  size = 'large',
}) {
  const safeId = escapeAttr(videoId);
  const safeTitle = escapeAttr(title);
  const captionHtml = caption.trim()
    ? `<figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:10px;">${escapeAttr(caption)}</figcaption>`
    : '';

  return `<figure style="${figureWrapperStyle(size, 'center')}">
  <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:12px;overflow:hidden;background:#0f172a;">
    <iframe src="https://www.youtube.com/embed/${safeId}" title="${safeTitle}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
  </div>
  ${captionHtml}
</figure>`;
}

export function buildStandaloneImageHtml({ src, alt, title = '', size = 'full', align = 'center' }) {
  const s = MEDIA_SIZES[size] || MEDIA_SIZES.full;
  const safeSrc = escapeAttr(src);
  const safeAlt = escapeAttr(alt || 'Image');
  const safeTitle = title ? ` title="${escapeAttr(title)}"` : '';
  let margin = 'margin:1rem auto;';
  if (align === 'left') margin = 'margin:1rem auto 1rem 0;';
  if (align === 'right') margin = 'margin:1rem 0 1rem auto;';

  return `<img src="${safeSrc}" alt="${safeAlt}"${safeTitle} loading="lazy" decoding="async" style="width:${s.width};max-width:${s.maxWidth};height:auto;border-radius:12px;display:block;${margin}" />`;
}

export const BUTTON_VARIANTS = {
  primary: { label: 'Primary blue', style: 'background:linear-gradient(135deg,#00d2ff 0%,#0099ff 35%,#0072ff 65%,#00b8ff 100%);color:#fff;border:2px solid #0072ff;' },
  outline: { label: 'Outline', style: 'background:#fff;color:#0072ff;border:2px solid #0072ff;' },
  dark: { label: 'Dark', style: 'background:#00102a;color:#fff;border:2px solid #00102a;' },
};

export const BUTTON_ALIGNS = {
  left: 'text-align:left;',
  center: 'text-align:center;',
  right: 'text-align:right;',
};

/** Build a standalone button block (link or onclick). */
export function buildButtonHtml({
  label = 'Click me',
  href = '',
  onclick = '',
  variant = 'primary',
  align = 'left',
  openInNewTab = false,
}) {
  const variantStyle = BUTTON_VARIANTS[variant]?.style || BUTTON_VARIANTS.primary.style;
  const alignStyle = BUTTON_ALIGNS[align] || BUTTON_ALIGNS.left;
  const baseStyle = `display:inline-block;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:0.95rem;cursor:pointer;transition:opacity 0.2s;${variantStyle}`;
  const safeLabel = escapeAttr(label);

  let inner;
  if (onclick.trim()) {
    inner = `<button type="button" onclick="${escapeAttr(onclick.trim())}" style="${baseStyle}">${safeLabel}</button>`;
  } else {
    const url = href.trim() || '#';
    const target = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    inner = `<a href="${escapeAttr(url)}"${target} style="${baseStyle}">${safeLabel}</a>`;
  }

  return `<div style="${alignStyle}margin:1.5rem 0;">${inner}</div>`;
}
