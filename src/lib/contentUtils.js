import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

/** True when stored body is already HTML (not Markdown). */
export function isHtmlContent(content) {
  if (!content || typeof content !== 'string') return false;
  const trimmed = content.trim();
  if (!trimmed.startsWith('<')) return false;
  return /<\/(p|div|h[1-6]|table|ul|ol|article|section|blockquote|pre|span)\s*>/i.test(trimmed);
}

/** Convert Markdown (or pass through HTML) for the visual editor. */
export function prepareContentForVisual(content) {
  if (!content || typeof content !== 'string') return '';
  const trimmed = content.trim();
  if (!trimmed) return '';
  if (isHtmlContent(trimmed)) return trimmed;
  const html = marked.parse(trimmed, { async: false });
  return typeof html === 'string' ? html : '';
}

/** Plain text from HTML/Markdown for word counts. */
export function contentToPlainText(content) {
  if (!content) return '';
  if (isHtmlContent(content)) {
    return content
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/[#>*_\[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
