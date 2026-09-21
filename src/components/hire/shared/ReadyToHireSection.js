import Link from 'next/link';

export default function ReadyToHireSection({ title, description, consultationHref = '/contact' }) {
  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3 tracking-tight">
            {title}
          </h2>

          <p className="text-gray-500 text-[15px] md:text-[16px] mb-5 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-2.5">
            <span className="text-base">👉</span>
            <Link
              href={consultationHref}
              className="text-gray-600 text-[15px] md:text-[16px] hover:text-[#0066ff] transition-colors"
            >
              Get a Free Consultation Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
