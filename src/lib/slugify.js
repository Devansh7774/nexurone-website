/** URL-safe slug from title or custom input. */
export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
}

/** Validate blog post slug format. */
export function isValidSlug(slug) {
  return typeof slug === 'string' && slug.length > 0 && slug.length <= 500 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
