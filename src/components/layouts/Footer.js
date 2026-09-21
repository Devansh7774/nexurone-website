"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SOCIAL_LINKS } from "@/lib/social";

const FOOTER_SOCIAL_ICONS = {
  Facebook: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  ),
  Instagram: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  ),
  LinkedIn: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  ),
};

export default function Footer() {
  const pathname = usePathname();

  const footerLinkClass = (href) => {
    const isActive = pathname === href;
    const base =
      "inline-flex min-h-0 items-center py-1 text-[15px] transition-colors";
    return isActive
      ? `${base} text-white font-medium`
      : `${base} text-gray-300 hover:text-white`;
  };

  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    setSubscribeStatus({ type: '', message: '' });
    setSubmitting(true);

    try {
      const res = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriberEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubscribeStatus({ type: 'error', message: data.error || 'Subscription failed.' });
        return;
      }

      setSubscriberEmail('');
      setSubscribeStatus({ type: 'success', message: 'Subscribed successfully.' });
    } catch {
      setSubscribeStatus({ type: 'error', message: 'Something went wrong. Try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="w-full border-t overflow-hidden border-[#2A3441] bg-[#1E2633]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Section */}
          <div className="w-full md:w-[35%] lg:w-[30%] py-12 md:py-16 lg:py-20 md:pr-8 lg:pr-16 md:border-r relative border-[#2A3441]">
            <div className="mb-8">
              <Link href="/">
                <Image
                  src="/logo-light-t-e1756834855898.png"
                  alt="Nexuron Logo"
                  width={180}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="h-px w-full mb-8 md:hidden bg-[#2A3441]"></div>

            <div>
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                OUR LOCATION
              </h3>
              
              <div className="mb-5">
                <p className="text-white text-[14px] font-medium leading-relaxed">
                  2230 Brightoncrest Common SE, AB<br />
                  Canada
                </p>
              </div>
              
              <div>
                <p className="text-white text-[14px] font-medium leading-relaxed">
                  FF-70,71 Hanumant Plaza, Nr. Vadvala<br />
                  Hanumandada Temple, Kadi, GJ,<br />
                  India - 384440
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="nexuron-btn-solid flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-transform"
                  >
                    {FOOTER_SOCIAL_ICONS[link.name]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[65%] lg:w-[70%] py-12 md:py-16 lg:py-20 md:pl-10 lg:pl-16 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
              
              {/* Quick Links */}
              <div>
                <h3 className="text-[22px] font-bold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about-us" className={footerLinkClass("/about-us")}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className={footerLinkClass("/contact")}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-study" className={footerLinkClass("/case-study")}>
                      Case Study
                    </Link>
                  </li>
                  <li>
                    <Link href="/insights" className={footerLinkClass("/insights")}>
                      Insights
                    </Link>
                  </li>
                  <li>
                    <Link href="/career" className={footerLinkClass("/career")}>
                      Career
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="text-[22px] font-bold mb-4 text-white">Our Services</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/services/mean-mern" className={footerLinkClass("/services/mean-mern")}>
                      MEAN/MERN
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/dot-net" className={footerLinkClass("/services/dot-net")}>
                      .Net Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/flutter" className={footerLinkClass("/services/flutter")}>
                      Flutter Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/php" className={footerLinkClass("/services/php")}>
                      PHP Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/ui-ux" className={footerLinkClass("/services/ui-ux")}>
                      UI/UX Development
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="lg:col-span-1 sm:col-span-2">
                <div className="w-full max-w-[420px] bg-[#2A3441] rounded-xl p-8 h-full">
                  <p className="max-w-[320px] text-gray-300 text-[15px] leading-relaxed mb-8">
                    Join our subscribers list to get the latest news and special offers.
                  </p>
                  
                  <form className="relative" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      aria-label="Email for newsletter"
                      placeholder="Your Email"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      className="w-full bg-white rounded-full py-4 pl-6 pr-16 text-[15px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-label="Subscribe to newsletter"
                      className="nexuron-btn-solid absolute right-2 top-2 bottom-2 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <svg className="h-4 w-4 -mt-0.5 -rotate-45" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </form>
                  {subscribeStatus.message && (
                    <p className={`mt-3 text-sm ${subscribeStatus.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {subscribeStatus.message}
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-[#1A202C] py-5 relative z-10">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-[15px] text-white/90">
            <p>
              © Copyright 2026. All Rights Reserved by <span className="font-bold text-white">Nexuron Technologies</span>
            </p>
            <div className="mt-4 flex gap-4 sm:mt-0">
              <Link href="/about-us" className="inline-flex items-center py-1 hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="inline-flex items-center py-1 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
