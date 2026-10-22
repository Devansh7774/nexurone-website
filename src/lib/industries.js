/**
 * Industry pages shown under the Industry header menu.
 * Seeded from Nexuron case-study domains and common delivery verticals.
 */

export const INDUSTRIES = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    href: '/industry/healthcare',
    description: 'Pharmacy safety, clinical workflows, and patient-facing digital products',
    heroTitle: 'Healthcare Software & Digital Solutions',
    heroDescription:
      'Secure, compliant software for clinics, pharmacies, and health-tech teams — from patient portals to safety and compliance platforms.',
    overviewTitle: 'Technology that supports better care delivery',
    overviewHighlight: 'better care delivery',
    overviewDescription:
      'We build healthcare products with security, usability, and operational reality in mind — so staff adopt them and patients get a smoother experience.',
    focusAreas: [
      {
        title: 'Clinical & pharmacy systems',
        description: 'Workflows for dispensing, safety checks, and operational compliance.',
      },
      {
        title: 'Patient engagement',
        description: 'Portals, reminders, and communication tools that reduce no-shows.',
      },
      {
        title: 'Data & integrations',
        description: 'HL7/FHIR-aware integrations and secure data exchange where required.',
      },
      {
        title: 'AI for healthcare ops',
        description: 'Document processing, triage helpers, and knowledge assistants for staff.',
      },
    ],
    outcomes: [
      'Faster operational workflows for clinical and pharmacy teams',
      'Clearer audit trails for safety and compliance processes',
      'Better patient communication with fewer manual follow-ups',
      'Integrations that reduce double entry across systems',
    ],
  },
  {
    slug: 'legal-tech',
    name: 'Legal Tech',
    href: '/industry/legal-tech',
    description: 'Contract, clause, and practice-management platforms for legal teams',
    heroTitle: 'Legal Tech Software Development',
    heroDescription:
      'Contract and clause management, practice tools, and secure portals built for lawyers, legal ops, and legal-tech startups.',
    overviewTitle: 'Software that respects how legal work actually happens',
    overviewHighlight: 'legal work actually happens',
    overviewDescription:
      'We design legal platforms with document-heavy workflows, permissions, and search at the core — so attorneys find what they need without fighting the UI.',
    focusAreas: [
      {
        title: 'Contract & clause systems',
        description: 'Structured libraries, search, and collaboration around legal language.',
      },
      {
        title: 'Matter & practice tools',
        description: 'Case/matter tracking, client portals, and operational dashboards.',
      },
      {
        title: 'Document intelligence',
        description: 'AI-assisted review, extraction, and summarization with human oversight.',
      },
      {
        title: 'Security & access control',
        description: 'Role-based access, audit logs, and careful handling of sensitive files.',
      },
    ],
    outcomes: [
      'Faster contract drafting and review cycles',
      'Searchable clause and document libraries',
      'Fewer manual handoffs between legal and business teams',
      'Clear permissions for confidential client work',
    ],
  },
  {
    slug: 'travel-hospitality',
    name: 'Travel & Hospitality',
    href: '/industry/travel-hospitality',
    description: 'Booking, operator, and guest experience platforms for travel brands',
    heroTitle: 'Travel & Hospitality Technology',
    heroDescription:
      'Booking flows, operator tools, and guest experience apps that keep travel businesses fast, personalized, and easy to run.',
    overviewTitle: 'Digital experiences that match traveler expectations',
    overviewHighlight: 'traveler expectations',
    overviewDescription:
      'From operator lead sharing to guest-facing apps, we build travel software that prioritizes timing, personalization, and reliable integrations.',
    focusAreas: [
      {
        title: 'Booking & marketplace flows',
        description: 'Search, availability, payments, and confirmation journeys that convert.',
      },
      {
        title: 'Operator & partner tools',
        description: 'Lead distribution, inventory updates, and partner portals.',
      },
      {
        title: 'Guest engagement',
        description: 'Notifications, itineraries, and support experiences across channels.',
      },
      {
        title: 'Automation & AI',
        description: 'Personalized updates, chatbots, and ops automations for high season.',
      },
    ],
    outcomes: [
      'Faster lead and booking communication',
      'Fewer missed opportunities during peak demand',
      'Smoother guest updates across email and messaging',
      'Admin tools operators can actually run day to day',
    ],
  },
  {
    slug: 'construction',
    name: 'Construction',
    href: '/industry/construction',
    description: 'Field ops, resource, and modernization software for construction firms',
    heroTitle: 'Construction Software Solutions',
    heroDescription:
      'Modernize field and office operations — resource handling, time reporting, supplier workflows, and cloud apps that replace fragile legacy systems.',
    overviewTitle: 'Reliable software for complex construction operations',
    overviewHighlight: 'construction operations',
    overviewDescription:
      'We rebuild and extend construction systems with modern stacks, secure cloud deployment, and UX that works for office and field teams alike.',
    focusAreas: [
      {
        title: 'Legacy modernization',
        description: 'Migrate aging apps to React, .NET, and cloud platforms with less risk.',
      },
      {
        title: 'Resource & time tracking',
        description: 'Tools for crews, suppliers, and project reporting.',
      },
      {
        title: 'Invoice & supplier workflows',
        description: 'Streamlined approvals and document handling for project finance.',
      },
      {
        title: 'Mobile-friendly ops',
        description: 'Interfaces that work on site, not only at a desk.',
      },
    ],
    outcomes: [
      'Stable systems with proper test and staging environments',
      'Clearer project and resource visibility',
      'Less manual work around invoices and reporting',
      'A path off brittle legacy technology',
    ],
  },
  {
    slug: 'martech',
    name: 'MarTech',
    href: '/industry/martech',
    description: 'Marketing technology platforms, automation, and growth tooling',
    heroTitle: 'MarTech & Growth Platforms',
    heroDescription:
      'Marketing technology products and integrations — automation, analytics, and campaign tooling that help growth teams move faster.',
    overviewTitle: 'Build marketing systems that scale with your pipeline',
    overviewHighlight: 'scale with your pipeline',
    overviewDescription:
      'We help MarTech teams ship reliable platforms: data pipelines, automation, customer journeys, and AI-assisted content and personalization.',
    focusAreas: [
      {
        title: 'Marketing platforms',
        description: 'Custom tools for campaigns, attribution, and audience management.',
      },
      {
        title: 'Automation & orchestration',
        description: 'Connect CRM, ads, email, and analytics into dependable flows.',
      },
      {
        title: 'Personalization & AI',
        description: 'Content generation, recommendations, and smarter segmentation.',
      },
      {
        title: 'Integrations',
        description: 'Reliable connectors across the modern marketing stack.',
      },
    ],
    outcomes: [
      'Less manual campaign operations',
      'Cleaner customer and event data',
      'Faster experimentation for growth teams',
      'AI features that plug into real marketing workflows',
    ],
  },
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    href: '/industry/retail-ecommerce',
    description: 'Storefronts, commerce apps, and retail operations software',
    heroTitle: 'Retail & E-commerce Development',
    heroDescription:
      'Custom storefronts, commerce apps, and retail operations tools — built for conversion, inventory reality, and omnichannel customer experience.',
    overviewTitle: 'Commerce experiences that convert and operate well',
    overviewHighlight: 'convert and operate well',
    overviewDescription:
      'We build and extend e-commerce and retail systems with performance, integrations, and post-purchase experience in mind — not just a pretty catalog.',
    focusAreas: [
      {
        title: 'Custom storefronts & apps',
        description: 'Web and mobile shopping experiences tailored to your brand.',
      },
      {
        title: 'Checkout & payments',
        description: 'Reliable purchase flows with the gateways your market needs.',
      },
      {
        title: 'Inventory & ops',
        description: 'Back-office tools that keep stock, orders, and fulfillment aligned.',
      },
      {
        title: 'AI for retail',
        description: 'Recommendations, support chatbots, and demand insights.',
      },
    ],
    outcomes: [
      'Higher-converting product and checkout journeys',
      'Fewer order and inventory mismatches',
      'Support automation for common shopper questions',
      'A stack that can grow with new channels and regions',
    ],
  },
];

export function getIndustry(slug) {
  return INDUSTRIES.find((i) => i.slug === slug) ?? null;
}

export function getIndustryNavItems() {
  return INDUSTRIES.map((i) => ({
    name: i.name,
    href: i.href,
    description: i.description,
  }));
}
