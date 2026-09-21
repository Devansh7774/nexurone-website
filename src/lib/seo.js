import { absoluteUrl } from '@/lib/site';

export const DEFAULT_OG_IMAGE_PATH = '/logo-dark-t-e1756917561911.png';

/** Shared metadata fields for public marketing pages. */
export function pageMetadata({
  title,
  description,
  path,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
  image,
  imageAlt,
  openGraph = {},
  twitter = {},
}) {
  const ogTitle = openGraphTitle ?? title;
  const ogDescription = openGraphDescription ?? description;
  const twitterTitleResolved = twitterTitle ?? ogTitle;
  const twitterDescriptionResolved = twitterDescription ?? description;
  const ogImage = image || openGraph.images?.[0]?.url || DEFAULT_OG_IMAGE_PATH;
  const alt = imageAlt || 'Nexuron Technologies';

  const metadata = {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      siteName: 'Nexuron Technologies',
      locale: 'en_US',
      ...(path && { url: absoluteUrl(path) }),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitleResolved,
      description: twitterDescriptionResolved,
      images: [ogImage],
      ...twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  if (path) {
    metadata.alternates = { canonical: absoluteUrl(path) };
  }

  return metadata;
}
