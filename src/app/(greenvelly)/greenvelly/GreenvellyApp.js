'use client';

import { AppRouter } from '@/greenvelly/routes/AppRouter';
import '@/greenvelly/styles/global.css';

export default function GreenvellyApp() {
  return (
    <div className="greenvelly-root">
      <AppRouter />
    </div>
  );
}
