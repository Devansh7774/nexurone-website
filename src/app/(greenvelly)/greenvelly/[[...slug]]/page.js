'use client';

import dynamic from 'next/dynamic';

const GreenvellyApp = dynamic(() => import('../GreenvellyApp'), {
  ssr: false,
  loading: () => (
    <div className="greenvelly-root" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      Loading…
    </div>
  ),
});

export default function GreenvellyCatchAllPage() {
  return <GreenvellyApp />;
}
