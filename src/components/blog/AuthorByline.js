import AuthorAvatar from '@/components/blog/AuthorAvatar';

export default function AuthorByline({
  name,
  avatarUrl,
  bio,
  size = 'sm',
  layout = 'inline',
  className = '',
}) {
  const displayName = name || 'Nexuron Team';

  if (layout === 'card') {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <AuthorAvatar name={displayName} avatarUrl={avatarUrl} size={size} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">{displayName}</p>
          {bio ? <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{bio}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 min-w-0 ${className}`}>
      <AuthorAvatar name={displayName} avatarUrl={avatarUrl} size={size} />
      <span className="truncate">{displayName}</span>
    </span>
  );
}
