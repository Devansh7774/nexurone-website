'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriberActions({ id, isActive }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    try {
      await fetch(`/api/admin/newsletter/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function deleteSubscriber() {
    const ok = window.confirm('Delete this subscriber?');
    if (!ok) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleStatus}
        disabled={loading}
        className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        {isActive ? 'Unsubscribe' : 'Activate'}
      </button>
      <button
        onClick={deleteSubscriber}
        disabled={loading}
        className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
