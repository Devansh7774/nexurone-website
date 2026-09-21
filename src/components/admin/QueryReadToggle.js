'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QueryReadToggle({ queryId, initialIsRead }) {
  const router = useRouter();
  const [isRead, setIsRead] = useState(initialIsRead);
  const [isLoading, setIsLoading] = useState(false);

  async function toggleRead() {
    setIsLoading(true);
    try {
      const nextValue = !isRead;
      const res = await fetch(`/api/admin/queries/${queryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: nextValue }),
      });

      if (!res.ok) return;
      setIsRead(nextValue);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleRead}
      disabled={isLoading}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition ${
        isRead
          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
          : 'bg-amber-100 text-amber-700 border-amber-200'
      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Updating...' : isRead ? 'Read' : 'Unread'}
    </button>
  );
}
