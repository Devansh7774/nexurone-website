import Link from 'next/link';
import { FolderOpen, Hash, Newspaper, Search } from 'lucide-react';
import { formatBlogDate } from '@/lib/blogUtils';
import BlogSearch from '@/components/blog/BlogSearch';

function SidebarCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.03)] p-6 mb-8">
      {title && (
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100/80">
          {Icon && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E5F0F9] text-[#2667ff]">
              <Icon className="w-4 h-4" strokeWidth={2} />
            </div>
          )}
          <h2 className="text-[15px] font-bold text-[#00102A]">{title}</h2>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}

function EmptyHint({ children }) {
  return <p className="text-[13px] text-gray-500 leading-relaxed">{children}</p>;
}

export default function BlogPostSidebar({
  recentPosts = [],
  categories = [],
  tags = [],
  activeCategorySlug = null,
  activeTagSlug = null,
  searchQuery = '',
}) {
  return (
    <aside className="w-full xl:sticky xl:top-28 xl:self-start">
      <SidebarCard title="Search" icon={Search}>
        <BlogSearch
          defaultQuery={searchQuery}
          preserveParams={{ category: activeCategorySlug, tag: activeTagSlug }}
          variant="compact"
        />
      </SidebarCard>

      <SidebarCard title="Recent Posts" icon={Newspaper}>
        {recentPosts.length > 0 ? (
          <ul className="space-y-4">
            {recentPosts.map((post, index) => (
              <li key={post.slug}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex items-start gap-3.5"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-50 text-[12px] font-bold text-gray-400 flex items-center justify-center group-hover:bg-[#2667ff] group-hover:text-white transition-colors mt-0.5">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#2667ff] transition-colors">
                      {post.title}
                    </span>
                    {post.published_at && (
                      <span className="block text-[12px] text-gray-400 mt-1.5">
                        {formatBlogDate(post.published_at)}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyHint>No other published posts yet.</EmptyHint>
        )}
      </SidebarCard>

      <SidebarCard title="Categories" icon={FolderOpen}>
        {categories.length > 0 ? (
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => {
              const active = activeCategorySlug === cat.slug;
              return (
                <li key={cat.id}>
                  <Link
                    href={`/insights?category=${cat.slug}`}
                    className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                      active
                        ? 'bg-[#2667ff] text-white shadow-md shadow-blue-500/20'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#2667ff]'
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${active ? 'bg-white' : ''}`}
                        style={!active ? { backgroundColor: cat.color || '#2667ff' } : {}}
                      />
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className={`text-[11px] font-semibold tabular-nums shrink-0 px-2 py-0.5 rounded-full transition-colors ${
                      active 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-[#E5F0F9] group-hover:text-[#2667ff]'
                    }`}>
                      {cat.post_count ?? 0}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyHint>No categories yet.</EmptyHint>
        )}
      </SidebarCard>

      <SidebarCard title="Popular Tags" icon={Hash}>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {tags.map((tag) => {
              const active = activeTagSlug === tag.slug;
              return (
                <Link
                  key={tag.id}
                  href={`/insights?tag=${tag.slug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    active
                      ? 'bg-[#00102A] text-white shadow-md shadow-gray-900/20'
                      : 'bg-gray-50 text-gray-600 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 hover:text-[#00102A]'
                  }`}
                >
                  #{tag.name}
                  <span className={`text-[10px] ${active ? 'text-gray-400' : 'text-gray-400'}`}>
                    {tag.post_count}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyHint>No tags on published posts yet.</EmptyHint>
        )}
      </SidebarCard>
    </aside>
  );
}
