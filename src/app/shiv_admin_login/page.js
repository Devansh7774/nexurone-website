'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ADMIN_PATH } from '@/lib/adminRoutes';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified') === '1';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(verified ? 'Email verified. You can now sign in.' : '');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResendVerification() {
    if (!email) {
      setResendMessage('Enter your email address first.');
      return;
    }

    setResending(true);
    setResendMessage('');

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setResendMessage(data.message || 'Verification email sent if the account exists.');
    } catch {
      setResendMessage('Network error. Please try again.');
    } finally {
      setResending(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setNeedsVerification(false);
    setResendMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === 'EMAIL_NOT_VERIFIED') {
          setNeedsVerification(true);
          if (data.email) setEmail(data.email);
        }
        setError(data.error || 'Invalid email or password.');
        return;
      }

      router.push(ADMIN_PATH);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          
          {/* Top accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00d2ff] via-[#0099ff] to-[#0072ff]" />
          
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <Image
                src="/logo-dark-t-e1756917561911.png"
                alt="Nexuron"
                width={180}
                height={48}
                className="h-10 w-auto object-contain mb-6"
                priority
              />
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Admin Portal
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to your Nexuron workspace
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@nexurontechnologies.com"
                    required
                    autoFocus
                    autoComplete="email"
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 
                      transition-all duration-200 ease-in-out
                      placeholder:text-slate-400 
                      hover:border-slate-300 
                      focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 py-3 text-sm text-slate-900 
                      transition-all duration-200 ease-in-out
                      placeholder:text-slate-400 
                      hover:border-slate-300 
                      focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none rounded-r-xl"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {success && (
                <div className="flex items-start gap-3 rounded-xl bg-emerald-50/80 p-4 border border-emerald-100 text-emerald-700">
                  <p className="text-sm font-medium">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl bg-red-50/50 p-4 border border-red-100 text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="mt-0.5 font-bold">!</div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{error}</p>
                    {needsVerification && (
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        disabled={resending}
                        className="text-sm font-semibold text-blue-600 hover:underline disabled:opacity-60"
                      >
                        {resending ? 'Sending verification email…' : 'Resend verification email'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {resendMessage && (
                <p className="text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  {resendMessage}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="relative mt-2 w-full flex items-center justify-center gap-2 rounded-xl nexuron-btn-solid"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Sign in to Workspace'
                )}
              </button>
            </form>
          </div>

          {/* Footer Security Badge */}
          <div className="bg-slate-50/80 border-t border-slate-100 px-8 py-5">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Secured with enterprise-grade encryption</span>
            </div>
          </div>
        </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Subtle background pattern for a premium UI feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[440px] px-4 sm:px-6">
        
        {/* Back Link */}
        <div className="mb-8 flex justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-200/60 backdrop-blur-sm shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Website
          </Link>
        </div>

        <Suspense fallback={<div className="text-center text-sm text-slate-500">Loading…</div>}>
          <LoginForm />
        </Suspense>

      </div>
    </div>
  );
}
