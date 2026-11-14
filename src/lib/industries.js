/**
 * Industry pages shown under the Industry header menu.
 * Seeded from Nexuron case-study domains and common delivery verticals.
 */

import { INDUSTRY_SPECIFIC_CONTENT } from './industrySpecificContent.js';

function industry(entry) {
  return {
    showInNav: true,
    caseStudySlugs: [],
    relatedSlugs: [],
    faqs: [],
    solutions: [],
    benefits: [],
    technologies: [],
    challenges: [],
    useCases: [],
    howWeHelp: [],
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
      'Secure, compliant software for clinics, pharmacies, and health-tech teams. From patient portals to safety and compliance platforms built for real clinical workflows.',
    overviewTitle: 'Technology that supports better care delivery',
    overviewHighlight: 'better care delivery',
    overviewDescription:
      'Healthcare teams need software that fits regulated workflows, protects sensitive data, and gets adopted by busy staff. We build clinical, pharmacy, and patient-facing products with security, usability, and operational reality in mind, so care teams move faster and patients get a smoother experience.',
    focusAreas: [
      { title: 'Clinical & pharmacy systems', description: 'Workflows for dispensing, safety checks, and operational compliance.' },
      { title: 'Patient engagement', description: 'Portals, reminders, and communication tools that reduce no-shows.' },
      { title: 'Data & integrations', description: 'HL7/FHIR-aware integrations and secure data exchange where required.' },
      { title: 'AI for healthcare ops', description: 'Document processing, triage helpers, and knowledge assistants for staff.' },
    ],
    solutions: [
      {
        title: 'Pharmacy safety & compliance platforms',
        description:
          'Incident reporting, anonymous learning, and audit-ready workflows that help pharmacies meet college expectations without blame culture.',
        examples: ['Incident capture', 'Anonymous reporting', 'Safety analytics'],
      },
      {
        title: 'Clinical & operations systems',
        description:
          'Scheduling, dispensing support, inventory, and staff tools designed around how clinics and pharmacies actually work day to day.',
        examples: ['Ops dashboards', 'Workflow automation', 'Role-based access'],
      },
      {
        title: 'Patient engagement products',
        description:
          'Portals, reminders, telehealth-ready experiences, and communication flows that reduce no-shows and keep patients informed.',
        examples: ['Patient portals', 'Reminders', 'Secure messaging'],
      },
      {
        title: 'Healthcare data & integrations',
        description:
          'Secure exchange between EHRs, pharmacy systems, and internal tools with careful handling of PHI and audit trails.',
        examples: ['HL7 / FHIR', 'API integrations', 'Audit logging'],
      },
    ],
    benefits: [
      {
        title: 'Compliance built into the product',
        description: 'Access control, audit trails, and privacy-minded design from the first sprint, not bolted on later.',
      },
      {
        title: 'Faster clinical and pharmacy workflows',
        description: 'Less double entry and fewer manual handoffs so staff spend more time on care, not paperwork.',
      },
      {
        title: 'Clearer patient communication',
        description: 'Reminders, status updates, and self-serve access that cut down on phone tag and missed appointments.',
      },
      {
        title: 'Systems that scale with your network',
        description: 'Architecture ready for multi-location rollout, partner integrations, and growing data volume.',
      },
      {
        title: 'AI that supports staff, not replaces judgment',
        description: 'Assistants and analytics that surface trends and speed routine tasks while humans stay in control.',
      },
      {
        title: 'Long-term product partnership',
        description: 'After launch we keep iterating as regulations, channels, and care models evolve.',
      },
    ],
    technologies: [
      {
        title: 'Secure web & mobile platforms',
        description: 'Modern React and mobile apps with encryption, role-based access, and careful session handling for PHI.',
      },
      {
        title: 'Healthcare integrations',
        description: 'HL7/FHIR-aware APIs and connectors that reduce double entry across EHRs and pharmacy systems.',
      },
      {
        title: 'AI for safety and ops',
        description: 'Trend analytics, document helpers, and knowledge assistants grounded in approved clinical content.',
      },
      {
        title: 'Cloud & compliance-ready hosting',
        description: 'Cloud deployments with monitoring, backups, and environments that support regulated delivery.',
      },
      {
        title: 'Audit & reporting layers',
        description: 'Structured logs and reporting that help teams demonstrate process adherence when asked.',
      },
      {
        title: 'Workflow automation',
        description: 'Rules and automations for intake, follow-ups, and notifications that keep queues moving.',
      },
    ],
    caseStudySlugs: ['rx-incident-safety-platform'],
    relatedSlugs: ['insurance', 'fitness', 'banking-finance', 'travel-hospitality'],
    faqs: [
      {
        question: 'Do you build custom healthcare software for clinics and pharmacies?',
        answer:
          'Yes. We design and build custom platforms for pharmacy safety, clinical operations, patient engagement, and health-tech products, shaped around your workflows and compliance needs.',
      },
      {
        question: 'Can you integrate with existing EHR or pharmacy systems?',
        answer:
          'Yes. We plan integrations early and connect to existing systems through APIs or standards-aware exchange where your stack supports it, with clear ownership of data flows and error handling.',
      },
      {
        question: 'How do you approach privacy and security for healthcare products?',
        answer:
          'We treat access control, encryption, auditability, and least-privilege design as part of the product from day one. Exact controls depend on your market, data types, and hosting requirements.',
      },
      {
        question: 'Where does AI fit in healthcare projects with Nexuron?',
        answer:
          'We use AI for practical ops support: incident trend insights, document processing, staff knowledge assistants, and triage helpers, with human oversight and approved data sources.',
      },
    ],
    ctaTitle: 'Build your next healthcare product with us',
    ctaDescription:
      'Tell us about your clinic, pharmacy, or health-tech roadmap. We will help you scope a secure, usable solution your teams can actually run.',
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
      'Learning platforms, admin systems, and student engagement tools for schools, universities, and edtech teams that need clarity for students and reliability for staff.',
    overviewTitle: 'Digital products that support teaching and learning',
    overviewHighlight: 'teaching and learning',
    overviewDescription:
      'Education software fails when it is unclear for students or painful for faculty. We build learning, campus, and engagement products that are practical to run, easy to navigate, and connected to the SIS, LMS, and identity systems you already use.',
    focusAreas: [
      { title: 'Learning platforms', description: 'Course delivery, assessments, and progress tracking.' },
      { title: 'Campus & admin systems', description: 'Admissions, scheduling, and operational workflows.' },
      { title: 'Student engagement', description: 'Portals, messaging, and support experiences.' },
      { title: 'Integrations', description: 'SIS, LMS, payment, and identity connections.' },
    ],
    solutions: [
      {
        title: 'Learning & assessment platforms',
        description: 'Course delivery, quizzes, progress tracking, and content experiences that keep learners oriented.',
        examples: ['Course portals', 'Assessments', 'Progress dashboards'],
      },
      {
        title: 'Campus & admin systems',
        description: 'Admissions, scheduling, and operational workflows that reduce spreadsheet-driven work for staff.',
        examples: ['Admissions', 'Scheduling', 'Staff tools'],
      },
      {
        title: 'Student engagement products',
        description: 'Portals, messaging, and support experiences that make it easier for students to find answers and stay on track.',
        examples: ['Student portals', 'Notifications', 'Help flows'],
      },
      {
        title: 'Education integrations',
        description: 'SIS, LMS, payment, and identity connections so data stays consistent across campus systems.',
        examples: ['SIS sync', 'SSO', 'Payment gateways'],
      },
    ],
    benefits: [
      { title: 'Clearer learning journeys', description: 'Students and faculty see what matters next without hunting across tools.' },
      { title: 'Less manual admin work', description: 'Automations and integrations cut repetitive updates and status chasing.' },
      { title: 'Better visibility into outcomes', description: 'Progress and completion data that leaders can actually use.' },
      { title: 'Connected campus systems', description: 'Fewer silos between LMS, SIS, payments, and student portals.' },
      { title: 'Accessible, modern UX', description: 'Interfaces designed for mixed devices and varied digital comfort levels.' },
      { title: 'Room to grow programs', description: 'Architecture that supports new courses, campuses, or product lines.' },
    ],
    technologies: [
      { title: 'Web & mobile learning apps', description: 'Responsive platforms students and faculty can use on campus or remotely.' },
      { title: 'LMS / SIS integrations', description: 'Reliable sync for enrollments, grades, and identity where your stack allows.' },
      { title: 'AI study & support helpers', description: 'FAQ bots and content assistants grounded in approved course materials.' },
      { title: 'Analytics for educators', description: 'Dashboards for engagement, completion, and operational bottlenecks.' },
      { title: 'Secure identity & access', description: 'SSO and role-based permissions for students, faculty, and admins.' },
      { title: 'Content & assessment tooling', description: 'Structured content, media, and evaluation flows that stay maintainable.' },
    ],
    relatedSlugs: ['media-entertainment', 'sports', 'design-architecture', 'fitness'],
    faqs: [
      {
        question: 'Do you build custom edtech products or extend existing LMS setups?',
        answer:
          'Both. We build custom learning and campus products, and we also extend or integrate with existing LMS and SIS platforms when that is the better path.',
      },
      {
        question: 'Can you connect student portals to SIS and payment systems?',
        answer:
          'Yes. We map integrations early and build reliable connections for enrollments, identity, and payments so students and staff are not re-entering the same data.',
      },
      {
        question: 'How do you keep education products usable for mixed audiences?',
        answer:
          'We design for clarity: simple navigation, accessible patterns, and workflows that work for students, faculty, and administrators with different levels of tech comfort.',
      },
      {
        question: 'Where can AI help in education projects?',
        answer:
          'Practical places include study assistants grounded in approved materials, support chat for common questions, and analytics that highlight learners who may need attention.',
      },
    ],
    ctaTitle: 'Plan your education product with Nexuron',
    ctaDescription:
      'Share your learning, campus, or edtech goals. We will help you define a build that students adopt and staff can operate.',
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
      'Listing platforms, brokerage tools, and property operations software that help teams market, sell, and manage assets with fewer handoff gaps.',
    overviewTitle: 'Technology for property marketing and operations',
    overviewHighlight: 'property marketing and operations',
    overviewDescription:
      'Real estate teams lose deals when listings, leads, and transactions live in disconnected tools. We build search, CRM, transaction, and property-ops products around how buyers search and how agents and managers actually close and operate.',
    focusAreas: [
      { title: 'Listing & search', description: 'Property discovery with filters, maps, and strong detail pages.' },
      { title: 'Lead & CRM flows', description: 'Inquiry capture, routing, and follow-up tools for agents.' },
      { title: 'Transactions', description: 'Document, scheduling, and status workflows for deals.' },
      { title: 'Property ops', description: 'Tools for owners, managers, and maintenance teams.' },
    ],
    solutions: [
      {
        title: 'Listing & search platforms',
        description: 'Property discovery with filters, maps, media, and detail pages that convert browsers into inquiries.',
        examples: ['Map search', 'Listing pages', 'Saved searches'],
      },
      {
        title: 'Lead & CRM workflows',
        description: 'Inquiry capture, routing, and follow-up tools so agents respond before the opportunity cools.',
        examples: ['Lead routing', 'CRM sync', 'Follow-up tasks'],
      },
      {
        title: 'Transaction & document flows',
        description: 'Deal status, scheduling, and document handling that keep buyers, sellers, and brokers aligned.',
        examples: ['Deal pipeline', 'Document sharing', 'Status updates'],
      },
      {
        title: 'Property operations tools',
        description: 'Owner, manager, and maintenance workflows for day-to-day asset operations after the sale or lease.',
        examples: ['Maintenance tickets', 'Owner portals', 'Unit inventory'],
      },
    ],
    benefits: [
      { title: 'Faster inquiry response', description: 'Leads reach the right agent with context instead of getting lost in inboxes.' },
      { title: 'Cleaner listing inventory', description: 'One place to manage status, media, and availability across channels.' },
      { title: 'Fewer deal handoff gaps', description: 'Sales and ops see the same transaction status and documents.' },
      { title: 'Buyer-ready digital experiences', description: 'Search and detail pages that match how people actually look for property.' },
      { title: 'Better portfolio visibility', description: 'Managers get clearer views of units, tickets, and occupancy.' },
      { title: 'Integrations that stick', description: 'CRM, MLS-adjacent, and payment connections planned into the product.' },
    ],
    technologies: [
      { title: 'Search & map experiences', description: 'Fast filtering, geospatial views, and detail pages built for conversion.' },
      { title: 'CRM & messaging integrations', description: 'Connect inquiries to the tools agents already live in.' },
      { title: 'AI listing & lead helpers', description: 'Drafts, lead scoring hints, and FAQ bots for common property questions.' },
      { title: 'Document & workflow engines', description: 'Structured deal steps, uploads, and notifications that keep momentum.' },
      { title: 'Owner & tenant portals', description: 'Self-serve access for statements, tickets, and property updates.' },
      { title: 'Analytics for brokerages', description: 'Visibility into lead response times, listing performance, and ops load.' },
    ],
    relatedSlugs: ['banking-finance', 'construction', 'insurance', 'design-architecture'],
    faqs: [
      {
        question: 'Can you build a custom property listing and search platform?',
        answer:
          'Yes. We build listing, search, and detail experiences with filters, maps, and inquiry flows tailored to your market and inventory.',
      },
      {
        question: 'Do you integrate with CRM tools used by brokerages?',
        answer:
          'Yes. We connect lead capture and routing to the CRM or sales tools your agents already use so follow-up stays consistent.',
      },
      {
        question: 'Can the same product cover sales and property operations?',
        answer:
          'It can. Many clients start with listings and leads, then expand into transaction status, owner portals, or maintenance workflows on the same foundation.',
      },
      {
        question: 'Where does AI help in real estate software?',
        answer:
          'Useful applications include listing copy assistance, lead prioritization hints, chatbot FAQs for common buyer questions, and search improvements over time.',
      },
    ],
    ctaTitle: 'Build real estate software that closes more cleanly',
    ctaDescription:
      'Tell us about your brokerage, marketplace, or property ops needs. We will help you ship a product agents and clients can trust.',
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
      'Member apps, booking systems, and operator tools for gyms, studios, coaches, and wellness brands that need retention as much as scheduling.',
    overviewTitle: 'Products that keep members active and operators in control',
    overviewHighlight: 'members active and operators in control',
    overviewDescription:
      'Fitness businesses stall when booking, memberships, and coaching live in separate apps. We build member experiences and operator tools that make scheduling smooth, payments clear, and retention features part of the product, not an afterthought.',
    focusAreas: [
      { title: 'Member apps', description: 'Workouts, progress, bookings, and community features.' },
      { title: 'Studio & gym ops', description: 'Schedules, memberships, check-in, and staff tools.' },
      { title: 'Coaching platforms', description: 'Plans, messaging, and content for trainers.' },
      { title: 'Payments & retention', description: 'Subscriptions, renewals, and engagement flows.' },
    ],
    solutions: [
      {
        title: 'Member apps & portals',
        description: 'Workouts, progress tracking, bookings, and community features members actually open between visits.',
        examples: ['Mobile apps', 'Progress tracking', 'Class booking'],
      },
      {
        title: 'Studio & gym operations',
        description: 'Schedules, memberships, check-in, and staff tools that reduce front-desk chaos.',
        examples: ['Memberships', 'Check-in', 'Staff schedules'],
      },
      {
        title: 'Coaching platforms',
        description: 'Plans, messaging, and content tools for trainers managing hybrid or remote clients.',
        examples: ['Training plans', 'Coach messaging', 'Content libraries'],
      },
      {
        title: 'Payments & retention flows',
        description: 'Subscriptions, renewals, and engagement journeys that keep revenue and attendance healthier.',
        examples: ['Subscriptions', 'Renewal reminders', 'Offers'],
      },
    ],
    benefits: [
      { title: 'Smoother booking', description: 'Members book and cancel without flooding the front desk.' },
      { title: 'Clearer membership handling', description: 'Plans, renewals, and payments stay visible for staff and members.' },
      { title: 'Stronger retention loops', description: 'Progress, reminders, and community features keep people coming back.' },
      { title: 'Less operator admin', description: 'Dashboards and automations reduce manual scheduling and follow-up.' },
      { title: 'Coach-ready tooling', description: 'Trainers manage plans and clients without juggling spreadsheets.' },
      { title: 'Brand-ready mobile UX', description: 'Experiences that feel like your brand, not a generic gym template.' },
    ],
    technologies: [
      { title: 'Cross-platform member apps', description: 'iOS and Android experiences with reliable booking and notifications.' },
      { title: 'Scheduling & capacity engines', description: 'Class, session, and resource booking that respects real capacity rules.' },
      { title: 'Payments & subscriptions', description: 'Recurring billing, renewals, and failed-payment recovery flows.' },
      { title: 'AI coaching & support helpers', description: 'Plan suggestions, FAQ bots, and churn-risk signals for operators.' },
      { title: 'Operator analytics', description: 'Attendance, retention, and revenue views that guide staffing and offers.' },
      { title: 'Integrations', description: 'Connect access control, wearables, or marketing tools when the business needs them.' },
    ],
    relatedSlugs: ['healthcare', 'sports', 'retail-ecommerce', 'media-entertainment'],
    faqs: [
      {
        question: 'Do you build custom fitness apps or studio management software?',
        answer:
          'Yes. We build member apps, booking systems, coaching platforms, and operator tools tailored to gyms, studios, and wellness brands.',
      },
      {
        question: 'Can you handle subscriptions and membership renewals?',
        answer:
          'Yes. We design payment and membership flows for recurring plans, renewals, and the edge cases operators deal with every month.',
      },
      {
        question: 'Will the product work for both in-person and remote coaching?',
        answer:
          'It can. Many builds combine on-site booking with digital plans, messaging, and content for hybrid coaching models.',
      },
      {
        question: 'How can AI help a fitness business?',
        answer:
          'Common uses include workout plan assistance, member FAQ bots, churn-risk alerts, and personalized engagement nudges based on attendance patterns.',
      },
    ],
    ctaTitle: 'Build fitness tech members actually use',
    ctaDescription:
      'Tell us about your gym, studio, or coaching brand. We will help you ship booking, membership, and engagement tools that stick.',
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
      'Custom storefronts, commerce apps, and retail operations tools built for conversion, inventory reality, and omnichannel customer experience.',
    overviewTitle: 'Commerce experiences that convert and operate well',
    overviewHighlight: 'convert and operate well',
    overviewDescription:
      'Pretty catalogs fail when checkout breaks or inventory drifts. We build and extend ecommerce and retail systems with performance, payments, fulfillment, and post-purchase support in mind, so growth does not create operational debt.',
    focusAreas: [
      { title: 'Custom storefronts & apps', description: 'Web and mobile shopping experiences tailored to your brand.' },
      { title: 'Checkout & payments', description: 'Reliable purchase flows with the gateways your market needs.' },
      { title: 'Inventory & ops', description: 'Back-office tools that keep stock, orders, and fulfillment aligned.' },
      { title: 'AI for retail', description: 'Recommendations, support chatbots, and demand insights.' },
    ],
    solutions: [
      {
        title: 'Custom storefronts & commerce apps',
        description: 'Brand-led shopping experiences on web and mobile with performance and SEO in the plan.',
        examples: ['Custom storefronts', 'Mobile commerce', 'Collection pages'],
      },
      {
        title: 'Checkout & payments',
        description: 'Reliable purchase flows with the gateways, taxes, and edge cases your market needs.',
        examples: ['Checkout UX', 'Payment gateways', 'Order confirmation'],
      },
      {
        title: 'Inventory & retail ops',
        description: 'Back-office tools that keep stock, orders, returns, and fulfillment aligned across channels.',
        examples: ['Inventory sync', 'Order management', 'Returns'],
      },
      {
        title: 'Retail AI & personalization',
        description: 'Recommendations, support chatbots, and demand insights that help conversion and service teams.',
        examples: ['Product recommendations', 'Support bots', 'Demand signals'],
      },
    ],
    benefits: [
      { title: 'Higher-converting journeys', description: 'Product discovery and checkout tuned for speed and clarity.' },
      { title: 'Fewer inventory mismatches', description: 'Stock and order state stay closer to reality across channels.' },
      { title: 'Support automation', description: 'Common shopper questions get answered without burning the team.' },
      { title: 'Omnichannel readiness', description: 'A stack that can grow into new regions, apps, or store formats.' },
      { title: 'Brand-consistent UX', description: 'Commerce that feels like your brand, not a generic theme.' },
      { title: 'Measurable operations', description: 'Clearer views of conversion, fulfillment, and service load.' },
    ],
    technologies: [
      { title: 'Modern commerce front ends', description: 'Fast storefronts with strong product detail and collection experiences.' },
      { title: 'Payments & tax flows', description: 'Gateways and checkout logic matched to your markets.' },
      { title: 'OMS & inventory integrations', description: 'Connect catalog, warehouse, and fulfillment systems reliably.' },
      { title: 'AI recommendations & chat', description: 'Personalization and support assistants grounded in your catalog and policies.' },
      { title: 'Search & merchandising', description: 'Search, filters, and merchandising tools that help shoppers find the right SKU.' },
      { title: 'Analytics & experimentation', description: 'Instrumentation for conversion, funnel drops, and campaign impact.' },
    ],
    relatedSlugs: ['apparel-fashion', 'logistics', 'media-entertainment', 'fitness'],
    faqs: [
      {
        question: 'Do you build custom ecommerce or extend platforms like Shopify?',
        answer:
          'Both. We build custom commerce experiences and also extend existing platforms with apps, storefronts, and operational tooling when that fits better.',
      },
      {
        question: 'Can you connect storefronts to inventory and fulfillment systems?',
        answer:
          'Yes. Integrations for catalog, stock, orders, and fulfillment are planned into the architecture so growth does not create sync surprises.',
      },
      {
        question: 'How do you improve conversion without ignoring operations?',
        answer:
          'We treat checkout UX, performance, and back-office accuracy as one product. A beautiful catalog that sells wrong stock is not a win.',
      },
      {
        question: 'Where does AI fit in retail projects?',
        answer:
          'Common uses include product recommendations, support chatbots, search improvements, and demand or assortment insights for operators.',
      },
    ],
    ctaTitle: 'Build commerce that converts and operates',
    ctaDescription:
      'Share your catalog, channels, and growth goals. We will help you scope a storefront and ops stack that can scale.',
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
      'Content platforms, streaming experiences, and audience engagement products for media brands that need to publish, distribute, and monetize without fragile workflows.',
    overviewTitle: 'Digital experiences built for content and audiences',
    overviewHighlight: 'content and audiences',
    overviewDescription:
      'Media teams lose time when publishing, delivery, and audience products are glued together with brittle scripts. We help entertainment and media brands ship platforms that publish cleanly, engage audiences, and support subscriptions or ads with architecture that can take traffic spikes.',
    focusAreas: [
      { title: 'Content platforms', description: 'Publishing, catalogs, and editorial workflows.' },
      { title: 'Audience products', description: 'Apps, memberships, and personalized experiences.' },
      { title: 'Streaming & delivery', description: 'Playback, CDN-aware architecture, and device support.' },
      { title: 'Monetization', description: 'Subscriptions, ads integrations, and paywalls.' },
    ],
    solutions: [
      {
        title: 'Content & publishing platforms',
        description: 'Editorial workflows, catalogs, and publishing tools that keep content moving without chaos.',
        examples: ['CMS workflows', 'Catalogs', 'Editorial tools'],
      },
      {
        title: 'Audience apps & memberships',
        description: 'Apps and membership experiences that keep fans returning across devices.',
        examples: ['Fan apps', 'Memberships', 'Personalized feeds'],
      },
      {
        title: 'Streaming & delivery',
        description: 'Playback experiences and CDN-aware architecture designed for peaks and multi-device viewing.',
        examples: ['Video playback', 'CDN strategy', 'Device support'],
      },
      {
        title: 'Monetization systems',
        description: 'Subscriptions, paywalls, and ads integrations that match how your audience pays or engages.',
        examples: ['Subscriptions', 'Paywalls', 'Ads integrations'],
      },
    ],
    benefits: [
      { title: 'Faster publishing', description: 'Editorial teams ship content without fighting the tooling.' },
      { title: 'Stronger audience engagement', description: 'Personalized and membership experiences that keep people coming back.' },
      { title: 'Clearer monetization paths', description: 'Subscriptions and ads wired into the product, not bolted on later.' },
      { title: 'Traffic-ready platforms', description: 'Architecture planned for spikes around releases and live moments.' },
      { title: 'Cross-device consistency', description: 'Experiences that feel coherent on web, mobile, and connected devices.' },
      { title: 'Operational visibility', description: 'Better views of catalog health, engagement, and revenue signals.' },
    ],
    technologies: [
      { title: 'Content platforms & CMS', description: 'Structured publishing systems with workflows editors can trust.' },
      { title: 'Streaming & media delivery', description: 'Playback, packaging, and CDN-aware patterns for reliable viewing.' },
      { title: 'Personalization & AI', description: 'Recommendations, content tagging, and audience assistants where they add value.' },
      { title: 'Membership & billing', description: 'Subscription entitlements, paywalls, and account experiences.' },
      { title: 'Analytics for media', description: 'Engagement, retention, and content performance instrumentation.' },
      { title: 'API-first distribution', description: 'Clean APIs for apps, partners, and multi-surface delivery.' },
    ],
    relatedSlugs: ['sports', 'retail-ecommerce', 'apparel-fashion', 'education'],
    faqs: [
      {
        question: 'Do you build streaming products or content platforms?',
        answer:
          'Yes. We build publishing platforms, audience apps, and streaming-ready experiences depending on where your product needs the most help.',
      },
      {
        question: 'Can you support subscriptions and paywalled content?',
        answer:
          'Yes. We implement membership, entitlement, and paywall flows that connect cleanly to your content catalog and billing provider.',
      },
      {
        question: 'How do you plan for traffic spikes?',
        answer:
          'We design for peaks early: caching, CDN-aware delivery, and architecture choices that keep premiere or live moments from becoming outages.',
      },
      {
        question: 'Where does AI help media products?',
        answer:
          'Useful applications include recommendations, metadata tagging, content summarization for editors, and audience support assistants.',
      },
    ],
    ctaTitle: 'Ship media products audiences return to',
    ctaDescription:
      'Tell us about your catalog, audience, and monetization model. We will help you build a platform that publishes and scales cleanly.',
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
      'Automotive customers expect digital clarity from first inquiry through service visits. We build dealer, aftersales, and ownership products that connect showroom, service bay, and customer channels so leads and jobs do not get lost between systems.',
    focusAreas: [
      { title: 'Dealer platforms', description: 'Inventory, leads, and sales enablement tools.' },
      { title: 'Service workflows', description: 'Bookings, job tracking, and customer updates.' },
      { title: 'Customer apps', description: 'Ownership, service, and loyalty experiences.' },
      { title: 'Integrations', description: 'DMS, CRM, parts, and payment connections.' },
    ],
    solutions: [
      {
        title: 'Dealer sales platforms',
        description: 'Inventory, leads, and sales enablement tools that help teams respond and close faster.',
        examples: ['Vehicle inventory', 'Lead routing', 'Sales dashboards'],
      },
      {
        title: 'Service & aftersales workflows',
        description: 'Bookings, job tracking, and customer updates that keep the service bay and waiting room aligned.',
        examples: ['Service booking', 'Job status', 'Customer alerts'],
      },
      {
        title: 'Ownership & loyalty apps',
        description: 'Customer experiences for service history, reminders, and loyalty programs after the sale.',
        examples: ['Owner apps', 'Service history', 'Loyalty'],
      },
      {
        title: 'Automotive integrations',
        description: 'DMS, CRM, parts, and payment connections that reduce re-keying across departments.',
        examples: ['DMS sync', 'CRM', 'Parts systems'],
      },
    ],
    benefits: [
      { title: 'Faster lead-to-sale handling', description: 'Inquiries reach the right salesperson with vehicle context attached.' },
      { title: 'Clearer service updates', description: 'Customers know booking status without calling the desk repeatedly.' },
      { title: 'Fewer departmental handoffs', description: 'Sales, service, and parts see shared status instead of siloed notes.' },
      { title: 'Better ownership experiences', description: 'Digital tools that keep customers connected after delivery.' },
      { title: 'Integration-first delivery', description: 'DMS and CRM connections planned before features pile up.' },
      { title: 'Actionable dealership analytics', description: 'Visibility into response times, bookings, and throughput.' },
    ],
    technologies: [
      { title: 'Dealer & service web apps', description: 'Modern interfaces for inventory, leads, and workshop operations.' },
      { title: 'Customer mobile experiences', description: 'Owner apps for booking, history, and loyalty engagement.' },
      { title: 'DMS / CRM integrations', description: 'Reliable connectors that keep customer and vehicle data consistent.' },
      { title: 'AI assistants for service & sales', description: 'FAQ bots, appointment helpers, and lead prioritization support.' },
      { title: 'Notification & workflow engines', description: 'Status updates and internal tasks that keep jobs moving.' },
      { title: 'Reporting for dealers', description: 'Operational dashboards for sales funnels and service capacity.' },
    ],
    relatedSlugs: ['insurance', 'logistics', 'retail-ecommerce', 'banking-finance'],
    faqs: [
      {
        question: 'Do you build dealer websites and internal sales tools?',
        answer:
          'Yes. We build customer-facing dealer experiences and internal tools for inventory, leads, and sales workflows.',
      },
      {
        question: 'Can you integrate with DMS and CRM systems?',
        answer:
          'Yes. We plan DMS, CRM, parts, and payment integrations early so the product fits the dealership stack instead of fighting it.',
      },
      {
        question: 'Can one platform cover sales and service?',
        answer:
          'Often yes. Many projects start with leads or bookings and expand into shared customer and vehicle history across departments.',
      },
      {
        question: 'Where does AI help automotive teams?',
        answer:
          'Practical uses include lead prioritization, service appointment assistants, FAQ bots, and summarizing customer history for advisors.',
      },
    ],
    ctaTitle: 'Modernize dealer and service experiences',
    ctaDescription:
      'Tell us about your sales, service, or ownership product goals. We will help you connect the customer journey end to end.',
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
      'Policy, claims, and broker platforms built for accuracy, compliance, and customer clarity across the insurance lifecycle.',
    overviewTitle: 'Systems that make insurance operations easier to run',
    overviewHighlight: 'insurance operations easier to run',
    overviewDescription:
      'Insurance work is document-heavy and audit-sensitive. We design policy, claims, and partner platforms around clear lifecycle steps, customer visibility, and controls that stand up when processes are reviewed.',
    focusAreas: [
      { title: 'Policy platforms', description: 'Quotes, issuance, endorsements, and renewals.' },
      { title: 'Claims workflows', description: 'Intake, status tracking, and adjuster tools.' },
      { title: 'Broker & partner portals', description: 'Distribution tools for agents and partners.' },
      { title: 'Customer self-service', description: 'Policy views, claims status, and document access.' },
    ],
    solutions: [
      {
        title: 'Policy lifecycle platforms',
        description: 'Quotes, issuance, endorsements, and renewals with clear status for staff and customers.',
        examples: ['Quoting', 'Issuance', 'Renewals'],
      },
      {
        title: 'Claims workflows',
        description: 'Intake, tracking, and adjuster tools that reduce status confusion and rework.',
        examples: ['Claims intake', 'Adjuster tools', 'Status tracking'],
      },
      {
        title: 'Broker & partner portals',
        description: 'Distribution tools that help agents and partners quote, submit, and follow cases cleanly.',
        examples: ['Partner portals', 'Commission views', 'Submission tools'],
      },
      {
        title: 'Customer self-service',
        description: 'Policy views, claims status, and document access that cut down on support volume.',
        examples: ['Policy portal', 'Claims status', 'Document download'],
      },
    ],
    benefits: [
      { title: 'Faster quoting and servicing', description: 'Staff spend less time re-entering data across disconnected tools.' },
      { title: 'Clearer claims visibility', description: 'Customers and teams see status without endless email threads.' },
      { title: 'Stronger audit trails', description: 'Actions and documents are easier to reconstruct when needed.' },
      { title: 'Less partner rework', description: 'Brokers and partners get portals that reduce incomplete submissions.' },
      { title: 'Customer clarity', description: 'Self-serve access for policies and claims lowers support load.' },
      { title: 'Controlled product evolution', description: 'Modular delivery that can expand from one line or channel to more.' },
    ],
    technologies: [
      { title: 'Policy & claims applications', description: 'Workflow-centric systems for underwriting, servicing, and claims teams.' },
      { title: 'Document & evidence handling', description: 'Secure uploads, storage, and retrieval for policy and claims files.' },
      { title: 'Partner portal platforms', description: 'Role-aware experiences for brokers, agents, and other distributors.' },
      { title: 'AI for intake & summarization', description: 'Assistants that help classify intake, summarize files, and answer FAQs with oversight.' },
      { title: 'Integrations & data exchange', description: 'Connect core systems, payments, and identity providers carefully.' },
      { title: 'Audit & access controls', description: 'Permissions and logging designed for regulated insurance operations.' },
    ],
    relatedSlugs: ['healthcare', 'banking-finance', 'automotive', 'legal-tech'],
    faqs: [
      {
        question: 'Do you build custom policy and claims platforms?',
        answer:
          'Yes. We build and extend policy, claims, and partner systems shaped around your lines of business and operating model.',
      },
      {
        question: 'Can brokers and partners get their own portals?',
        answer:
          'Yes. Partner portals for quoting, submissions, and case follow-up are a common part of insurance delivery for us.',
      },
      {
        question: 'How do you handle auditability?',
        answer:
          'We design workflows with clear status, permissions, and logging so teams can reconstruct what happened when reviews or audits require it.',
      },
      {
        question: 'Where can AI help insurance operations?',
        answer:
          'Useful applications include intake classification, document summarization, customer FAQ bots, and assistant tools for adjusters, always with human review where decisions matter.',
      },
    ],
    ctaTitle: 'Build insurance systems customers can trust',
    ctaDescription:
      'Share your policy, claims, or partner portal needs. We will help you define a secure, operable product roadmap.',
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
      'Secure fintech and banking products for onboarding, account experiences, payments, and internal operations tools that need trust as much as speed.',
    overviewTitle: 'Financial products built for trust and usability',
    overviewHighlight: 'trust and usability',
    overviewDescription:
      'Financial software has to feel simple to customers and controlled to operators. We build banking and fintech products with security, clear UX, and operational workflows that hold up in regulated environments.',
    focusAreas: [
      { title: 'Customer platforms', description: 'Onboarding, dashboards, and account experiences.' },
      { title: 'Payments & transfers', description: 'Reliable money-movement flows and reconciliations.' },
      { title: 'Ops & risk tools', description: 'Internal workflows for review, compliance, and support.' },
      { title: 'Integrations', description: 'Core banking, KYC, and payment provider connections.' },
    ],
    solutions: [
      {
        title: 'Customer banking platforms',
        description: 'Onboarding, dashboards, and account experiences that make money management feel clear and trustworthy.',
        examples: ['Digital onboarding', 'Account dashboards', 'Statements'],
      },
      {
        title: 'Payments & money movement',
        description: 'Transfer and payment flows with reconciliation support for ops teams.',
        examples: ['Transfers', 'Payment rails', 'Reconciliation'],
      },
      {
        title: 'Ops & risk tooling',
        description: 'Internal workflows for reviews, compliance checks, and support that need strong controls.',
        examples: ['Case review', 'Support tools', 'Risk queues'],
      },
      {
        title: 'Banking integrations',
        description: 'Core banking, KYC, and payment provider connections planned into the architecture.',
        examples: ['KYC providers', 'Core banking APIs', 'Payment processors'],
      },
    ],
    benefits: [
      { title: 'Clearer digital journeys', description: 'Customers complete onboarding and everyday tasks with less confusion.' },
      { title: 'Stronger security posture', description: 'Access control and sensitive-flow design are part of the build.' },
      { title: 'Less ops friction', description: 'Support and review teams get tools that match real case handling.' },
      { title: 'Reliable integrations', description: 'Fewer manual finance ops caused by disconnected systems.' },
      { title: 'Audit-friendly processes', description: 'Actions and decisions are easier to reconstruct when needed.' },
      { title: 'Product velocity with control', description: 'Ship new features without ignoring regulated realities.' },
    ],
    technologies: [
      { title: 'Secure customer applications', description: 'Modern web and mobile experiences with hardened auth and session handling.' },
      { title: 'Payments infrastructure', description: 'Money-movement flows and provider integrations with careful failure handling.' },
      { title: 'KYC & identity integrations', description: 'Connect verification providers into clean onboarding journeys.' },
      { title: 'AI for support & ops', description: 'Assistants for FAQs, case summarization, and triage with human oversight.' },
      { title: 'Risk & review workflows', description: 'Internal queues and decision tooling for compliance and operations teams.' },
      { title: 'Monitoring & controls', description: 'Logging, alerts, and environments suited to financial product delivery.' },
    ],
    relatedSlugs: ['insurance', 'healthcare', 'real-estate', 'logistics'],
    faqs: [
      {
        question: 'Do you build fintech products and internal banking tools?',
        answer:
          'Yes. We build customer-facing financial products and the internal ops tools that keep those products running safely.',
      },
      {
        question: 'Can you integrate with KYC and payment providers?',
        answer:
          'Yes. Provider selection and integration planning are part of discovery so onboarding and money movement stay reliable.',
      },
      {
        question: 'How do you approach security for finance software?',
        answer:
          'We design around least privilege, careful auth, auditability, and secure handling of sensitive data from the first release.',
      },
      {
        question: 'Where does AI fit in banking and finance projects?',
        answer:
          'Common uses include support assistants, case summarization for ops teams, and workflow helpers that speed routine reviews without removing human control.',
      },
    ],
    ctaTitle: 'Build financial products people can trust',
    ctaDescription:
      'Tell us about your fintech or banking roadmap. We will help you scope a secure product your customers and operators can rely on.',
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
      'Project management, portfolio, and collaboration platforms for architecture studios and design firms that need clarity with clients and cleaner delivery inside the team.',
    overviewTitle: 'Tools that fit creative and project delivery work',
    overviewHighlight: 'creative and project delivery work',
    overviewDescription:
      'Design and architecture practices lose time in email threads, scattered files, and unclear project status. We build project delivery, client portal, and portfolio products that respect creative work while keeping milestones, approvals, and assets organized.',
    focusAreas: [
      { title: 'Project delivery', description: 'Milestones, tasks, and team collaboration.' },
      { title: 'Client portals', description: 'Reviews, approvals, and shared project spaces.' },
      { title: 'Portfolio sites', description: 'Brand-forward showcases for studios and practices.' },
      { title: 'File & asset workflows', description: 'Organized document and design asset handling.' },
    ],
    solutions: [
      {
        title: 'Project delivery platforms',
        description: 'Milestones, tasks, and collaboration tools that keep studio teams aligned across phases.',
        examples: ['Project milestones', 'Task boards', 'Team collaboration'],
      },
      {
        title: 'Client review portals',
        description: 'Shared spaces for reviews, approvals, and feedback without endless email chains.',
        examples: ['Client portals', 'Approvals', 'Feedback threads'],
      },
      {
        title: 'Portfolio & brand sites',
        description: 'Brand-forward showcases that present the practice well and still stay maintainable.',
        examples: ['Studio sites', 'Case galleries', 'CMS-managed portfolios'],
      },
      {
        title: 'File & asset workflows',
        description: 'Organized document and design asset handling so teams stop hunting across drives.',
        examples: ['Asset libraries', 'Versioned files', 'Shared folders'],
      },
    ],
    benefits: [
      { title: 'Clearer project status', description: 'Teams and clients see where work stands without chasing updates.' },
      { title: 'Faster review cycles', description: 'Approvals happen in one place with context attached.' },
      { title: 'Stronger digital presence', description: 'Portfolio experiences that match the quality of the work.' },
      { title: 'Less file chaos', description: 'Assets and documents stay findable across projects.' },
      { title: 'Better client trust', description: 'Transparent sharing reduces confusion and rework.' },
      { title: 'Studio-fit tooling', description: 'Workflows shaped for creative delivery, not generic project software.' },
    ],
    technologies: [
      { title: 'Project collaboration apps', description: 'Web platforms for milestones, tasks, and studio communication.' },
      { title: 'Client portal experiences', description: 'Secure sharing and approval flows for external stakeholders.' },
      { title: 'Portfolio & CMS builds', description: 'Brand sites that marketing and studio leads can update confidently.' },
      { title: 'Asset management patterns', description: 'Structured storage and retrieval for drawings, docs, and design files.' },
      { title: 'AI for summaries & search', description: 'Helpers that surface project notes, FAQs, or portfolio content faster.' },
      { title: 'Integrations', description: 'Connect calendars, storage, or billing tools where they already exist.' },
    ],
    relatedSlugs: ['construction', 'real-estate', 'media-entertainment', 'education'],
    faqs: [
      {
        question: 'Do you build studio project tools or just portfolio websites?',
        answer:
          'Both. We build portfolio sites, client portals, and internal project delivery tools depending on what the practice needs most.',
      },
      {
        question: 'Can clients review and approve work in the product?',
        answer:
          'Yes. Client portals for reviews, comments, and approvals are a common part of design and architecture delivery.',
      },
      {
        question: 'Will the tools fit how studios actually work?',
        answer:
          'We design around phases, milestones, and asset-heavy collaboration rather than forcing a generic software workflow onto creative teams.',
      },
      {
        question: 'Where can AI help architecture and design firms?',
        answer:
          'Useful applications include project note summarization, searchable asset helpers, and FAQ assistants for common client questions.',
      },
    ],
    ctaTitle: 'Build tools that fit your practice',
    ctaDescription:
      'Tell us about your studio workflows, client reviews, or portfolio needs. We will help you ship software that stays usable.',
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
      'Fleet, warehouse, and shipment platforms that improve visibility, coordination, and on-time delivery when volume and exceptions rise.',
    overviewTitle: 'Operational software for moving goods reliably',
    overviewHighlight: 'moving goods reliably',
    overviewDescription:
      'Logistics fails quietly when tracking, dispatch, and customer updates drift apart. We build shipment, fleet, and warehouse systems that keep ETAs honest, exceptions visible, and customers informed without constant manual chasing.',
    focusAreas: [
      { title: 'Shipment visibility', description: 'Tracking, ETAs, and exception handling.' },
      { title: 'Fleet & dispatch', description: 'Routing, assignment, and driver tools.' },
      { title: 'Warehouse ops', description: 'Inbound, inventory, and outbound workflows.' },
      { title: 'Customer updates', description: 'Status notifications and self-serve tracking.' },
    ],
    solutions: [
      {
        title: 'Shipment visibility platforms',
        description: 'Tracking, ETAs, and exception handling that give ops and customers a shared source of truth.',
        examples: ['Live tracking', 'ETA updates', 'Exception alerts'],
      },
      {
        title: 'Fleet & dispatch tools',
        description: 'Routing, assignment, and driver experiences that keep vehicles and jobs coordinated.',
        examples: ['Dispatch boards', 'Driver apps', 'Route planning'],
      },
      {
        title: 'Warehouse operations',
        description: 'Inbound, inventory, and outbound workflows that reduce lost handoffs on the floor.',
        examples: ['Inbound receiving', 'Inventory', 'Outbound packing'],
      },
      {
        title: 'Customer communication',
        description: 'Status notifications and self-serve tracking that cut “where is my shipment” volume.',
        examples: ['Tracking pages', 'SMS / email updates', 'Delay notices'],
      },
    ],
    benefits: [
      { title: 'Better real-time visibility', description: 'Ops teams see what is moving, delayed, or at risk sooner.' },
      { title: 'Fewer missed handoffs', description: 'Dispatch, warehouse, and customer updates stay connected.' },
      { title: 'Clearer customer communication', description: 'Automated updates reduce reactive support load.' },
      { title: 'Scale with order volume', description: 'Tools that still work when peak season hits.' },
      { title: 'Exception-first operations', description: 'Problems surface early instead of disappearing into spreadsheets.' },
      { title: 'Integration-ready architecture', description: 'Connect carriers, WMS, and commerce systems as you grow.' },
    ],
    technologies: [
      { title: 'Tracking & event platforms', description: 'Event-driven shipment status with reliable update pipelines.' },
      { title: 'Dispatch & mobile driver apps', description: 'Assignment and field tools that work under real network conditions.' },
      { title: 'Warehouse workflow software', description: 'Inbound-to-outbound flows with clear operator UX.' },
      { title: 'AI for ETA & exception insights', description: 'Helpers that flag risk patterns and support planning decisions.' },
      { title: 'Notification engines', description: 'Customer and internal alerts based on shipment state changes.' },
      { title: 'Carrier & commerce integrations', description: 'APIs that keep orders, labels, and status in sync.' },
    ],
    relatedSlugs: ['retail-ecommerce', 'automotive', 'travel-hospitality', 'banking-finance'],
    faqs: [
      {
        question: 'Do you build shipment tracking and dispatch systems?',
        answer:
          'Yes. We build visibility, dispatch, warehouse, and customer-update products for logistics and supply-chain teams.',
      },
      {
        question: 'Can you integrate with carriers and ecommerce platforms?',
        answer:
          'Yes. Carrier, WMS, and commerce integrations are planned into delivery so status and order data stay aligned.',
      },
      {
        question: 'How do you handle high-volume peaks?',
        answer:
          'We design for volume early: clear exception handling, scalable event processing, and operator UX that does not collapse under load.',
      },
      {
        question: 'Where does AI help logistics operations?',
        answer:
          'Useful applications include exception risk signals, ETA insights, support bots for shipment FAQs, and planning assistance for ops teams.',
      },
    ],
    ctaTitle: 'Build logistics software that stays accurate under pressure',
    ctaDescription:
      'Tell us about your fleet, warehouse, or shipment visibility needs. We will help you scope an operable system.',
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
      'Fan engagement apps, club platforms, and operations tools for leagues, teams, and sports brands that need to perform on game day and every day after.',
    overviewTitle: 'Digital products for fans, clubs, and sports ops',
    overviewHighlight: 'fans, clubs, and sports ops',
    overviewDescription:
      'Sports organizations need products that excite fans and still run cleanly for club staff. We build engagement, ticketing, and operations experiences that connect audiences, athletes, and operators through clear digital workflows.',
    focusAreas: [
      { title: 'Fan engagement', description: 'Apps, content, tickets, and membership experiences.' },
      { title: 'Club platforms', description: 'Team ops, scheduling, and community tools.' },
      { title: 'Event & ticketing', description: 'Registration, access, and event workflows.' },
      { title: 'Performance & media', description: 'Stats, highlight, and content distribution features.' },
    ],
    solutions: [
      {
        title: 'Fan engagement products',
        description: 'Apps, content, tickets, and membership experiences that keep supporters close to the club or brand.',
        examples: ['Fan apps', 'Memberships', 'Content feeds'],
      },
      {
        title: 'Club & team platforms',
        description: 'Ops, scheduling, and community tools that help staff run the organization day to day.',
        examples: ['Team schedules', 'Club portals', 'Staff tools'],
      },
      {
        title: 'Event & ticketing flows',
        description: 'Registration, access, and event workflows designed for peak traffic moments.',
        examples: ['Ticketing', 'Event registration', 'Access control'],
      },
      {
        title: 'Performance & media features',
        description: 'Stats, highlights, and content distribution that support storytelling and analysis.',
        examples: ['Stats views', 'Highlight publishing', 'Media libraries'],
      },
    ],
    benefits: [
      { title: 'Stronger fan engagement', description: 'Members and supporters get experiences worth returning to between matches.' },
      { title: 'Clearer club operations', description: 'Staff run schedules, events, and community workflows with less friction.' },
      { title: 'Better ticketing journeys', description: 'Registration and access flows that hold up on busy event days.' },
      { title: 'Peak-traffic readiness', description: 'Architecture planned for surges around fixtures and launches.' },
      { title: 'Connected media moments', description: 'Content and stats features that support storytelling and fan interest.' },
      { title: 'Brand-consistent digital presence', description: 'Products that feel like the club, not a generic template.' },
    ],
    technologies: [
      { title: 'Fan apps & membership platforms', description: 'Mobile and web experiences for content, access, and loyalty.' },
      { title: 'Ticketing & event systems', description: 'High-demand registration and access flows with reliable checkout.' },
      { title: 'Media & content tooling', description: 'Publishing and distribution for highlights, news, and club stories.' },
      { title: 'AI for engagement & support', description: 'Personalized content hints, FAQ bots, and ops assistants where useful.' },
      { title: 'Analytics for clubs', description: 'Engagement, membership, and event performance visibility.' },
      { title: 'Integrations', description: 'Connect CRM, payments, access control, or broadcast tools as needed.' },
    ],
    relatedSlugs: ['media-entertainment', 'fitness', 'travel-hospitality', 'education'],
    faqs: [
      {
        question: 'Do you build fan apps and club operations tools?',
        answer:
          'Yes. We build fan engagement products, membership experiences, and internal club tools depending on the priority.',
      },
      {
        question: 'Can ticketing handle busy event windows?',
        answer:
          'We design ticketing and registration flows with peak demand in mind, including clear status handling and infrastructure choices that support surges.',
      },
      {
        question: 'Can one product serve fans and staff?',
        answer:
          'Often yes. Many sports platforms combine audience-facing experiences with staff workflows for schedules, events, and community management.',
      },
      {
        question: 'Where does AI help sports products?',
        answer:
          'Useful applications include personalized content recommendations, fan support bots, and assistants that help staff with FAQs or operational summaries.',
      },
    ],
    ctaTitle: 'Build sports products ready for game day',
    ctaDescription:
      'Tell us about your fan, club, or event technology goals. We will help you ship experiences that engage and operate cleanly.',
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
      'Booking flows, operator tools, and traveler experience apps that keep travel businesses fast, personalized, and easy to run during peak demand.',
    overviewTitle: 'Digital experiences that match traveler expectations',
    overviewHighlight: 'traveler expectations',
    overviewDescription:
      'In travel, timing and personalization decide who wins the booking. We build operator lead sharing, guest engagement, and booking products that prioritize speed, relevant updates, and integrations operators can actually run through high season.',
    focusAreas: [
      { title: 'Booking & marketplace flows', description: 'Search, availability, payments, and confirmation journeys that convert.' },
      { title: 'Operator & partner tools', description: 'Lead distribution, inventory updates, and partner portals.' },
      { title: 'Guest engagement', description: 'Notifications, itineraries, and support experiences across channels.' },
      { title: 'Automation & AI', description: 'Personalized updates, chatbots, and ops automations for high season.' },
    ],
    solutions: [
      {
        title: 'Booking & marketplace flows',
        description: 'Search, availability, payments, and confirmation journeys built to convert under pressure.',
        examples: ['Search & availability', 'Checkout', 'Confirmations'],
      },
      {
        title: 'Operator & partner tools',
        description: 'Lead distribution, inventory updates, and partner portals that keep operators ahead of demand.',
        examples: ['Lead sharing', 'Partner portals', 'Inventory updates'],
      },
      {
        title: 'Guest engagement products',
        description: 'Notifications, itineraries, and support experiences across email and messaging channels.',
        examples: ['Itineraries', 'Push / email updates', 'Guest support'],
      },
      {
        title: 'Travel automation & AI',
        description: 'Personalized updates, chatbots, and ops automations that reduce missed opportunities in peak season.',
        examples: ['Personalized alerts', 'Chatbots', 'Workflow automation'],
      },
    ],
    benefits: [
      { title: 'Faster lead communication', description: 'Operators and guests get the right update while the opportunity is still live.' },
      { title: 'Fewer missed peak-season chances', description: 'Automation reduces lag when volume spikes.' },
      { title: 'Smoother guest updates', description: 'Itineraries and status messages stay consistent across channels.' },
      { title: 'Operator-ready admin tools', description: 'Back-office workflows staff can run without constant developer help.' },
      { title: 'Personalization that feels useful', description: 'Messages and offers based on real trip or inventory context.' },
      { title: 'Integration-friendly architecture', description: 'Connect booking, CRM, and messaging systems cleanly.' },
    ],
    technologies: [
      { title: 'Booking platforms', description: 'Availability, payments, and confirmation flows for travel products.' },
      { title: 'Operator portals', description: 'Tools for lead distribution, inventory, and partner coordination.' },
      { title: 'Messaging & notification systems', description: 'Email, SMS, and in-app updates tied to trip events.' },
      { title: 'AI personalization & automation', description: 'n8n-style workflows, content personalization, and guest support bots.' },
      { title: 'Search & catalog experiences', description: 'Traveler-facing discovery that stays fast with growing inventory.' },
      { title: 'Analytics for travel ops', description: 'Visibility into response times, bookings, and guest engagement.' },
    ],
    caseStudySlugs: ['ai-enhanced-lead-management'],
    relatedSlugs: ['logistics', 'retail-ecommerce', 'sports', 'media-entertainment'],
    faqs: [
      {
        question: 'Do you build booking platforms and operator tools for travel brands?',
        answer:
          'Yes. We build traveler-facing booking experiences and the operator or partner tools that keep inventory, leads, and updates moving.',
      },
      {
        question: 'Can you automate personalized lead or trip notifications?',
        answer:
          'Yes. We have delivered AI-assisted automation for travel lead sharing and personalized notifications, and we design similar flows for itineraries and guest updates.',
      },
      {
        question: 'How do you handle high-season demand?',
        answer:
          'We prioritize reliable workflows, clear failure handling, and operator UX that still works when volume spikes.',
      },
      {
        question: 'Where does AI help travel and tourism products?',
        answer:
          'Common uses include personalized alerts, guest support chatbots, content generation for updates, and automation that removes manual lead or status chasing.',
      },
    ],
    ctaTitle: 'Build travel tech that moves as fast as demand',
    ctaDescription:
      'Share your booking, operator, or guest experience goals. We will help you design a product ready for peak season.',
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
      'Fashion brands need storytelling and operational discipline at the same time. We build apparel commerce and brand experiences that look sharp while handling variants, inventory, checkout, and post-purchase reality cleanly.',
    focusAreas: [
      { title: 'Brand storefronts', description: 'Campaign-ready sites and collection experiences.' },
      { title: 'Fashion commerce', description: 'Variants, sizing, drops, and checkout flows.' },
      { title: 'Retail ops', description: 'Inventory, orders, and omnichannel tools.' },
      { title: 'Personalization', description: 'Recommendations, styling, and retention journeys.' },
    ],
    solutions: [
      {
        title: 'Brand storefronts & campaigns',
        description: 'Collection and lookbook experiences that launch campaigns without breaking commerce fundamentals.',
        examples: ['Collection pages', 'Campaign sites', 'Lookbooks'],
      },
      {
        title: 'Fashion commerce systems',
        description: 'Variants, sizing, drops, and checkout flows designed for apparel complexity.',
        examples: ['Size variants', 'Product drops', 'Checkout'],
      },
      {
        title: 'Retail & inventory ops',
        description: 'Order, stock, and omnichannel tools that keep fulfillment aligned with what the site promises.',
        examples: ['Inventory sync', 'Order ops', 'Returns'],
      },
      {
        title: 'Personalization & retention',
        description: 'Recommendations, styling helpers, and journeys that bring shoppers back after the first purchase.',
        examples: ['Recommendations', 'Styling tools', 'Retention flows'],
      },
    ],
    benefits: [
      { title: 'Stronger collection launches', description: 'Campaign experiences that still convert and fulfill cleanly.' },
      { title: 'Higher-converting discovery', description: 'Product journeys tuned for browsing, sizing, and checkout.' },
      { title: 'Fewer fulfillment mismatches', description: 'Inventory and order state stay closer to the storefront promise.' },
      { title: 'Brand-first digital presence', description: 'Commerce that looks like the brand without ignoring ops.' },
      { title: 'Personalization that sells', description: 'Recommendations and journeys grounded in real catalog data.' },
      { title: 'Ready for drops and peaks', description: 'Architecture and UX prepared for launch traffic.' },
    ],
    technologies: [
      { title: 'Fashion storefronts', description: 'High-visual commerce fronts with strong product detail experiences.' },
      { title: 'Variant & inventory systems', description: 'Size, color, and stock handling that stays accurate.' },
      { title: 'Checkout & payments', description: 'Reliable purchase flows for domestic and cross-border needs.' },
      { title: 'AI styling & recommendations', description: 'Assistants and recommendation engines grounded in your catalog.' },
      { title: 'OMS integrations', description: 'Connect fulfillment and returns systems behind the brand experience.' },
      { title: 'Campaign & content tooling', description: 'CMS and merchandising tools marketing teams can operate.' },
    ],
    relatedSlugs: ['retail-ecommerce', 'media-entertainment', 'fitness', 'travel-hospitality'],
    faqs: [
      {
        question: 'Do you build fashion brand sites and full commerce platforms?',
        answer:
          'Yes. We build brand-led storefronts and the commerce systems behind them, including variants, checkout, and operations tooling.',
      },
      {
        question: 'Can you handle drops and high-traffic launches?',
        answer:
          'We plan for launch peaks in architecture and UX so campaign moments do not become outages or inventory chaos.',
      },
      {
        question: 'How do you balance brand visuals with operational accuracy?',
        answer:
          'We treat storytelling and inventory truth as one product. A beautiful page that sells unavailable sizes is not done.',
      },
      {
        question: 'Where does AI help apparel and fashion brands?',
        answer:
          'Common uses include product recommendations, styling assistants, support chatbots, and merchandising insights.',
      },
    ],
    ctaTitle: 'Build fashion commerce that looks and operates well',
    ctaDescription:
      'Tell us about your brand, drops, and retail channels. We will help you ship an experience shoppers love and ops can run.',
    outcomes: [
      'Stronger collection and campaign launches',
      'Higher-converting product discovery and checkout',
      'Fewer inventory and fulfillment mismatches',
      'Brand experiences that still operate cleanly behind the scenes',
    ],
  }),

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
      'Legal teams lose hours hunting clauses, chasing approvals, and reconstructing contract status from email. We design legal platforms with document-heavy workflows, permissions, and search at the core so attorneys find what they need without fighting the UI.',
    focusAreas: [
      { title: 'Contract & clause systems', description: 'Structured libraries, search, and collaboration around legal language.' },
      { title: 'Matter & practice tools', description: 'Case/matter tracking, client portals, and operational dashboards.' },
      { title: 'Document intelligence', description: 'AI-assisted review, extraction, and summarization with human oversight.' },
      { title: 'Security & access control', description: 'Role-based access, audit logs, and careful handling of sensitive files.' },
    ],
    solutions: [
      {
        title: 'Clause & contract libraries',
        description: 'Searchable repositories of approved language with collaboration around drafting and reuse.',
        examples: ['Clause libraries', 'Contract search', 'Version control'],
      },
      {
        title: 'Matter & practice tools',
        description: 'Matter tracking, client portals, and operational dashboards for legal teams.',
        examples: ['Matter tracking', 'Client portals', 'Legal ops dashboards'],
      },
      {
        title: 'Document intelligence',
        description: 'AI-assisted review, extraction, and summarization with lawyers staying in control of decisions.',
        examples: ['Clause search AI', 'Summaries', 'Extraction helpers'],
      },
      {
        title: 'Secure legal collaboration',
        description: 'Role-based access, audit logs, and careful handling of confidential client files.',
        examples: ['RBAC', 'Audit logs', 'Secure sharing'],
      },
    ],
    benefits: [
      { title: 'Faster drafting cycles', description: 'Approved language is reusable instead of rewritten from scratch.' },
      { title: 'Searchable legal knowledge', description: 'Clauses and documents become findable across the organization.' },
      { title: 'Fewer handoff gaps', description: 'Legal and business stakeholders see shared status and approvals.' },
      { title: 'Clear permissions', description: 'Confidential work stays behind role-aware access controls.' },
      { title: 'AI with oversight', description: 'Assistants speed review without removing attorney judgment.' },
      { title: 'Better practice visibility', description: 'Dashboards that show bottlenecks in review and matter progress.' },
    ],
    technologies: [
      { title: 'Legal workspace platforms', description: 'Web apps for clause libraries, matters, and collaboration.' },
      { title: 'Secure document handling', description: 'Storage, permissions, and audit trails for sensitive legal files.' },
      { title: 'AI search & review helpers', description: 'Retrieval and summarization grounded in approved firm content.' },
      { title: 'Workflow & approval engines', description: 'Inbox-style approval flows that keep contracts moving.' },
      { title: 'Client portals', description: 'Controlled sharing for external counsel and business stakeholders.' },
      { title: 'Analytics for legal ops', description: 'Visibility into clause usage, review times, and bottlenecks.' },
    ],
    caseStudySlugs: ['clause-room-legal-platform'],
    relatedSlugs: ['insurance', 'banking-finance', 'healthcare', 'real-estate'],
    faqs: [
      {
        question: 'Do you build clause and contract management platforms?',
        answer:
          'Yes. We build clause libraries, contract workflows, and related legal-ops tools for firms and in-house teams.',
      },
      {
        question: 'How do you keep AI safe for legal work?',
        answer:
          'We ground assistants in approved content, keep humans in the decision path, and design permissions carefully around confidential material.',
      },
      {
        question: 'Can clients and business teams participate in workflows?',
        answer:
          'Yes. Portals and approval flows can include external or business stakeholders with the right access controls.',
      },
      {
        question: 'What does a typical legal-tech engagement look like?',
        answer:
          'We start with workflow discovery, then deliver searchable libraries, matter or contract tracking, and AI-assisted features where they create clear value.',
      },
    ],
    ctaTitle: 'Build legal tech lawyers will actually use',
    ctaDescription:
      'Tell us about your clause, contract, or practice-management goals. We will help you design a secure, usable platform.',
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
      'Modernize field and office operations with resource handling, time reporting, supplier workflows, and cloud apps that replace fragile legacy systems.',
    overviewTitle: 'Reliable software for complex construction operations',
    overviewHighlight: 'construction operations',
    overviewDescription:
      'Construction firms often depend on aging systems that cannot be safely changed. We rebuild and extend construction software with modern stacks, staging environments, and UX that works for office and field teams alike.',
    focusAreas: [
      { title: 'Legacy modernization', description: 'Migrate aging apps to React, .NET, and cloud platforms with less risk.' },
      { title: 'Resource & time tracking', description: 'Tools for crews, suppliers, and project reporting.' },
      { title: 'Invoice & supplier workflows', description: 'Streamlined approvals and document handling for project finance.' },
      { title: 'Mobile-friendly ops', description: 'Interfaces that work on site, not only at a desk.' },
    ],
    solutions: [
      {
        title: 'Legacy modernization',
        description: 'Phased migration from aging apps to React, .NET, and cloud platforms without betting everything on a big-bang cutover.',
        examples: ['React front ends', '.NET APIs', 'Azure hosting'],
      },
      {
        title: 'Resource & time tracking',
        description: 'Tools for crews, suppliers, and project reporting that replace fragile spreadsheets and outdated screens.',
        examples: ['Time reporting', 'Crew resources', 'Project reports'],
      },
      {
        title: 'Invoice & supplier workflows',
        description: 'Approvals and document handling that keep project finance moving with fewer manual steps.',
        examples: ['Supplier invoices', 'Approvals', 'Document packs'],
      },
      {
        title: 'Field-ready interfaces',
        description: 'Mobile-friendly experiences that work on site, not only at a desk.',
        examples: ['Field UX', 'Responsive apps', 'Offline-tolerant flows'],
      },
    ],
    benefits: [
      { title: 'Safer change management', description: 'Staging and testing environments reduce the risk of live-only legacy systems.' },
      { title: 'Clearer project visibility', description: 'Resources, time, and status become easier to report and act on.' },
      { title: 'Less invoice friction', description: 'Supplier and finance workflows stop living in email and paper packs.' },
      { title: 'Better field usability', description: 'Interfaces designed for how crews actually work.' },
      { title: 'Modern security posture', description: 'Authentication, roles, and cloud controls replace outdated assumptions.' },
      { title: 'A path off brittle tech', description: 'Incremental modernization that preserves business continuity.' },
    ],
    technologies: [
      { title: 'React & .NET modernization', description: 'Modern UI and API layers that replace Classic ASP and similar stacks.' },
      { title: 'Azure cloud delivery', description: 'Hosting, identity, and monitoring suited to business-critical ops systems.' },
      { title: 'Database migration', description: 'Careful moves to modern SQL platforms while preserving business data.' },
      { title: 'Field-friendly web apps', description: 'Responsive interfaces usable on tablets and phones on site.' },
      { title: 'Workflow & document tooling', description: 'Approvals, uploads, and reporting for project finance and ops.' },
      { title: 'AI for reporting helpers', description: 'Summaries and search over operational records where they reduce admin load.' },
    ],
    caseStudySlugs: ['modernizing-legacy-software'],
    relatedSlugs: ['real-estate', 'design-architecture', 'logistics', 'insurance'],
    faqs: [
      {
        question: 'Can you modernize a live legacy construction system?',
        answer:
          'Yes. We favor phased modernization with staging environments so the business can keep operating while the stack improves.',
      },
      {
        question: 'Do you rebuild both the UI and backend?',
        answer:
          'Often yes. Many construction projects combine a React front end with modern .NET APIs and cloud hosting, plus database migration where needed.',
      },
      {
        question: 'Will field teams be able to use the new system?',
        answer:
          'We design for field reality: clearer mobile-friendly flows, less clutter, and workflows that match how crews and supervisors actually work.',
      },
      {
        question: 'Where does AI help construction software?',
        answer:
          'Useful applications include reporting summaries, document search, and assistants that reduce admin load around status and supplier questions.',
      },
    ],
    ctaTitle: 'Modernize construction systems without the big-bang risk',
    ctaDescription:
      'Tell us about your legacy stack and field workflows. We will help you plan a safer path to a modern platform.',
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
      'Marketing technology products and integrations for automation, analytics, and campaign tooling that help growth teams move faster without losing brand control.',
    overviewTitle: 'Build marketing systems that scale with your pipeline',
    overviewHighlight: 'scale with your pipeline',
    overviewDescription:
      'Growth teams stall when content, publishing, and integrations live in disconnected tools. We help MarTech teams ship reliable platforms for brand voice, automation, customer journeys, and AI-assisted content that still respect collaboration and brand guidelines.',
    focusAreas: [
      { title: 'Marketing platforms', description: 'Custom tools for campaigns, attribution, and audience management.' },
      { title: 'Automation & orchestration', description: 'Connect CRM, ads, email, and analytics into dependable flows.' },
      { title: 'Personalization & AI', description: 'Content generation, recommendations, and smarter segmentation.' },
      { title: 'Integrations', description: 'Reliable connectors across the modern marketing stack.' },
    ],
    solutions: [
      {
        title: 'Marketing platforms',
        description: 'Custom tools for campaigns, brand voice, attribution, and audience management in one workspace.',
        examples: ['Campaign tools', 'Brand voice', 'Audience management'],
      },
      {
        title: 'Automation & orchestration',
        description: 'Connect CRM, ads, email, CMS, and analytics into dependable publishing and nurture flows.',
        examples: ['Workflow automation', 'CRM sync', 'Multi-channel publishing'],
      },
      {
        title: 'Personalization & AI content',
        description: 'Generation, recommendations, and segmentation that stay aligned to brand guidelines.',
        examples: ['AI writing', 'Personalization', 'Knowledge ingestion'],
      },
      {
        title: 'MarTech integrations',
        description: 'Reliable connectors across social, CMS, email, and analytics platforms growth teams already use.',
        examples: ['Social OAuth', 'CMS publishing', 'Analytics events'],
      },
    ],
    benefits: [
      { title: 'Less manual campaign ops', description: 'Publishing and handoffs stop living across too many tools.' },
      { title: 'Cleaner customer data', description: 'Events and audience signals stay more consistent across channels.' },
      { title: 'Faster experimentation', description: 'Growth teams can ship and learn without waiting on brittle glue code.' },
      { title: 'Brand-controlled AI', description: 'Assistants that learn from approved brand knowledge instead of generic tone.' },
      { title: 'Collaboration-ready workflows', description: 'Review and editing fit how marketing teams actually work.' },
      { title: 'Scalable edge architecture', description: 'Platforms designed to grow with integrations and AI workloads.' },
    ],
    technologies: [
      { title: 'AI content platforms', description: 'Brand-aware generation, collaboration, and publishing workspaces.' },
      { title: 'Automation engines', description: 'Orchestration across CRM, email, social, and CMS systems.' },
      { title: 'Knowledge ingestion', description: 'Document and URL ingestion that grounds AI in your brand materials.' },
      { title: 'Real-time collaboration', description: 'Shared editing and review for marketing teams and agencies.' },
      { title: 'Analytics & attribution hooks', description: 'Event instrumentation that supports growth measurement.' },
      { title: 'Edge & serverless delivery', description: 'Cloudflare and similar platforms when scale and speed matter.' },
    ],
    caseStudySlugs: ['neonify-ai-content-platform'],
    relatedSlugs: ['media-entertainment', 'retail-ecommerce', 'apparel-fashion', 'education'],
    faqs: [
      {
        question: 'Do you build custom MarTech platforms or only integrations?',
        answer:
          'Both. We build full marketing platforms and also connect existing stacks with reliable automation and publishing flows.',
      },
      {
        question: 'Can AI content stay on brand?',
        answer:
          'Yes. We design brand-voice and knowledge systems so generation is grounded in approved materials and team review workflows.',
      },
      {
        question: 'Which channels can you publish to?',
        answer:
          'It depends on the product, but common destinations include CMS platforms and major social channels through OAuth-based integrations.',
      },
      {
        question: 'What does a MarTech engagement usually include?',
        answer:
          'Discovery around workflows and integrations, then delivery of campaign tooling, AI features, connectors, and the collaboration experience growth teams need.',
      },
    ],
    ctaTitle: 'Build MarTech that growth teams can operate',
    ctaDescription:
      'Tell us about your content, automation, or platform goals. We will help you ship systems that scale with the pipeline.',
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
  const base = INDUSTRIES.find((i) => i.slug === slug) ?? null;
  if (!base) return null;

  const specific = INDUSTRY_SPECIFIC_CONTENT[slug] ?? {};
  return {
    ...base,
    ...specific,
    challenges: specific.challenges?.length ? specific.challenges : base.challenges,
    useCases: specific.useCases?.length ? specific.useCases : base.useCases,
    howWeHelp: specific.howWeHelp?.length ? specific.howWeHelp : base.howWeHelp,
  };
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

export function getRelatedIndustries(slugs = []) {
  return slugs.map((slug) => getIndustry(slug)).filter(Boolean);
}
