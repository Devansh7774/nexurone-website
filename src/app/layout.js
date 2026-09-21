import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { headers } from "next/headers";
import { absoluteUrl, getRequestSiteUrl } from "@/lib/site";
import { DEFAULT_OG_IMAGE_PATH } from "@/lib/seo";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import NavigationLoader from "@/components/layouts/NavigationLoader";

const GA_MEASUREMENT_ID = "G-74BQB5E169";
const GTM_ID = "GTM-P3DLBQBQ";

const R2_ORIGIN = "https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0072ff",
};

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isAdmin =
    pathname.startsWith("/shiv_admin") || pathname === "/shiv_admin_login";
  const isGreenvelly = pathname.startsWith("/greenvelly");
  const siteUrl = getRequestSiteUrl(headersList);
  const canonical = absoluteUrl(pathname, siteUrl);

  const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Nexuron Technologies",
      template: "%s",
    },
    description:
      "Expert software development services for web, mobile, cloud, AI, and automation. Nexuron builds secure, scalable digital products for startups and enterprises.",
    applicationName: "Nexuron Technologies",
    manifest: "/manifest.webmanifest",
    openGraph: {
      siteName: "Nexuron Technologies",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE_PATH, siteUrl),
          width: 1200,
          height: 630,
          alt: "Nexuron Technologies",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  if (!isAdmin && !isGreenvelly) {
    metadata.alternates = { canonical };
    metadata.openGraph.url = canonical;
  }

  return metadata;
}

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/shiv_admin") || pathname === "/shiv_admin_login";
  const isGreenvelly = pathname.startsWith("/greenvelly");

  let bodyContent;
  if (isAdmin || isGreenvelly) {
    bodyContent = <main className="flex-1">{children}</main>;
  } else {
    const { default: PublicLayout } = await import("@/components/layouts/PublicLayout");
    bodyContent = <PublicLayout>{children}</PublicLayout>;
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {!isAdmin && !isGreenvelly && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <link rel="preconnect" href={R2_ORIGIN} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={R2_ORIGIN} />
      </head>
      <body className="min-h-full flex flex-col">
        {!isAdmin && !isGreenvelly && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
            <SiteJsonLd />
          </>
        )}
        {!isGreenvelly && <NavigationLoader />}
        {bodyContent}
      </body>
    </html>
  );
}
