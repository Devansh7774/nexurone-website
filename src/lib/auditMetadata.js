/** Canonical SEO metadata from Nexuron_Website_Audit.pdf */
import { absoluteUrl } from '@/lib/site';
import { getHireHeroImage, getServiceHeroImage } from '@/lib/serviceHeroImages';

const HOME_OG_IMAGE =
  'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ChatGPT%20Image%20Jun%2024%2C%202026%2C%2012_33_13%20PM.png';

const ABOUT_OG_IMAGE =
  'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/team/imagebg.webp';

const CASE_STUDY_OG_IMAGE =
  'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ChatGPT%20Image%20Jun%2024%2C%202026%2C%2006_59_22%20PM.png';

/** @typedef {{ title: string, description: string, openGraphTitle?: string, openGraphDescription?: string, twitterTitle?: string, twitterDescription?: string, image?: string, imageAlt: string }} AuditEntry */

/** @type {Record<string, AuditEntry>} */
export const AUDIT_PAGES = {
  '/': {
    title: 'Custom Software Development Company in USA | Nexuron Technologies',
    description:
      'Nexuron Technologies is a leading custom software development company in the USA offering web development, mobile app development, AI solutions, cloud applications, and enterprise software for startups and businesses.',
    openGraphDescription:
      'Nexuron Technologies delivers custom software, web applications, mobile apps, AI solutions, cloud development, and enterprise software across the USA.',
    twitterDescription:
      'Build scalable software, web apps, AI solutions, and mobile applications with Nexuron Technologies.',
    image: HOME_OG_IMAGE,
    imageAlt: 'Custom Software Development Services by Nexuron Technologies',
  },
  '/services/mean-mern': {
    title: 'MEAN & MERN Stack Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies provides MEAN and MERN stack development services in the USA, building scalable SaaS applications, enterprise software, APIs, and custom web solutions.',
    openGraphDescription:
      'Hire Nexuron Technologies for MEAN and MERN stack development services to build secure, scalable, and high-performance web applications.',
    twitterDescription: 'Build scalable MERN and MEAN applications with Nexuron Technologies.',
    imageAlt: 'MEAN and MERN Stack Development by Nexuron Technologies',
  },
  '/services/frontend': {
    title: 'Frontend Development Company USA | React, Angular & Vue | Nexuron Technologies',
    description:
      'Nexuron Technologies delivers frontend development services using React, Angular, and Vue to build responsive, fast, and user-friendly web applications for businesses across the USA.',
    openGraphTitle: 'Frontend Development Company USA | Nexuron Technologies',
    openGraphDescription:
      'Custom frontend development with React, Angular, and Vue by Nexuron Technologies.',
    twitterDescription:
      'Build modern frontend applications using React, Angular, and Vue with Nexuron Technologies.',
    imageAlt: 'Frontend Development Services by Nexuron Technologies',
  },
  '/services/wordpress': {
    title: 'WordPress Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies offers custom WordPress development services, theme development, plugin development, WooCommerce solutions, and website optimization for businesses across the USA.',
    openGraphDescription:
      'Custom WordPress development, WooCommerce solutions, and plugin development by Nexuron Technologies.',
    twitterDescription: 'Build SEO-friendly WordPress websites with Nexuron Technologies.',
    imageAlt: 'WordPress Development Services by Nexuron Technologies',
  },
  '/services/php': {
    title: 'PHP Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies provides PHP development services to build secure business applications, enterprise portals, custom CMS solutions, and scalable web platforms.',
    openGraphDescription: 'Custom PHP web development services by Nexuron Technologies.',
    twitterDescription: 'Build secure PHP web applications with Nexuron Technologies.',
    imageAlt: 'PHP Development Services by Nexuron Technologies',
  },
  '/services/laravel': {
    title: 'Laravel Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies offers Laravel development services to build scalable SaaS platforms, enterprise applications, REST APIs, and custom web solutions across the USA.',
    openGraphDescription: 'Professional Laravel development services by Nexuron Technologies.',
    twitterDescription: 'Develop secure Laravel applications with Nexuron Technologies.',
    imageAlt: 'Laravel Development Services by Nexuron Technologies',
  },
  '/services/dot-net': {
    title: '.NET Development Company USA | ASP.NET Development | Nexuron Technologies',
    description:
      'Nexuron Technologies provides .NET development services, ASP.NET Core development, enterprise software solutions, cloud applications, and API development across the USA.',
    openGraphTitle: '.NET Development Company USA | Nexuron Technologies',
    openGraphDescription: 'Enterprise .NET development services by Nexuron Technologies.',
    twitterDescription: 'Build enterprise .NET applications with Nexuron Technologies.',
    imageAlt: '.NET Development Services by Nexuron Technologies',
  },
  '/services/ios': {
    title: 'iOS App Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies develops custom iOS applications using Swift and SwiftUI for startups, enterprises, healthcare, fintech, and eCommerce businesses.',
    openGraphDescription:
      'Custom iPhone and iPad application development by Nexuron Technologies.',
    twitterDescription: 'Build premium iOS applications with Nexuron Technologies.',
    imageAlt: 'iOS App Development Services by Nexuron Technologies',
  },
  '/services/android': {
    title: 'Android App Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies offers Android app development services using Kotlin and Java to build secure, scalable, and high-performance mobile applications.',
    openGraphDescription: 'Android application development services for businesses across the USA.',
    twitterDescription: 'Build Android apps with Nexuron Technologies.',
    imageAlt: 'Android App Development Services by Nexuron Technologies',
  },
  '/services/react-native': {
    title: 'React Native App Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies builds high-performance React Native applications for iOS and Android, helping startups and enterprises launch cross-platform mobile apps faster.',
    openGraphDescription:
      'Cross-platform React Native app development services by Nexuron Technologies.',
    twitterDescription:
      'Build cross-platform mobile apps with React Native and Nexuron Technologies.',
    imageAlt: 'React Native App Development by Nexuron Technologies',
  },
  '/services/flutter': {
    title: 'Flutter App Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies provides Flutter app development services in the USA, building high-performance cross-platform mobile applications for startups, enterprises, and growing businesses.',
    openGraphDescription:
      'Build scalable Flutter applications for iOS and Android with Nexuron Technologies.',
    twitterDescription: 'Cross-platform Flutter app development services for businesses across the USA.',
    imageAlt: 'Flutter App Development Services by Nexuron Technologies',
  },
  '/services/ai-ml': {
    title: 'AI & Machine Learning Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies delivers AI and machine learning development services, Generative AI solutions, LLM integration, AI automation, computer vision, and predictive analytics for businesses across the USA.',
    openGraphDescription:
      'Build intelligent AI-powered applications and automation solutions with Nexuron Technologies.',
    twitterDescription:
      'Custom AI development, LLM integration, and machine learning solutions by Nexuron Technologies.',
    imageAlt: 'AI and Machine Learning Development by Nexuron Technologies',
  },
  '/services/devops': {
    title: 'DevOps Consulting & Cloud Services USA | Nexuron Technologies',
    description:
      'Nexuron Technologies offers DevOps consulting, CI/CD implementation, Kubernetes, Docker, AWS, Azure, cloud migration, and infrastructure automation services across the USA.',
    openGraphDescription:
      'Streamline software delivery with DevOps consulting and cloud automation by Nexuron Technologies.',
    twitterDescription:
      'Accelerate deployment with DevOps, CI/CD, Docker, Kubernetes, AWS, and Azure solutions.',
    imageAlt: 'DevOps Services by Nexuron Technologies',
  },
  '/services/iot': {
    title: 'IoT Development Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies develops custom IoT solutions including smart devices, industrial IoT platforms, cloud-connected systems, remote monitoring, and IoT application development.',
    openGraphDescription:
      'Build secure IoT platforms and connected device solutions with Nexuron Technologies.',
    twitterDescription:
      'Custom IoT application development and smart device solutions by Nexuron Technologies.',
    imageAlt: 'IoT Development Services by Nexuron Technologies',
  },
  '/services/3d': {
    title: '3D Design & Product Visualization Services USA | Nexuron Technologies',
    description:
      'Nexuron Technologies provides 3D design services including product rendering, architectural visualization, animation, AR/VR assets, and industrial 3D modeling for businesses.',
    openGraphDescription:
      'Professional 3D product visualization and rendering services by Nexuron Technologies.',
    twitterDescription: 'Transform concepts into realistic 3D designs with Nexuron Technologies.',
    imageAlt: '3D Design Services by Nexuron Technologies',
  },
  '/services/graphic': {
    title: 'Graphic Design Company USA | Branding & Creative Design | Nexuron Technologies',
    description:
      'Nexuron Technologies provides graphic design services including logo design, branding, marketing materials, social media creatives, brochures, and corporate identity design.',
    openGraphTitle: 'Graphic Design Company USA | Nexuron Technologies',
    openGraphDescription: 'Creative branding and graphic design services for businesses across the USA.',
    twitterDescription: 'Professional branding and creative graphic design services.',
    imageAlt: 'Graphic Design Services by Nexuron Technologies',
  },
  '/services/ui-ux': {
    title: 'UI/UX Design Company USA | Nexuron Technologies',
    description:
      'Nexuron Technologies provides UI/UX design services including user research, wireframing, prototyping, mobile app design, SaaS dashboards, and web application design.',
    openGraphDescription:
      'User-centered UI and UX design services for websites and mobile applications.',
    twitterDescription: 'Modern UI/UX design services to improve user experience and conversions.',
    imageAlt: 'UI UX Design Services by Nexuron Technologies',
  },
  '/hire/shopify-developer': {
    title: 'Hire Shopify Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated Shopify developers from Nexuron Technologies for custom store development, Shopify Plus solutions, theme customization, app development, and ongoing support.',
    openGraphDescription: 'Hire experienced Shopify developers for scalable eCommerce solutions.',
    twitterDescription: 'Hire expert Shopify developers for your eCommerce business.',
    imageAlt: 'Hire Shopify Developers from Nexuron Technologies',
  },
  '/hire/wix-developer': {
    title: 'Hire Wix Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated Wix developers from Nexuron Technologies for custom Wix websites, Velo development, eCommerce stores, redesigns, and website maintenance.',
    openGraphDescription: 'Hire experienced Wix developers for custom website development.',
    twitterDescription: 'Hire professional Wix developers for your next website project.',
    imageAlt: 'Hire Wix Developers from Nexuron Technologies',
  },
  '/hire/woocommerce-developer': {
    title: 'Hire WooCommerce Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated WooCommerce developers from Nexuron Technologies for custom online stores, plugin development, payment integration, migration, and WooCommerce optimization.',
    openGraphDescription: 'Hire skilled WooCommerce developers for scalable eCommerce solutions.',
    twitterDescription: 'Hire dedicated WooCommerce developers for your online business.',
    imageAlt: 'Hire WooCommerce Developers from Nexuron Technologies',
  },
  '/hire/wordpress-developer': {
    title: 'Hire WordPress Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated WordPress developers from Nexuron Technologies for custom themes, plugin development, WooCommerce stores, website optimization, and ongoing maintenance.',
    openGraphDescription:
      'Hire experienced WordPress developers for custom websites, plugins, and WooCommerce solutions.',
    twitterDescription: 'Hire expert WordPress developers for scalable and SEO-friendly websites.',
    imageAlt: 'Hire WordPress Developers from Nexuron Technologies',
  },
  '/hire/vuejs-developer': {
    title: 'Hire Vue.js Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated Vue.js developers from Nexuron Technologies to build modern SPAs, enterprise dashboards, progressive web apps, and scalable frontend solutions.',
    openGraphDescription: 'Hire experienced Vue.js developers for modern frontend development.',
    twitterDescription: 'Hire dedicated Vue.js developers for scalable web applications.',
    imageAlt: 'Hire Vue.js Developers from Nexuron Technologies',
  },
  '/hire/react-developer': {
    title: 'Hire React Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated React developers from Nexuron Technologies for ReactJS development, SaaS products, enterprise dashboards, web applications, and frontend modernization.',
    openGraphDescription:
      'Hire experienced React developers to build fast and scalable web applications.',
    twitterDescription: 'Hire dedicated React developers for your next web development project.',
    imageAlt: 'Hire React Developers from Nexuron Technologies',
  },
  '/hire/angular-developer': {
    title: 'Hire Angular Developers USA | Nexuron Technologies',
    description:
      'Hire Angular developers from Nexuron Technologies for enterprise applications, dashboards, SaaS products, frontend modernization, and custom web development.',
    openGraphDescription: 'Hire skilled Angular developers for enterprise-grade web applications.',
    twitterDescription: 'Hire dedicated Angular developers for scalable business applications.',
    imageAlt: 'Hire Angular Developers from Nexuron Technologies',
  },
  '/hire/javascript-developer': {
    title: 'Hire JavaScript Developers USA | Nexuron Technologies',
    description:
      'Hire experienced JavaScript developers from Nexuron Technologies for frontend, backend, full-stack development, web applications, and enterprise software projects.',
    openGraphDescription: 'Hire JavaScript developers for custom web and software development.',
    twitterDescription: 'Hire expert JavaScript developers for scalable web applications.',
    imageAlt: 'Hire JavaScript Developers from Nexuron Technologies',
  },
  '/hire/devops-developer': {
    title: 'Hire DevOps Engineers USA | Nexuron Technologies',
    description:
      'Hire dedicated DevOps engineers from Nexuron Technologies for AWS, Azure, Kubernetes, Docker, CI/CD implementation, cloud migration, and infrastructure automation.',
    openGraphDescription: 'Hire certified DevOps engineers for cloud infrastructure and automation.',
    twitterDescription: 'Hire DevOps experts for CI/CD, Kubernetes, Docker, AWS, and Azure projects.',
    imageAlt: 'Hire DevOps Engineers from Nexuron Technologies',
  },
  '/hire/python-developer': {
    title: 'Hire Python Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated Python developers from Nexuron Technologies for backend development, APIs, automation, AI applications, data processing, and enterprise software.',
    openGraphDescription: 'Hire experienced Python developers for scalable software solutions.',
    twitterDescription: 'Hire expert Python developers for backend and AI development.',
    imageAlt: 'Hire Python Developers from Nexuron Technologies',
  },
  '/hire/php-developer': {
    title: 'Hire PHP Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated PHP developers from Nexuron Technologies for custom web applications, CMS development, API integration, enterprise portals, and legacy modernization.',
    openGraphDescription: 'Hire experienced PHP developers for secure and scalable web development.',
    twitterDescription: 'Hire dedicated PHP developers for your custom software projects.',
    imageAlt: 'Hire PHP Developers from Nexuron Technologies',
  },
  '/hire/nodejs-developer': {
    title: 'Hire Node.js Developers USA | Nexuron Technologies',
    description:
      'Hire Node.js developers from Nexuron Technologies for backend APIs, real-time applications, microservices, enterprise platforms, and scalable web development.',
    openGraphDescription: 'Hire expert Node.js developers for backend development and APIs.',
    twitterDescription: 'Hire dedicated Node.js developers for scalable backend solutions.',
    imageAlt: 'Hire Node.js Developers from Nexuron Technologies',
  },
  '/hire/laravel-developer': {
    title: 'Hire Laravel Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated Laravel developers from Nexuron Technologies for SaaS applications, REST APIs, CRM systems, enterprise software, and custom Laravel development.',
    openGraphDescription:
      'Hire experienced Laravel developers for scalable web application development.',
    twitterDescription: 'Hire Laravel experts for enterprise web applications and SaaS platforms.',
    imageAlt: 'Hire Laravel Developers from Nexuron Technologies',
  },
  '/hire/dotnet-developer': {
    title: 'Hire .NET Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated .NET developers from Nexuron Technologies for ASP.NET Core development, enterprise software, cloud applications, API development, and legacy system modernization.',
    openGraphDescription:
      'Hire experienced .NET developers to build secure, scalable enterprise software and cloud applications.',
    twitterDescription:
      'Hire expert .NET developers for enterprise applications, APIs, and cloud solutions.',
    imageAlt: 'Hire .NET Developers from Nexuron Technologies',
  },
  '/hire/react-native-developer': {
    title: 'Hire React Native Developers USA | Nexuron Technologies',
    description:
      'Hire dedicated React Native developers from Nexuron Technologies to build cross-platform mobile applications for iOS and Android with faster development and lower costs.',
    openGraphDescription:
      'Hire React Native developers to build high-performance cross-platform mobile applications.',
    twitterDescription:
      'Hire expert React Native developers for cross-platform mobile app development.',
    imageAlt: 'Hire React Native Developers from Nexuron Technologies',
  },
  '/hire/flutter-developer': {
    title: 'Hire Flutter Developers USA | Nexuron Technologies',
    description:
      'Hire Flutter developers from Nexuron Technologies for custom cross-platform mobile applications, Flutter web development, UI implementation, and ongoing application support.',
    openGraphDescription:
      'Hire experienced Flutter developers for scalable cross-platform application development.',
    twitterDescription: 'Hire dedicated Flutter developers to build high-performance mobile applications.',
    imageAlt: 'Hire Flutter Developers from Nexuron Technologies',
  },
  '/hire/python-aiml-developer': {
    title: 'Hire Python AI/ML Developers USA | Nexuron Technologies',
    description:
      'Hire Python AI and Machine Learning developers from Nexuron Technologies for Generative AI, LLM integration, automation, predictive analytics, and intelligent software solutions.',
    openGraphDescription:
      'Hire AI engineers for machine learning, LLM development, and intelligent automation solutions.',
    twitterDescription: 'Hire AI and ML developers to build intelligent business applications.',
    imageAlt: 'Hire Python AI Developers from Nexuron Technologies',
  },
  '/hire/zapier-developer': {
    title: 'Hire Zapier Developers USA | Workflow Automation | Nexuron Technologies',
    description:
      'Hire Zapier developers from Nexuron Technologies to automate business workflows, integrate cloud applications, eliminate repetitive tasks, and improve productivity.',
    openGraphTitle: 'Hire Zapier Developers USA | Nexuron Technologies',
    openGraphDescription: 'Hire automation experts to build powerful Zapier workflows for your business.',
    twitterDescription:
      'Automate your business with experienced Zapier developers from Nexuron Technologies.',
    imageAlt: 'Hire Zapier Developers from Nexuron Technologies',
  },
  '/hire/n8n-developer': {
    title: 'Hire n8n Developers USA | Workflow Automation | Nexuron Technologies',
    description:
      'Hire dedicated n8n developers from Nexuron Technologies to build custom workflow automation, API integrations, AI-powered automations, and business process automation.',
    openGraphTitle: 'Hire n8n Developers USA | Nexuron Technologies',
    openGraphDescription:
      'Hire n8n automation experts to streamline workflows and connect your business applications.',
    twitterDescription: 'Build custom workflow automation with experienced n8n developers.',
    imageAlt: 'Hire n8n Developers from Nexuron Technologies',
  },
  '/hire/ai-developer': {
    title: 'Hire AI Developers USA | Nexuron Technologies',
    description:
      'Hire AI developers from Nexuron Technologies for Generative AI, ChatGPT integration, AI chatbots, LLM development, computer vision, recommendation systems, and intelligent automation.',
    openGraphDescription:
      'Hire experienced AI developers to build intelligent software and AI-powered business solutions.',
    twitterDescription:
      'Hire AI experts for Generative AI, LLMs, ChatGPT integration, and intelligent automation.',
    imageAlt: 'Hire AI Developers from Nexuron Technologies',
  },
  '/about-us': {
    title: 'About Nexuron Technologies | Software Development Company USA',
    description:
      'Learn about Nexuron Technologies, a trusted software development company delivering web development, mobile apps, AI solutions, cloud applications, UI/UX design, and digital transformation services across the USA.',
    openGraphDescription:
      'Discover Nexuron Technologies, your trusted technology partner for custom software and AI solutions.',
    twitterDescription:
      'Learn more about Nexuron Technologies and our mission to build innovative software solutions.',
    image: ABOUT_OG_IMAGE,
    imageAlt: 'Nexuron Technologies Team',
  },
  '/case-study': {
    title: 'Software Development Case Studies | Nexuron Technologies',
    description:
      "Explore Nexuron Technologies' software development case studies showcasing successful web applications, mobile apps, AI solutions, enterprise software, and digital transformation projects.",
    openGraphDescription:
      'Discover how Nexuron Technologies helps businesses solve complex challenges through custom software development.',
    twitterDescription:
      'Explore real-world software development success stories from Nexuron Technologies.',
    image: CASE_STUDY_OG_IMAGE,
    imageAlt: 'Nexuron Technologies Case Studies',
  },
};

function resolveImage(path, entry) {
  if (entry.image) return entry.image;
  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    return getServiceHeroImage(slug);
  }
  if (path.startsWith('/hire/')) {
    const slug = path.replace('/hire/', '');
    return getHireHeroImage(slug);
  }
  return null;
}

/** Build Next.js metadata object from audit entry. */
export function auditPageMetadata(path) {
  const entry = AUDIT_PAGES[path];
  if (!entry) {
    throw new Error(`Missing audit metadata for path: ${path}`);
  }

  const ogTitle = entry.openGraphTitle ?? entry.title;
  const ogDescription = entry.openGraphDescription ?? entry.description;
  const twitterTitle = entry.twitterTitle ?? ogTitle;
  const twitterDescription = entry.twitterDescription ?? entry.description;
  const image = resolveImage(path, entry);

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      siteName: 'Nexuron Technologies',
      locale: 'en_US',
      url: absoluteUrl(path),
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: entry.imageAlt,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      ...(image && { images: [image] }),
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
}

export function serviceAuditMetadata(serviceSlug) {
  return auditPageMetadata(`/services/${serviceSlug}`);
}

export function hireAuditMetadata(hireSlug) {
  return auditPageMetadata(`/hire/${hireSlug}`);
}
