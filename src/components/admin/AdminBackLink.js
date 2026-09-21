import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminBackLink({ href, children }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </Link>
  );
}
