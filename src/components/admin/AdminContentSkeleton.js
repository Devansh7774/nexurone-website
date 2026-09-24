'use client';

import { usePathname } from 'next/navigation';
import { getAdminSkeletonVariant } from '@/lib/adminSkeletonRoute';

function Sk({ className = '' }) {
  return <div className={`rounded-md bg-slate-200/75 ${className}`} />;
}

function PageWrap({ children, className = '' }) {
  return (
    <div className={`animate-pulse p-6 lg:p-8 ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

function BackLinkSkeleton() {
  return <Sk className="mb-6 h-4 w-36 rounded-lg" />;
}

function CountLineSkeleton() {
  return <Sk className="mb-6 h-4 w-32" />;
}

function GridTableSkeleton({ columns, rows = 6 }) {
  const colClass = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50/80 px-6 py-3">
        {columns.map((span, i) => (
          <Sk key={i} className={`${colClass[span] || 'col-span-1'} h-3`} />
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4">
            {columns.map((span, j) => (
              <Sk
                key={j}
                className={`${colClass[span] || 'col-span-1'} h-4 ${j === 0 ? 'max-w-[85%]' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableSkeleton({ headers, rows = 6, titleCol = 0, withAvatar = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex gap-4 border-b border-slate-200 bg-slate-50/80 px-6 py-3">
        {headers.map((w, i) => (
          <Sk key={i} className={`h-3 ${w}`} />
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            {headers.map((w, j) => (
              <div key={j} className={w}>
                {j === titleCol && withAvatar ? (
                  <div className="flex items-center gap-3">
                    <Sk className="h-9 w-9 shrink-0 rounded-full" />
                    <div className="min-w-0 space-y-2">
                      <Sk className="h-4 w-28" />
                      <Sk className="h-3 w-36" />
                    </div>
                  </div>
                ) : j === titleCol ? (
                  <div className="space-y-2">
                    <Sk className="h-4 w-full max-w-xs" />
                    <Sk className="h-3 w-24" />
                  </div>
                ) : (
                  <Sk className="h-4 w-full max-w-[5rem]" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <PageWrap>
      <div className="mb-8 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-300/40 p-6 sm:p-8">
        <Sk className="mb-3 h-3 w-24 bg-slate-300/80" />
        <Sk className="mb-3 h-8 w-48 bg-slate-300/80" />
        <Sk className="mb-6 h-4 w-full max-w-2xl bg-slate-300/70" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Sk key={i} className="h-10 w-36 rounded-xl bg-slate-300/80" />
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <Sk className="h-11 w-11 rounded-xl" />
              <Sk className="h-4 w-4" />
            </div>
            <Sk className="mt-5 h-8 w-12" />
            <Sk className="mt-2 h-4 w-28" />
            <Sk className="mt-2 h-3 w-20" />
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="space-y-2">
            <Sk className="h-5 w-40" />
            <Sk className="h-3 w-32" />
          </div>
          <Sk className="h-9 w-28 rounded-xl" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="min-w-0 flex-1 space-y-2">
                <Sk className="h-4 w-full max-w-sm" />
                <Sk className="h-3 w-40" />
              </div>
              <Sk className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function BlogListSkeleton() {
  return (
    <PageWrap>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Sk className="h-4 w-28" />
        <div className="flex gap-3">
          <Sk className="h-10 w-28 rounded-xl" />
          <Sk className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
        <Sk className="h-10 min-w-0 flex-1 rounded-xl" />
        <Sk className="h-10 w-48 rounded-xl" />
        <Sk className="h-10 w-48 rounded-xl" />
        <Sk className="h-10 w-40 rounded-xl" />
        <Sk className="h-10 w-20 rounded-xl" />
      </div>

      <TableSkeleton
        headers={['flex-[2]', 'w-24', 'w-24', 'w-24', 'w-20', 'w-16 ml-auto']}
        rows={8}
        titleCol={0}
      />
    </PageWrap>
  );
}

function BlogEditorSkeleton() {
  return (
    <div className="flex min-h-full animate-pulse flex-col bg-[#f4f7fb]" aria-hidden="true">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
        <Sk className="h-8 w-8 rounded-lg" />
        <Sk className="h-4 w-24" />
        <div className="mx-2 h-5 w-px bg-slate-200" />
        <Sk className="h-5 w-40" />
        <Sk className="ml-auto h-6 w-16 rounded-full" />
        <Sk className="h-9 w-20 rounded-lg" />
        <Sk className="h-9 w-24 rounded-lg" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-4 pb-5 pt-5 sm:px-6 lg:px-8">
          <Sk className="mb-2 h-4 w-12" />
          <Sk className="mb-4 h-14 w-full rounded-xl" />
          <Sk className="mb-2 h-4 w-16" />
          <Sk className="mb-5 h-20 w-full rounded-xl" />
          <div className="min-h-[280px] flex-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="mb-4 flex gap-2 border-b border-slate-100 pb-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Sk key={i} className="h-8 w-8 rounded-md" />
              ))}
            </div>
            <div className="space-y-3">
              <Sk className="h-4 w-full" />
              <Sk className="h-4 w-[92%]" />
              <Sk className="h-4 w-[88%]" />
              <Sk className="h-4 w-[95%]" />
              <Sk className="h-4 w-[70%]" />
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 space-y-4 border-t border-slate-200 bg-white p-4 xl:w-80 xl:border-l xl:border-t-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-200/80 p-4">
              <Sk className="mb-3 h-4 w-24" />
              <Sk className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogCategoriesSkeleton() {
  return (
    <PageWrap>
      <BackLinkSkeleton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <Sk className="mb-4 h-4 w-28" />
          <div className="space-y-4">
            <Sk className="h-10 w-full rounded-lg" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Sk key={i} className="h-7 w-7 rounded-full" />
              ))}
            </div>
            <Sk className="h-10 w-full rounded-lg" />
            <Sk className="h-10 w-full rounded-lg" />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-slate-100 px-5 py-4">
            <Sk className="h-4 w-24" />
          </div>
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <Sk className="h-3 w-3 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Sk className="h-4 w-32" />
                  <Sk className="h-3 w-48" />
                </div>
                <Sk className="h-3 w-14" />
                <Sk className="h-8 w-8 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  );
}

function QueriesListSkeleton() {
  return (
    <PageWrap>
      <CountLineSkeleton />
      <GridTableSkeleton columns={[3, 3, 2, 3, 1]} rows={7} />
    </PageWrap>
  );
}

function CareerListSkeleton() {
  return (
    <PageWrap>
      <CountLineSkeleton />
      <GridTableSkeleton columns={[2, 3, 2, 2, 2, 1]} rows={7} />
    </PageWrap>
  );
}

function SubscribersListSkeleton() {
  return (
    <PageWrap>
      <CountLineSkeleton />
      <GridTableSkeleton columns={[4, 2, 2, 2, 2]} rows={7} />
    </PageWrap>
  );
}

function UsersListSkeleton() {
  return (
    <PageWrap>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Sk className="h-4 w-32" />
        <Sk className="h-10 w-28 rounded-xl" />
      </div>
      <TableSkeleton
        headers={['flex-[2]', 'w-20', 'w-12', 'w-16', 'w-24', 'w-16 ml-auto']}
        rows={6}
        titleCol={0}
        withAvatar
      />
    </PageWrap>
  );
}

function ProfileSkeleton() {
  return (
    <PageWrap>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm">
          <Sk className="mx-auto mb-4 h-24 w-24 rounded-full" />
          <Sk className="mx-auto mb-2 h-5 w-32" />
          <Sk className="mx-auto mb-1 h-3 w-20" />
          <Sk className="mx-auto mb-5 h-3 w-40" />
          <Sk className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="space-y-2">
            <Sk className="h-5 w-32" />
            <Sk className="h-4 w-full max-w-md" />
          </div>
          <div className="space-y-2">
            <Sk className="h-4 w-24" />
            <Sk className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Sk className="h-4 w-20" />
            <Sk className="h-20 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Sk className="h-4 w-28" />
            <Sk className="h-10 w-full rounded-lg" />
          </div>
          <Sk className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </PageWrap>
  );
}

function DetailSkeleton({ withRole = false, withCv = false }) {
  return (
    <PageWrap>
      <BackLinkSkeleton />
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Sk className="h-4 w-44" />
            <Sk className="h-7 w-56" />
            {withRole && <Sk className="h-4 w-32" />}
          </div>
          <Sk className="h-9 w-28 rounded-xl" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: withRole ? 4 : 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Sk className="h-3 w-16" />
              <Sk className="h-5 w-full max-w-xs" />
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <Sk className="h-3 w-20" />
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
            <div className="space-y-2">
              <Sk className="h-4 w-full" />
              <Sk className="h-4 w-[95%]" />
              <Sk className="h-4 w-[88%]" />
              <Sk className="h-4 w-[70%]" />
            </div>
          </div>
        </div>

        {withCv && (
          <div className="mt-8 space-y-2">
            <Sk className="h-3 w-24" />
            <Sk className="h-10 w-36 rounded-xl" />
          </div>
        )}
      </div>
    </PageWrap>
  );
}

const VARIANTS = {
  dashboard: DashboardSkeleton,
  'blog-list': BlogListSkeleton,
  'blog-editor': BlogEditorSkeleton,
  'blog-categories': BlogCategoriesSkeleton,
  'queries-list': QueriesListSkeleton,
  'query-detail': () => <DetailSkeleton />,
  'career-list': CareerListSkeleton,
  'career-detail': () => <DetailSkeleton withRole withCv />,
  'subscribers-list': SubscribersListSkeleton,
  users: UsersListSkeleton,
  profile: ProfileSkeleton,
};

export default function AdminContentSkeleton({ pathname: pathnameProp }) {
  const currentPathname = usePathname();
  const pathname = pathnameProp || currentPathname || '/shiv_admin';
  const variant = getAdminSkeletonVariant(pathname);
  const Skeleton = VARIANTS[variant] || DashboardSkeleton;

  return <Skeleton />;
}
