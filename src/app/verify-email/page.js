'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle, ArrowLeft } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState(() => (token ? 'loading' : 'error'));
  const [message, setMessage] = useState(() =>
    token ? '' : 'Verification link is missing or invalid.'
  );

  useEffect(() => {
    if (!token) return;

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
          return;
        }

        setStatus('success');
        setMessage(data.message || 'Email verified successfully.');
      } catch {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    }

    verify();
  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#00d2ff] via-[#0099ff] to-[#0072ff]" />
      <div className="p-8 sm:p-10 text-center">
        <Image
          src="/logo-dark-t-e1756917561911.png"
          alt="Nexuron"
          width={160}
          height={42}
          className="h-9 w-auto object-contain mx-auto mb-6"
        />

        {status === 'loading' && (
          <>
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-slate-900 mb-2">Verifying your email…</h1>
            <p className="text-sm text-slate-500">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-slate-900 mb-2">Email verified</h1>
            <p className="text-sm text-slate-500 mb-6">{message}</p>
            <Link
              href="/shiv_admin_login?verified=1"
              className="inline-flex items-center justify-center rounded-xl nexuron-btn-solid"
            >
              Continue to sign in
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-slate-900 mb-2">Verification failed</h1>
            <p className="text-sm text-slate-500 mb-6">{message}</p>
            <Link
              href="/shiv_admin_login"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="mb-8">
        <Link
          href="/shiv_admin_login"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center text-sm text-slate-500">Loading…</div>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
