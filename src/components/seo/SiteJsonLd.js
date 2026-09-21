import { absoluteUrl } from '@/lib/site';
import { SOCIAL_LINKS } from '@/lib/social';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nexuron Technologies',
  url: absoluteUrl('/'),
  logo: absoluteUrl('/logo-dark-t-e1756917561911.png'),
  email: 'info@nexurontechnologies.com',
  telephone: '+1-437-366-6896',
  sameAs: SOCIAL_LINKS.map((link) => link.href),
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '2230 Brightoncrest Common SE',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'FF-70,71 Hanumant Plaza, Nr. Vadvala Hanumandada Temple',
      addressLocality: 'Kadi',
      addressRegion: 'GJ',
      postalCode: '384440',
      addressCountry: 'IN',
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nexuron Technologies',
  url: absoluteUrl('/'),
};

export default function SiteJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
