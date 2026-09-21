import Link from 'next/link';

export default function BlogCategoryBadges({
  categories = [],
  className = '',
  size = 'md',
  wrap = true,
  /** Max categories to show. Pass null/undefined to show all. */
  limit = null,
}) {
  if (!categories.length) return null;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px]',
    lg: 'px-3 py-1 text-[12px]',
  };

  const maxLinesClass = {
    sm: 'max-h-[3.25rem]',
    md: 'max-h-[3.75rem]',
    lg: 'max-h-[4rem]',
  };

  const hasLimit = typeof limit === 'number' && limit > 0;
  const visible = hasLimit ? categories.slice(0, limit) : categories;
  const hasMore = hasLimit && categories.length > limit;

  return (
    <div
      className={`flex ${wrap ? 'flex-wrap' : 'flex-nowrap'} items-center gap-2 overflow-hidden ${
        hasLimit ? maxLinesClass[size] || maxLinesClass.md : ''
      } ${className}`}
    >
      {visible.map((cat) => (
        <Link
          key={cat.slug || cat.name}
          href={`/insights?category=${cat.slug}`}
          className={`inline-flex items-center rounded-sm border font-semibold uppercase tracking-wider transition-colors hover:opacity-90 ${sizeClasses[size] || sizeClasses.md}`}
          style={{
            borderColor: `${cat.color || '#2667ff'}44`,
            color: cat.color || '#2667ff',
            backgroundColor: `${cat.color || '#2667ff'}12`,
          }}
        >
          {cat.name}
        </Link>
      ))}
      {hasMore ? (
        <span
          className={`inline-flex items-center font-semibold text-gray-400 tracking-wider ${
            sizeClasses[size] || sizeClasses.md
          }`}
          aria-label={`${categories.length - limit} more categories`}
        >
          …
        </span>
      ) : null}
    </div>
  );
}
