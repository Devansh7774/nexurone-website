'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/social';

function FacebookIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
};

/** Brand colors per platform */
const PLATFORM_STYLES = {
  copy: 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
  copyActive: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  facebook: 'border-[#1877F2]/30 bg-[#1877F2] text-white hover:bg-[#166fe5] hover:shadow-md hover:shadow-[#1877F2]/30',
  linkedin: 'border-[#0A66C2]/30 bg-[#0A66C2] text-white hover:bg-[#004182] hover:shadow-md hover:shadow-[#0A66C2]/30',
  x: 'border-gray-900/20 bg-[#000000] text-white hover:bg-gray-800 hover:shadow-md hover:shadow-black/20',
  instagram:
    'border-transparent bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:opacity-90 hover:shadow-md hover:shadow-pink-500/25',
};

function IconButton({
  href,
  label,
  children,
  onClick,
  platform = 'default',
  active = false,
  compact = false,
}) {
  const sizeClass = compact ? 'w-10 h-10' : 'w-11 h-11';
  const colorClass = active
    ? PLATFORM_STYLES.copyActive
    : PLATFORM_STYLES[platform] || PLATFORM_STYLES.copy;

  const className = `inline-flex items-center justify-center rounded-full border shadow-sm transition-all ${sizeClass} ${colorClass}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label} title={label} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={className}>
      {children}
    </a>
  );
}

function CopyLinkButton({ url, compact = false }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <IconButton
      onClick={handleCopy}
      label={copied ? 'Link copied' : 'Copy article link'}
      platform={copied ? 'copyActive' : 'copy'}
      active={copied}
      compact={compact}
    >
      {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" strokeWidth={1.75} />}
    </IconButton>
  );
}

function ShareButtons({ url, title, compact = false }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const items = [
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
      platform: 'facebook',
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
      platform: 'linkedin',
    },
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: XIcon,
      platform: 'x',
    },
  ];

  return (
    <>
      <CopyLinkButton url={url} compact={compact} />
      {items.map(({ label, href, Icon, platform }) => (
        <IconButton key={label} href={href} label={label} platform={platform} compact={compact}>
          <Icon className="w-4 h-4" />
        </IconButton>
      ))}
    </>
  );
}

const FOLLOW_PLATFORM = {
  Facebook: 'facebook',
  Instagram: 'instagram',
  LinkedIn: 'linkedin',
  X: 'x',
};

function FollowButtons({ compact = false }) {
  return SOCIAL_LINKS.map((link) => {
    const Icon = SOCIAL_ICONS[link.name];
    const platform = FOLLOW_PLATFORM[link.name] || 'copy';
    return (
      <IconButton key={link.name} href={link.href} label={link.label} platform={platform} compact={compact}>
        {Icon ? <Icon className="w-4 h-4" /> : null}
      </IconButton>
    );
  });
}

export default function BlogPostSocialRail({ url, title, variant = 'vertical' }) {
  if (variant === 'horizontal') {
    return (
      <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#E5F0F9]/80 to-white px-4 py-4 mb-8 xl:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#2667ff] mb-1">Share this article</p>
            <p className="text-sm text-gray-600">Copy the link or share on social media.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <ShareButtons url={url} title={title} compact />
            <span className="hidden sm:block w-px h-8 bg-gray-200 mx-1" aria-hidden="true" />
            <FollowButtons compact />
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden xl:flex flex-col items-center sticky top-28 self-start">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 mb-3 [writing-mode:vertical-rl] rotate-180">
        Share
      </p>
      <div className="flex flex-col items-center gap-2.5">
        <ShareButtons url={url} title={title} />
      </div>

      <div className="w-8 h-px bg-gray-200 my-5" aria-hidden="true" />

      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 mb-3 [writing-mode:vertical-rl] rotate-180">
        Follow
      </p>
      <div className="flex flex-col items-center gap-2.5">
        <FollowButtons />
      </div>
    </aside>
  );
}
