/** Normalize tags from DB (string names or { name, slug } objects). */
export function normalizeTags(tags) {
  if (!tags) return [];
  let items = tags;

  if (typeof tags === 'string') {
    try {
      items = JSON.parse(tags);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(items)) return [];

  return items
    .map((tag) => {
      if (typeof tag === 'string' && tag.trim()) {
        return { name: tag.trim(), slug: tag.trim().toLowerCase().replace(/\s+/g, '-') };
      }
      if (tag && typeof tag === 'object' && tag.name) {
        return { name: tag.name, slug: tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-') };
      }
      return null;
    })
    .filter(Boolean);
}

/** Normalize categories from DB JSON or legacy single-category fields. */
export function normalizeCategories(categories, legacy = {}) {
  let items = categories;

  if (typeof categories === 'string') {
    try {
      items = JSON.parse(categories);
    } catch {
      items = [];
    }
  }

  if (Array.isArray(items) && items.length > 0) {
    return items
      .map((cat) => {
        if (cat && typeof cat === 'object' && cat.name) {
          return {
            id: cat.id || null,
            name: cat.name,
            slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
            color: cat.color || '#3B82F6',
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  if (legacy.category_name) {
    return [{
      id: legacy.category_id || null,
      name: legacy.category_name,
      slug: legacy.category_slug || legacy.category_name.toLowerCase().replace(/\s+/g, '-'),
      color: legacy.category_color || '#3B82F6',
    }];
  }

  return [];
}

export function withNormalizedCategories(post) {
  if (!post) return post;
  const categories = normalizeCategories(post.categories, post);
  const primary = categories[0] || null;
  return {
    ...post,
    categories,
    category_name: primary?.name ?? null,
    category_slug: primary?.slug ?? null,
    category_color: primary?.color ?? null,
  };
}

export function formatBlogDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
