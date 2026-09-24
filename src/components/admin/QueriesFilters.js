'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Search, X } from 'lucide-react';
import AdminSelect from '@/components/ui/AdminSelect';
import QueriesDateRangePicker from '@/components/admin/QueriesDateRangePicker';

const RANGE_OPTIONS = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_week', label: 'Last 7 days' },
  { value: 'last_month', label: 'Last month' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

function buildHref({ q, range, from, to, status, page }) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (range && range !== 'all') params.set('range', range);
  if (range === 'custom') {
    if (from) params.set('from', from);
    if (to) params.set('to', to);
  }
  if (status && status !== 'all') params.set('status', status);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export default function QueriesFilters({
  initialQ = '',
  initialRange = 'all',
  initialFrom = '',
  initialTo = '',
  initialStatus = 'all',
  searchPlaceholder = 'Search name, email, phone, message…',
  searchAriaLabel = 'Search queries',
  statusOptions = STATUS_OPTIONS,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  function navigate(next) {
    const href = `${pathname}${buildHref({
      q: next.q ?? q,
      range: next.range ?? initialRange,
      from: next.from ?? initialFrom,
      to: next.to ?? initialTo,
      status: next.status ?? initialStatus,
      page: next.page ?? 1,
    })}`;
    startTransition(() => {
      router.push(href);
    });
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    navigate({ q: q.trim(), page: 1 });
  }

  function onRangeChange(value) {
    navigate({
      range: value,
      from: '',
      to: '',
      page: 1,
    });
  }

  function applyCalendarDates({ from, to }) {
    navigate({
      range: 'custom',
      from,
      to,
      page: 1,
    });
  }

  function clearCalendar() {
    navigate({
      range: 'all',
      from: '',
      to: '',
      page: 1,
    });
  }

  function clearSearch() {
    setQ('');
    navigate({ q: '', page: 1 });
  }

  const rangeSelectValue = initialRange === 'custom' ? 'all' : initialRange;

  return (
    <form
      onSubmit={onSearchSubmit}
      className={`mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center ${
        isPending ? 'opacity-70' : ''
      }`}
    >
      <div className="relative min-w-0 flex-1 basis-full lg:basis-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm font-medium text-slate-800 shadow-sm outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10"
          aria-label={searchAriaLabel}
        />
        {q ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <AdminSelect
        className="w-full sm:w-48"
        name="range"
        value={rangeSelectValue}
        onChange={(e) => onRangeChange(e.target.value)}
        placeholder="Date range"
      >
        {RANGE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </AdminSelect>

      <QueriesDateRangePicker
        from={initialFrom}
        to={initialTo}
        onApply={applyCalendarDates}
        onClear={clearCalendar}
      />

      <AdminSelect
        className="w-full sm:w-40"
        name="status"
        value={initialStatus}
        onChange={(e) => navigate({ status: e.target.value, page: 1 })}
        placeholder="Status"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </AdminSelect>

      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2667ff] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f54d6] sm:w-auto"
      >
        Search
      </button>
    </form>
  );
}
