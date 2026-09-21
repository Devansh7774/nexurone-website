/** Public social profile links — matches nexurontechnologies.com footer. */
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/nexuron.tech',
    label: 'Follow us on Facebook',
  },
  {
    name: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/nexuron.technologies/',
    label: 'Follow us on Instagram',
  },
  {
    name: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/nexuron-technologies/',
    label: 'Follow us on LinkedIn',
  },
];
