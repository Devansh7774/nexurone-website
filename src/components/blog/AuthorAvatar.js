'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getInitials } from '@/lib/avatar';

const sizeMap = {
  xs: { box: 'w-6 h-6', text: 'text-[10px]' },
  sm: { box: 'w-8 h-8', text: 'text-xs' },
  md: { box: 'w-10 h-10', text: 'text-sm' },
  lg: { box: 'w-12 h-12', text: 'text-base' },
  xl: { box: 'w-16 h-16', text: 'text-lg' },
};

export function resolveAvatarUrl(avatarUrl) {
  if (!avatarUrl) return '';
  const value = String(avatarUrl).trim();
  if (!value) return '';
  return value.split('?')[0];
}

export default function AuthorAvatar({
  name,
  avatarUrl,
  size = 'md',
  className = '',
}) {
  const [imageError, setImageError] = useState(false);
  const { box, text } = sizeMap[size] || sizeMap.md;
  const initials = getInitials(name);
  const resolvedUrl = resolveAvatarUrl(avatarUrl);

  if (resolvedUrl && !imageError) {
    return (
      <Image
        src={avatarUrl}
        alt={name ? `${name} profile photo` : 'Author photo'}
        width={64}
        height={64}
        className={`${box} rounded-full object-cover border border-gray-200 bg-gray-100 shrink-0 ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <span
      className={`${box} ${text} inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200 shrink-0 ${className}`}
      aria-hidden={!name}
      title={name || undefined}
    >
      {initials}
    </span>
  );
}
