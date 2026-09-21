import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.setOptions({
  gfm: true,
  breaks: true,
});

const extraTags = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'img', 'figure', 'figcaption', 'iframe', 'button',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'colgroup', 'col',
  'del', 'ins', 'sub', 'sup', 'mark', 'footer', 'span', 'div', 'ul', 'li',
];

const baseAttrs = sanitizeHtml.defaults.allowedAttributes;

/** Allow inline styles from admin design blocks (trusted author content). */
const ALLOWED_STYLES = {
  '*': {
    color: [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^rgba\(/i],
    background: [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^rgba\(/i, /^linear-gradient/i],
    'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^rgba\(/i],
    border: [/.*/],
    'border-left': [/.*/],
    'border-bottom': [/.*/],
    'border-top': [/.*/],
    'border-collapse': [/.*/],
    padding: [/.*/],
    margin: [/.*/],
    'margin-left': [/.*/],
    'margin-right': [/.*/],
    'margin-top': [/.*/],
    'margin-bottom': [/.*/],
    'max-width': [/.*/],
    'max-height': [/.*/],
    'font-size': [/.*/],
    'font-weight': [/.*/],
    'font-style': [/.*/],
    'font-family': [/.*/],
    'text-align': [/.*/],
    'border-radius': [/.*/],
    width: [/.*/],
    display: [/.*/],
    gap: [/.*/],
    'align-items': [/.*/],
    'flex-shrink': [/.*/],
    'line-height': [/.*/],
    overflow: [/.*/],
    'list-style': [/.*/],
    'counter-reset': [/.*/],
    position: [/.*/],
    top: [/.*/],
    left: [/.*/],
    height: [/.*/],
    'padding-bottom': [/.*/],
    'min-width': [/.*/],
    'flex-wrap': [/.*/],
    flex: [/.*/],
    'text-decoration': [/.*/],
    '-webkit-background-clip': [/.*/],
    '-webkit-text-fill-color': [/.*/],
  },
};

const SANITIZE_OPTIONS = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, ...extraTags],
  allowedAttributes: {
    ...baseAttrs,
    '*': [...(baseAttrs['*'] || []), 'style', 'class', 'id'],
    a: [...(baseAttrs.a || []), 'href', 'name', 'target', 'rel', 'class', 'style'],
    button: ['type', 'onclick', 'class', 'style', 'aria-label'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class', 'decoding', 'style'],
    iframe: ['src', 'title', 'width', 'height', 'style', 'allow', 'allowfullscreen', 'frameborder', 'loading', 'referrerpolicy'],
    figure: ['class', 'style'],
    figcaption: ['class', 'style'],
    th: ['colspan', 'rowspan', 'scope', 'align', 'class', 'style'],
    td: ['colspan', 'rowspan', 'align', 'class', 'style'],
    tr: ['class', 'style'],
    table: ['class', 'style'],
    div: ['class', 'style'],
    p: ['class', 'style'],
    span: ['class', 'style'],
    h1: ['class', 'style'],
    h2: ['class', 'style'],
    h3: ['class', 'style'],
    blockquote: ['class', 'style'],
    ol: ['class', 'style'],
    li: ['class', 'style'],
    pre: ['class', 'style'],
    code: ['class', 'style'],
    mark: ['class', 'style'],
    footer: ['class', 'style'],
  },
  allowedStyles: ALLOWED_STYLES,
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowProtocolRelative: false,
};

/** Visual editor & design blocks output real HTML tags. */
function containsHtmlMarkup(content) {
  return /<(?:h[1-6]|p|div|table|ul|ol|li|blockquote|pre|img|figure|iframe|span|a|button|strong|em|br)\b/i.test(content);
}

/**
 * Turn stored post body (HTML from visual editor, or Markdown) into safe HTML.
 */
export function renderBlogMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') return '';
  const trimmed = markdown.trim();
  if (!trimmed) return '';

  // Visual editor + design blocks: sanitize HTML directly (do not run through marked)
  if (containsHtmlMarkup(trimmed)) {
    return sanitizeHtml(trimmed, SANITIZE_OPTIONS);
  }

  const html = marked.parse(trimmed, { async: false });
  return typeof html === 'string' ? sanitizeHtml(html, SANITIZE_OPTIONS) : '';
}
