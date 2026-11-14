/**
 * Industry pages shown under the Industry header menu.
 * Seeded from Nexuron case-study domains and common delivery verticals.
 */

function industry(entry) {
  return {
    showInNav: true,
    ...entry,
    href: entry.href ?? `/industry/${entry.slug}`,
  };
}

export const INDUSTRIES = [
  industry({
    slug: 'healthcare',
    name: 'Healthcare',
    description: 'Pharmacy safety, clinical workflows, and patient-facing digital products',
    heroTitle: 'Healthcare Software & Digital Solutions',
    heroDescription:
      'Secure, compliant software for clinics, pharmacies, and health-tech teams, from patient portals to safety and compliance platforms.',
    overviewTitle: 'Technology that supports better care delivery',
    overviewHighlight: 'better care delivery',
    overviewDescription:
      'We build healthcare products with security, usability, and operational reality in mind, so staff adopt them and patients get a smoother experience.',
    focusAreas: [
      { title: 'Clinical & pharmacy systems', description: 'Workflows for dispensing, safety checks, and operational compliance.' },
      { title: 'Patient engagement', description: 'Portals, reminders, and communication tools that reduce no-shows.' },
      { title: 'Data & integrations', description: 'HL7/FHIR-aware integrations and secure data exchange where required.' },
      { title: 'AI for healthcare ops', description: 'Document processing, triage helpers, and knowledge assistants for staff.' },
    ],
    outcomes: [
      'Faster operational workflows for clinical and pharmacy teams',
      'Clearer audit trails for safety and compliance processes',
      'Better patient communication with fewer manual follow-ups',
      'Integrations that reduce double entry across systems',
    ],
  }),
  industry({
    slug: 'education',
    name: 'Education',
    description: 'Learning platforms, campus systems, and student engagement tools',
    heroTitle: 'Education Software & Digital Learning',
    heroDescription:
      'Learning platforms, admin systems, and student engagement tools for schools, universities, and edtech teams.',
    overviewTitle: 'Digital products that support teaching and learning',
    overviewHighlight: 'teaching and learning',
    overviewDescription:
      'We build education software that is clear for students, practical for faculty, and reliable for administrators.',
    focusAreas: [
      { title: 'Learning platforms', description: 'Course delivery, assessments, and progress tracking.' },
      { title: 'Campus & admin systems', description: 'Admissions, scheduling, and operational workflows.' },
      { title: 'Student engagement', description: 'Portals, messaging, and support experiences.' },
      { title: 'Integrations', description: 'SIS, LMS, payment, and identity connections.' },
    ],
    outcomes: [
      'Clearer learning journeys for students',
      'Less manual work for faculty and staff',
      'Better visibility into progress and outcomes',
      'Systems that connect instead of living in silos',
    ],
  }),
  industry({
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Listings, brokerage tools, and property operations platforms',
    heroTitle: 'Real Estate Software Solutions',
    heroDescription:
      'Listing platforms, brokerage tools, and property operations software that help teams market, sell, and manage assets.',
    overviewTitle: 'Technology for property marketing and operations',
    overviewHighlight: 'property marketing and operations',
    overviewDescription:
      'We build real estate products around search, lead handling, transactions, and day-to-day property workflows.',
    focusAreas: [
      { title: 'Listing & search', description: 'Property discovery with filters, maps, and strong detail pages.' },
      { title: 'Lead & CRM flows', description: 'Inquiry capture, routing, and follow-up tools for agents.' },
      { title: 'Transactions', description: 'Document, scheduling, and status workflows for deals.' },
      { title: 'Property ops', description: 'Tools for owners, managers, and maintenance teams.' },
    ],
    outcomes: [
      'Faster response to buyer and tenant inquiries',
      'Cleaner listing and inventory management',
      'Fewer handoff gaps across sales and ops',
      'Digital experiences that match how people search for property',
    ],
  }),
  industry({
    slug: 'fitness',
    name: 'Fitness',
    description: 'Gym, coaching, and wellness apps for members and operators',
    heroTitle: 'Fitness & Wellness Technology',
    heroDescription:
      'Member apps, booking systems, and operator tools for gyms, studios, coaches, and wellness brands.',
    overviewTitle: 'Products that keep members active and operators in control',
    overviewHighlight: 'members active and operators in control',
    overviewDescription:
      'We build fitness software for scheduling, memberships, coaching, and retention, with mobile experiences that people actually use.',
    focusAreas: [
      { title: 'Member apps', description: 'Workouts, progress, bookings, and community features.' },
      { title: 'Studio & gym ops', description: 'Schedules, memberships, check-in, and staff tools.' },
      { title: 'Coaching platforms', description: 'Plans, messaging, and content for trainers.' },
      { title: 'Payments & retention', description: 'Subscriptions, renewals, and engagement flows.' },
    ],
    outcomes: [
      'Smoother class and session booking',
      'Clearer membership and payment handling',
      'Better member retention through engagement features',
      'Operator dashboards that reduce admin work',
    ],
  }),
  industry({
    slug: 'retail-ecommerce',
    name: 'Ecommerce',
    description: 'Storefronts, commerce apps, and retail operations software',
    heroTitle: 'Ecommerce & Retail Development',
    heroDescription:
      'Custom storefronts, commerce apps, and retail operations tools, built for conversion, inventory reality, and omnichannel customer experience.',
    overviewTitle: 'Commerce experiences that convert and operate well',
    overviewHighlight: 'convert and operate well',
    overviewDescription:
      'We build and extend e-commerce and retail systems with performance, integrations, and post-purchase experience in mind, not just a pretty catalog.',
    focusAreas: [
      { title: 'Custom storefronts & apps', description: 'Web and mobile shopping experiences tailored to your brand.' },
      { title: 'Checkout & payments', description: 'Reliable purchase flows with the gateways your market needs.' },
      { title: 'Inventory & ops', description: 'Back-office tools that keep stock, orders, and fulfillment aligned.' },
      { title: 'AI for retail', description: 'Recommendations, support chatbots, and demand insights.' },
    ],
    outcomes: [
      'Higher-converting product and checkout journeys',
      'Fewer order and inventory mismatches',
      'Support automation for common shopper questions',
      'A stack that can grow with new channels and regions',
    ],
  }),
  industry({
    slug: 'media-entertainment',
    name: 'Media & Entertainment',
    description: 'Content platforms, streaming, and audience engagement products',
    heroTitle: 'Media & Entertainment Technology',
    heroDescription:
      'Content platforms, streaming experiences, and audience engagement products for media brands and entertainment teams.',
    overviewTitle: 'Digital experiences built for content and audiences',
    overviewHighlight: 'content and audiences',
    overviewDescription:
      'We help media and entertainment teams ship products that publish, distribute, and engage without fragile workflows.',
    focusAreas: [
      { title: 'Content platforms', description: 'Publishing, catalogs, and editorial workflows.' },
      { title: 'Audience products', description: 'Apps, memberships, and personalized experiences.' },
      { title: 'Streaming & delivery', description: 'Playback, CDN-aware architecture, and device support.' },
      { title: 'Monetization', description: 'Subscriptions, ads integrations, and paywalls.' },
    ],
    outcomes: [
      'Faster publishing and content operations',
      'Stronger audience engagement across channels',
      'Clearer monetization paths',
      'Platforms that scale with traffic and catalog size',
    ],
  }),
  industry({
    slug: 'automotive',
    name: 'Automotive',
    description: 'Dealer, service, and connected vehicle digital products',
    heroTitle: 'Automotive Software Solutions',
    heroDescription:
      'Dealer platforms, service workflows, and customer-facing automotive products for sales, aftersales, and mobility teams.',
    overviewTitle: 'Digital systems for vehicle sales and service',
    overviewHighlight: 'vehicle sales and service',
    overviewDescription:
      'We build automotive software that connects showroom, service bay, and customer channels into clearer workflows.',
    focusAreas: [
      { title: 'Dealer platforms', description: 'Inventory, leads, and sales enablement tools.' },
      { title: 'Service workflows', description: 'Bookings, job tracking, and customer updates.' },
      { title: 'Customer apps', description: 'Ownership, service, and loyalty experiences.' },
      { title: 'Integrations', description: 'DMS, CRM, parts, and payment connections.' },
    ],
    outcomes: [
      'Faster lead-to-sale handling',
      'Clearer service booking and status updates',
      'Fewer manual handoffs between departments',
      'Better digital ownership experiences for customers',
    ],
  }),
  industry({
    slug: 'insurance',
    name: 'Insurance',
    description: 'Policy, claims, and broker tools for insurance teams',
    heroTitle: 'Insurance Software Development',
    heroDescription:
      'Policy, claims, and broker platforms built for accuracy, compliance, and customer clarity.',
    overviewTitle: 'Systems that make insurance operations easier to run',
    overviewHighlight: 'insurance operations easier to run',
    overviewDescription:
      'We design insurance software around policy lifecycle, claims handling, and partner workflows with auditability in mind.',
    focusAreas: [
      { title: 'Policy platforms', description: 'Quotes, issuance, endorsements, and renewals.' },
      { title: 'Claims workflows', description: 'Intake, status tracking, and adjuster tools.' },
      { title: 'Broker & partner portals', description: 'Distribution tools for agents and partners.' },
      { title: 'Customer self-service', description: 'Policy views, claims status, and document access.' },
    ],
    outcomes: [
      'Faster quoting and policy servicing',
      'Clearer claims visibility for staff and customers',
      'Stronger audit trails for regulated processes',
      'Less manual rework across teams and partners',
    ],
  }),
  industry({
    slug: 'banking-finance',
    name: 'Banking & Finance',
    description: 'Fintech products, banking workflows, and secure customer platforms',
    heroTitle: 'Banking & Finance Technology',
    heroDescription:
      'Secure fintech and banking products: onboarding, account experiences, payments, and internal operations tools.',
    overviewTitle: 'Financial products built for trust and usability',
    overviewHighlight: 'trust and usability',
    overviewDescription:
      'We build banking and finance software with security, clear UX, and operational controls that stand up in regulated environments.',
    focusAreas: [
      { title: 'Customer platforms', description: 'Onboarding, dashboards, and account experiences.' },
      { title: 'Payments & transfers', description: 'Reliable money-movement flows and reconciliations.' },
      { title: 'Ops & risk tools', description: 'Internal workflows for review, compliance, and support.' },
      { title: 'Integrations', description: 'Core banking, KYC, and payment provider connections.' },
    ],
    outcomes: [
      'Clearer digital banking journeys',
      'Stronger security and access controls',
      'Less operational friction for support teams',
      'Integrations that reduce manual finance ops',
    ],
  }),
  industry({
    slug: 'design-architecture',
    name: 'Design & Architecture',
    description: 'Project, portfolio, and collaboration tools for design firms',
    heroTitle: 'Design & Architecture Software',
    heroDescription:
      'Project management, portfolio, and collaboration platforms for architecture studios and design firms.',
    overviewTitle: 'Tools that fit creative and project delivery work',
    overviewHighlight: 'creative and project delivery work',
    overviewDescription:
      'We build software for design and architecture teams that need clean project tracking, client sharing, and portfolio presentation.',
    focusAreas: [
      { title: 'Project delivery', description: 'Milestones, tasks, and team collaboration.' },
      { title: 'Client portals', description: 'Reviews, approvals, and shared project spaces.' },
      { title: 'Portfolio sites', description: 'Brand-forward showcases for studios and practices.' },
      { title: 'File & asset workflows', description: 'Organized document and design asset handling.' },
    ],
    outcomes: [
      'Clearer project status for teams and clients',
      'Faster review and approval cycles',
      'Stronger digital presence for the practice',
      'Less time lost hunting files and feedback',
    ],
  }),
  industry({
    slug: 'logistics',
    name: 'Logistics',
    description: 'Fleet, warehouse, and shipment visibility platforms',
    heroTitle: 'Logistics & Supply Chain Technology',
    heroDescription:
      'Fleet, warehouse, and shipment platforms that improve visibility, coordination, and on-time delivery.',
    overviewTitle: 'Operational software for moving goods reliably',
    overviewHighlight: 'moving goods reliably',
    overviewDescription:
      'We build logistics systems for tracking, dispatch, warehouse ops, and customer updates that stay accurate under pressure.',
    focusAreas: [
      { title: 'Shipment visibility', description: 'Tracking, ETAs, and exception handling.' },
      { title: 'Fleet & dispatch', description: 'Routing, assignment, and driver tools.' },
      { title: 'Warehouse ops', description: 'Inbound, inventory, and outbound workflows.' },
      { title: 'Customer updates', description: 'Status notifications and self-serve tracking.' },
    ],
    outcomes: [
      'Better real-time shipment visibility',
      'Fewer missed handoffs across ops teams',
      'Clearer customer communication during transit',
      'Tools that scale with order volume',
    ],
  }),
  industry({
    slug: 'sports',
    name: 'Sports',
    description: 'Fan apps, club platforms, and sports operations software',
    heroTitle: 'Sports Technology Solutions',
    heroDescription:
      'Fan engagement apps, club platforms, and operations tools for leagues, teams, and sports brands.',
    overviewTitle: 'Digital products for fans, clubs, and sports ops',
    overviewHighlight: 'fans, clubs, and sports ops',
    overviewDescription:
      'We build sports software that connects audiences, athletes, and operators through clear digital experiences.',
    focusAreas: [
      { title: 'Fan engagement', description: 'Apps, content, tickets, and membership experiences.' },
      { title: 'Club platforms', description: 'Team ops, scheduling, and community tools.' },
      { title: 'Event & ticketing', description: 'Registration, access, and event workflows.' },
      { title: 'Performance & media', description: 'Stats, highlight, and content distribution features.' },
    ],
    outcomes: [
      'Stronger fan engagement across channels',
      'Clearer club and event operations',
      'Better digital membership and ticketing flows',
      'Platforms ready for peak event traffic',
    ],
  }),
  industry({
    slug: 'travel-hospitality',
    name: 'Travel & Tourism',
    description: 'Booking, operator, and guest experience platforms for travel brands',
    heroTitle: 'Travel & Tourism Technology',
    heroDescription:
      'Booking flows, operator tools, and traveler experience apps that keep travel businesses fast, personalized, and easy to run.',
    overviewTitle: 'Digital experiences that match traveler expectations',
    overviewHighlight: 'traveler expectations',
    overviewDescription:
      'From operator lead sharing to guest-facing apps, we build travel software that prioritizes timing, personalization, and reliable integrations.',
    focusAreas: [
      { title: 'Booking & marketplace flows', description: 'Search, availability, payments, and confirmation journeys that convert.' },
      { title: 'Operator & partner tools', description: 'Lead distribution, inventory updates, and partner portals.' },
      { title: 'Guest engagement', description: 'Notifications, itineraries, and support experiences across channels.' },
      { title: 'Automation & AI', description: 'Personalized updates, chatbots, and ops automations for high season.' },
    ],
    outcomes: [
      'Faster lead and booking communication',
      'Fewer missed opportunities during peak demand',
      'Smoother guest updates across email and messaging',
      'Admin tools operators can actually run day to day',
    ],
  }),
  industry({
    slug: 'apparel-fashion',
    name: 'Apparel & Fashion',
    description: 'Fashion commerce, brand sites, and retail experience platforms',
    heroTitle: 'Apparel & Fashion Technology',
    heroDescription:
      'Brand sites, fashion commerce, and retail experience platforms built for lookbooks, drops, and high-converting shopping journeys.',
    overviewTitle: 'Digital experiences that match fashion brand energy',
    overviewHighlight: 'fashion brand energy',
    overviewDescription:
      'We build apparel and fashion products that balance visual storytelling with inventory, checkout, and post-purchase reality.',
    focusAreas: [
      { title: 'Brand storefronts', description: 'Campaign-ready sites and collection experiences.' },
      { title: 'Fashion commerce', description: 'Variants, sizing, drops, and checkout flows.' },
      { title: 'Retail ops', description: 'Inventory, orders, and omnichannel tools.' },
      { title: 'Personalization', description: 'Recommendations, styling, and retention journeys.' },
    ],
    outcomes: [
      'Stronger collection and campaign launches',
      'Higher-converting product discovery and checkout',
      'Fewer inventory and fulfillment mismatches',
      'Brand experiences that still operate cleanly behind the scenes',
    ],
  }),

  // Existing pages kept for direct URLs, hidden from Industry nav
  industry({
    showInNav: false,
    slug: 'legal-tech',
    name: 'Legal Tech',
    description: 'Contract, clause, and practice-management platforms for legal teams',
    heroTitle: 'Legal Tech Software Development',
    heroDescription:
      'Contract and clause management, practice tools, and secure portals built for lawyers, legal ops, and legal-tech startups.',
    overviewTitle: 'Software that respects how legal work actually happens',
    overviewHighlight: 'legal work actually happens',
    overviewDescription:
      'We design legal platforms with document-heavy workflows, permissions, and search at the core, so attorneys find what they need without fighting the UI.',
    focusAreas: [
      { title: 'Contract & clause systems', description: 'Structured libraries, search, and collaboration around legal language.' },
      { title: 'Matter & practice tools', description: 'Case/matter tracking, client portals, and operational dashboards.' },
      { title: 'Document intelligence', description: 'AI-assisted review, extraction, and summarization with human oversight.' },
      { title: 'Security & access control', description: 'Role-based access, audit logs, and careful handling of sensitive files.' },
    ],
    outcomes: [
      'Faster contract drafting and review cycles',
      'Searchable clause and document libraries',
      'Fewer manual handoffs between legal and business teams',
      'Clear permissions for confidential client work',
    ],
  }),
  industry({
    showInNav: false,
    slug: 'construction',
    name: 'Construction',
    description: 'Field ops, resource, and modernization software for construction firms',
    heroTitle: 'Construction Software Solutions',
    heroDescription:
      'Modernize field and office operations: resource handling, time reporting, supplier workflows, and cloud apps that replace fragile legacy systems.',
    overviewTitle: 'Reliable software for complex construction operations',
    overviewHighlight: 'construction operations',
    overviewDescription:
      'We rebuild and extend construction systems with modern stacks, secure cloud deployment, and UX that works for office and field teams alike.',
    focusAreas: [
      { title: 'Legacy modernization', description: 'Migrate aging apps to React, .NET, and cloud platforms with less risk.' },
      { title: 'Resource & time tracking', description: 'Tools for crews, suppliers, and project reporting.' },
      { title: 'Invoice & supplier workflows', description: 'Streamlined approvals and document handling for project finance.' },
      { title: 'Mobile-friendly ops', description: 'Interfaces that work on site, not only at a desk.' },
    ],
    outcomes: [
      'Stable systems with proper test and staging environments',
      'Clearer project and resource visibility',
      'Less manual work around invoices and reporting',
      'A path off brittle legacy technology',
    ],
  }),
  industry({
    showInNav: false,
    slug: 'martech',
    name: 'MarTech',
    description: 'Marketing technology platforms, automation, and growth tooling',
    heroTitle: 'MarTech & Growth Platforms',
    heroDescription:
      'Marketing technology products and integrations: automation, analytics, and campaign tooling that help growth teams move faster.',
    overviewTitle: 'Build marketing systems that scale with your pipeline',
    overviewHighlight: 'scale with your pipeline',
    overviewDescription:
      'We help MarTech teams ship reliable platforms: data pipelines, automation, customer journeys, and AI-assisted content and personalization.',
    focusAreas: [
      { title: 'Marketing platforms', description: 'Custom tools for campaigns, attribution, and audience management.' },
      { title: 'Automation & orchestration', description: 'Connect CRM, ads, email, and analytics into dependable flows.' },
      { title: 'Personalization & AI', description: 'Content generation, recommendations, and smarter segmentation.' },
      { title: 'Integrations', description: 'Reliable connectors across the modern marketing stack.' },
    ],
    outcomes: [
      'Less manual campaign operations',
      'Cleaner customer and event data',
      'Faster experimentation for growth teams',
      'AI features that plug into real marketing workflows',
    ],
  }),
];

/** Nav order matches the Industry dropdown (left column, then right). */
export const INDUSTRY_NAV_ORDER = [
  'healthcare',
  'education',
  'real-estate',
  'fitness',
  'retail-ecommerce',
  'media-entertainment',
  'automotive',
  'insurance',
  'banking-finance',
  'design-architecture',
  'logistics',
  'sports',
  'travel-hospitality',
  'apparel-fashion',
];

export function getIndustry(slug) {
  return INDUSTRIES.find((i) => i.slug === slug) ?? null;
}

export function getIndustryNavItems() {
  return INDUSTRY_NAV_ORDER.map((slug) => {
    const item = getIndustry(slug);
    if (!item || item.showInNav === false) return null;
    return {
      name: item.name,
      href: item.href,
      description: item.description,
    };
  }).filter(Boolean);
}
