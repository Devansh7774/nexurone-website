/** Shared case study content — used on home carousel, /case-study, and detail pages */

const R2 = 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev';

export const caseStudies = {
  'neonify-ai-content-platform': {
    title: 'AI-Powered Content Marketing Platform with Cloudflare & Real-Time Collaboration',
    tag: 'MarTech, 2026',
    heroImage: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ChatGPT%20Image%20Jun%2024%2C%202026%2C%2006_59_22%20PM.png',
    heroOnly: true,
    projectInfo: {
      client: 'Neonify (B2B SaaS — AI marketing & content platform)',
      industry: 'Marketing technology / MarTech',
      date: 'June 2026',
      platform: 'https://neonify.ai',
    },
    intro: [
      'In today\'s crowded digital landscape, marketing teams need to create high-quality, on-brand content and publish it across multiple channels — often within minutes, not days. Businesses that rely on generic AI tools struggle with inconsistent brand voice, disconnected workflows, and manual handoffs between writing, review, and publishing. Our client, a growing B2B SaaS platform for marketing teams, was facing exactly this challenge: content creation was slow, brand guidelines were hard to enforce at scale, and publishing to social and CMS platforms required too many steps and too much context-switching.',
      'We partnered with the team to design and build Neonify — an AI-powered, collaboration-first marketing platform deployed on Cloudflare\'s edge. The solution unifies brand voice management, AI content generation, campaign planning, knowledge ingestion, and multi-platform publishing in a single workspace. By combining Cloudflare Workers AI, durable workflows, and real-time collaborative editing, the platform now helps teams go from idea to published post in a fraction of the time. The project eliminated fragmented tooling, improved team collaboration, and created a flexible architecture that adapts as integrations and AI capabilities grow.',
    ],
    background:
      'Neonify serves marketing teams and agencies who need to produce consistent, high-quality content aligned to their brand voice and publish it across social media and CMS platforms. The platform targets organizations that want AI assistance without sacrificing brand control or team collaboration.\n\nBefore the current architecture and product refinements, the application faced several structural limitations: navigation lived behind a fake single-page app where every section shared the URL `/`, making pages impossible to bookmark or share; post-sign-in flows suffered from session race conditions; social OAuth and integrations were scattered across multiple screens; AI-heavy workloads were split across multiple Cloudflare Workers; and application state leaned heavily on Liveblocks as a primary data store rather than a dedicated database.\n\nThe goal was to build a faster, smarter system that could capture brand knowledge, generate personalized on-brand content, enable real-time team editing, and deliver posts directly to connected platforms — all on serverless edge infrastructure that scales with demand.',
    challenges: [
      { title: 'Fragmented User Experience', desc: 'Users navigated through a client-side SPA layered on Next.js where URLs never changed, breaking browser history, shareable links, and per-route middleware protection.' },
      { title: 'Auth & Session Friction', desc: 'Soft client-side redirects after sign-in caused race conditions with Clerk session propagation, leaving users in broken loading states instead of the dashboard.' },
      { title: 'Slow Path to First Post', desc: 'Onboarding required too many steps before users could connect a social account and publish. Without an early integration, the core product promise was unreachable.' },
      { title: 'Inconsistent Brand Voice', desc: 'Generic AI outputs didn\'t reflect each organization\'s tone, style, and expertise. Teams needed a system that learns from their documents, websites, and guidelines.' },
      { title: 'Disconnected Publishing', desc: 'Content lived in one place; Facebook, Instagram, LinkedIn, and WordPress connections lived elsewhere. Users constantly left their current screen to finish the next step.' },
      { title: 'Scalability & Architecture Debt', desc: 'Long-running AI jobs, document processing, and cron tasks were spread across multiple workers with HTTP fallbacks, duplicate R2 buckets, and post-build injection hacks.' },
      { title: 'Knowledge Silos', desc: 'Marketing teams couldn\'t easily ingest URLs, files, images, or videos into a searchable knowledge base to inform AI-generated content.' },
    ],
    solutionIntro:
      'We designed and implemented an AI-powered, edge-deployed marketing platform using modern serverless patterns and a collaboration-first architecture — unifying brand voice, AI generation, real-time editing, knowledge ingestion, and multi-channel publishing in one workspace.',
    solutions: [
      { title: 'Brand Voice & AI Content Generation', desc: 'Automated brand profiling from documents and URLs, AI-enhanced writing aligned to each organization\'s voice, platform-specific previews, and EEAT analysis for SEO-quality output.' },
      { title: 'Real-Time Collaboration', desc: 'Liveblocks-powered Lexical editor with presence, cursors, and live updates. Multi-workspace support per Clerk organization for agencies managing multiple clients.' },
      { title: 'Campaign & Publishing Workflow', desc: 'Unified campaign calendar, Quick Post flow for faster time-to-first-publish, and OAuth-based publishing to WordPress, Facebook, Instagram, and LinkedIn.' },
      { title: 'Knowledge Base', desc: 'Multi-source ingestion from URLs, websites, PDFs, DOCX, images, and video with semantic search powered by Cloudflare AI Search and durable Workflows for long-running jobs.' },
      { title: 'Unified Integrations Hub', desc: 'Consolidated `/social-media`, `/cms`, and `/email` routes into a single `/integrations` destination with platform-specific OAuth and Facebook page sync.' },
      { title: 'Edge Platform & Infrastructure', desc: 'Next.js 15 App Router with real URLs, OpenNext deployment on Cloudflare Workers, Clerk auth and billing, server actions with next-safe-action + Zod, and R2 for asset storage.' },
      { title: 'Auth & Routing Fixes', desc: 'Hard navigation post-sign-in eliminates Clerk session race conditions. SessionReadyGate waits for session, workspace, and plan limits. Canonical routes in `lib/routes.ts` serve as a single source of truth.' },
    ],
  },
  'rx-incident-safety-platform': {
    title: 'Rx Incident: Safety Through Anonymous Learning for Canadian Pharmacies',
    tag: 'Healthcare, 2026',
    heroImage: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/cf925adc-2061-463d-9d36-03997d37de60.png',
    heroOnly: true,
    projectInfo: {
      client: 'Rx Incident (Part of the OneRx Ecosystem)',
      industry: 'Healthcare / Pharmacy safety & compliance',
      date: 'June 2026',
      platform: 'https://rxincident.com',
    },
    intro: [
      'Canadian pharmacies face growing pressure to report incidents accurately, learn from near-misses, and stay aligned with provincial college expectations without exposing staff to blame or compromising patient privacy. Many independent pharmacies still rely on paper logs, fragmented spreadsheets, or tools that were never designed for mandatory anonymity and cross-pharmacy learning. The result is under-reporting, delayed corrective action, and missed opportunities to prevent harm before it happens.',
      'We partnered with the Rx Incident team to build a data-driven safety intelligence platform that helps pharmacies report, analyze, and prevent incidents through anonymous collaboration. Rx Incident is CQI+, CIRQL-, and AIMS-aligned, supporting ACP, CPBC, and OCP expectations with mandatory reporting workflows and AI-powered analytics. Fair pricing and transparent tools make enterprise-grade safety infrastructure accessible to independent pharmacies, while AES-256 encryption and anonymity-by-design give teams confidence to share honestly and improve outcomes together.',
    ],
    background:
      'Rx Incident serves Canadian pharmacies that need a dedicated incident management platform built for regulatory compliance, not generic ticketing software. The product sits within the broader OneRx ecosystem, connecting pharmacy teams to shared safety intelligence while keeping individual submissions anonymous and secure.\n\nBefore the platform launch, many pharmacies struggled with inconsistent reporting formats, no central view of trends across locations, and tools that did not reflect Canadian college standards. Staff hesitated to report incidents when they feared identification, which meant valuable learning data never entered the system. Independent pharmacies in particular needed a solution with clear pricing, no hidden fees, and workflows that match how they actually operate day to day.\n\nThe goal was to deliver a platform where pharmacies can register quickly, report incidents with confidence, access real-time analytics, and participate in anonymous community learning, all while meeting strict security and compliance requirements from day one.',
    challenges: [
      { title: 'Regulatory Alignment', desc: 'The platform had to align with ACP, CPBC, and OCP expectations while supporting CQI+, CIRQL-, and AIMS-aligned incident workflows across provinces.' },
      { title: 'Under-Reporting Culture', desc: 'Without guaranteed anonymity, pharmacy staff often avoided reporting near-misses and errors, limiting the data available for prevention.' },
      { title: 'Fragmented Incident Tracking', desc: 'Paper logs and ad hoc spreadsheets made it difficult to spot patterns, track follow-up actions, or share learnings across teams.' },
      { title: 'Security & Privacy Requirements', desc: 'Sensitive pharmacy incident data demanded enterprise-grade encryption, access controls, and secure handling at every layer.' },
      { title: 'Independent Pharmacy Accessibility', desc: 'Existing enterprise tools were often too expensive or complex for independent pharmacies that needed fair pricing and straightforward onboarding.' },
      { title: 'Actionable Insights Gap', desc: 'Raw incident logs alone do not reduce risk. Teams needed AI-powered analytics to surface trends and guide smarter safety decisions.' },
    ],
    solutionIntro:
      'We designed and built Rx Incident as a compliance-first, anonymity-by-design safety platform tailored for Canadian pharmacies, with transparent pricing and intelligent analytics at the core:',
    solutions: [
      { title: 'Built for Canadian Pharmacies', desc: 'Workflows aligned with ACP, CPBC, and OCP expectations and reporting standards, so pharmacies can register and report with confidence.' },
      { title: 'Anonymous by Design', desc: 'Mandatory anonymity and secure data handling encourage honest reporting and protect staff identity throughout the incident lifecycle.' },
      { title: 'Mandatory Reporting Workflows', desc: 'Structured incident capture ensures required fields, follow-up steps, and documentation are completed consistently across every submission.' },
      { title: 'AI-Powered Safety Analytics', desc: 'Real-time dashboards and intelligent trend analysis help pharmacies identify recurring risks and prioritize corrective actions faster.' },
      { title: 'OneRx Ecosystem Integration', desc: 'Rx Incident connects pharmacies to the broader OneRx ecosystem for shared safety intelligence without sacrificing local privacy controls.' },
      { title: 'Enterprise Security', desc: 'AES-256 encryption, role-based access, and secure cloud infrastructure protect sensitive incident data at rest and in transit.' },
      { title: 'Independent-First Pricing', desc: 'Transparent plans with no fee markup give independent pharmacies access to the same safety tools as larger organizations.' },
    ],
  },
  'clause-room-legal-platform': {
    title: 'Clause Room: Streamlining Clause Management for Legal Teams',
    tag: 'LegalTech, 2026',
    heroImage: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/5d51dfec-9249-40e6-93ca-3dcf0a5182ea.png',
    heroOnly: true,
    projectInfo: {
      client: 'Clause Room (LegalTech SaaS)',
      industry: 'Legal technology / Contract & clause management',
      date: 'June 2026',
      platform: 'https://clauseroom.com',
    },
    intro: [
      'Legal teams spend hours hunting through email threads, shared drives, and outdated document folders to find the right clause for each contract. Without a centralized library, approved language gets duplicated, revised inconsistently, and renegotiated from scratch on every deal. Approvals stall in inboxes, contract status stays invisible to stakeholders, and junior lawyers lack structured paths to learn from proven playbooks.',
      'We partnered with the Clause Room team to build an AI-powered clause management platform that helps legal teams learn, manage, and reuse clauses efficiently in one secure place. The platform combines a centralized clause library, smart learning modules, workflow playbooks, a unified inbox for approvals, and real-time contract tracking. The result is faster clause retrieval, shorter review cycles, full visibility across active contracts, and enterprise-grade security for sensitive legal data.',
    ],
    background:
      'Clause Room serves in-house legal teams and law firms that need a dedicated workspace for clause intelligence, not another generic document storage tool. The product is currently in beta, focused on giving members a single dashboard to learn legal best practices, browse approved clauses, follow playbooks for common agreement types, and manage contracts from request through review.\n\nBefore Clause Room, teams relied on scattered files, manual email chains for approvals, and no shared view of which contracts were pending review. Playbooks for services agreements, statements of work, and similar templates lived in separate folders with no connection to the clause library or inbox. Analytics on clause usage, review bottlenecks, and team learning progress were unavailable.\n\nThe goal was to deliver a platform where legal professionals can onboard quickly, continue structured learning, search and reuse clauses across the organization, run playbook-driven workflows, and track every contract in progress from a unified home dashboard.',
    challenges: [
      { title: 'Scattered Clause Storage', desc: 'Approved clauses lived across drives, emails, and personal folders with no single searchable library for the organization.' },
      { title: 'Slow Review Cycles', desc: 'Approval requests and contract reviews moved through disconnected inboxes, causing delays and missed follow-ups.' },
      { title: 'Limited Knowledge Sharing', desc: 'Junior team members had no structured learning path or access to proven playbooks for common legal workflows.' },
      { title: 'Poor Contract Visibility', desc: 'Stakeholders could not see which contracts were in progress, pending review, or awaiting approval in real time.' },
      { title: 'Inconsistent Clause Reuse', desc: 'Teams recreated language from scratch instead of reusing vetted clauses, increasing risk and review time.' },
      { title: 'Security Requirements', desc: 'Sensitive contract and clause data required enterprise-grade access controls and compliant data handling.' },
    ],
    solutionIntro:
      'We designed and built Clause Room as an AI-powered legal workspace that unifies learning, clause management, approvals, and contract tracking in one secure platform:',
    solutions: [
      { title: 'Centralized Clause Library', desc: 'Store, organize, and search clauses across the organization with fast retrieval and consistent approved language.' },
      { title: 'Smart Learning & Playbooks', desc: 'Structured learning modules and ready-made playbooks for services agreements, statements of work, and common legal workflows.' },
      { title: 'Unified Inbox & Approvals', desc: 'Manage approval requests and messages in one place so workflows keep moving without email overload.' },
      { title: 'Contracts in Progress', desc: 'Track, review, and manage active contracts in real time with clear status labels such as review pending.' },
      { title: 'Clause Room Analytics', desc: 'Dashboard insights into clause usage, team activity, and workflow performance to guide smarter decisions.' },
      { title: 'Role-Based Member Access', desc: 'Secure login, member profiles, and permission controls protect sensitive legal content across teams.' },
      { title: 'AI-Powered Search', desc: 'Intelligent search helps lawyers find the right clause faster from a growing library of approved language.' },
    ],
  },
  'ai-enhanced-lead-management': {
    title: 'AI Enhanced Lead Management with n8n for Personalized & Faster Business Responses',
    tag: 'Automation, 2025',
    heroImage: `${R2}/Blue-Modern-Connect-Faster-with-AI-Instagram-Post.png`,
    secondaryImage: `${R2}/771-scaled.jpg`,
    projectInfo: {
      client: 'WordPressRiver Themes',
      date: '25 February, 2022',
      address: '1401, 21st Street STE R4569, California',
    },
    intro: [
      'In today’s competitive travel and tourism industry, timing and personalization are everything. Businesses need to be the first to know about new opportunities and must deliver updates to their customers in a way that feels relevant and engaging. Our client, a growing SaaS platform for tour and travel operators, was struggling with a manual, outdated system for sharing new operator leads with their customers. The delays in communication often caused missed opportunities and reduced customer trust.',
      'We partnered with the client to design and implement an AI powered, automation first solution using n8n, a low code workflow automation platform. The solution integrates directly with their SaaS system, enabling real time data capture, smart personalization, and instant lead notifications. By combining workflow automation with AI driven email content, the platform now delivers tailored messages to customers within seconds of a new operator going live. The project not only solved scalability issues but also eliminated manual effort, improved engagement, and created a flexible system that can adapt to future business needs. What started as a challenge to speed up communication turned into a complete transformation of the client’s lead management process for driving faster responses, higher customer satisfaction, and measurable growth in business opportunities.',
    ],
    background:
      'Our client runs a SaaS platform for travel and tour operators, helping businesses connect with new partners and opportunities. The client wanted to improve how new tour operator leads are captured and shared with their customers.\n\nPreviously, whenever a new tour operator launched, there was no automated way to notify customers. This often resulted in delays, missed opportunities, and manual effort to send updates. The goal was to create a faster, smarter system that could instantly capture new operator data, personalize it, and deliver it directly to customers.',
    challenges: [
      { title: 'Manual Lead Sharing', desc: 'The process of identifying and notifying clients about new tour operators was slow and labor-intensive.' },
      { title: 'Missed Opportunities', desc: 'Customers sometimes received updates too late which caused them to lose potential business leads.' },
      { title: 'No Personalization', desc: 'Emails were generic for lacking personalization to make them more engaging.' },
      { title: 'Scalability Issues', desc: 'As the number of operators grew so the manual process became impossible to manage efficiently.' },
      { title: 'Integration Complexity', desc: 'The platform needed a flexible solution that could connect with multiple data sources and email systems without heavy coding.' },
    ],
    solutionIntro:
      'We designed and implemented an AI-powered workflow automation using n8n, a low-code automation tool, integrated with the client’s SaaS platform:',
    solutions: [
      { title: 'Automated Data Capture', desc: 'As soon as a new tour operator is launched so the system automatically collects the operator’s details.' },
      { title: 'AI-Enhanced Personalization', desc: 'Using AI the system generates personalized email content tailored to each client making messages more relevant and engaging.' },
      { title: 'Workflow Automation with n8n', desc: 'n8n was used to build the workflow that connects the SaaS platform for data source and email service.' },
      { title: 'Instant Email Notifications', desc: 'Clients now receive real-time notifications directly in their inbox whenever a new operator becomes available.' },
      { title: 'Scalable & Flexible', desc: 'The automation can easily scale as the client base grows and supports integration with different tools.' },
      { title: 'Reduced Manual Effort', desc: 'The process runs automatically so freeing staff from repetitive tasks and ensuring zero delays.' },
    ],
  },
  'modernizing-legacy-software': {
    title: 'Modernizing Legacy Software with React, .NET, and Azure for Secure, User Centric Web Applications',
    tag: 'Modernization, 2025',
    heroImage: `${R2}/saas-concept-collage-scaled.jpg`,
    secondaryImage: `${R2}/4421964.jpg`,
    projectInfo: {
      client: 'WordPressRiver Themes',
      date: '25 February, 2022',
      address: '1401, 21st Street STE R4569, California',
    },
    intro: [
      'Many legacy applications struggle with slow interfaces, fragile deployments, and security gaps that frustrate users and slow the business. We modernized a client’s legacy web platform by rebuilding the front end in React for a fast, component driven UI and migrating the backend to modern .NET (ASP.NET Core) running on Azure. The result is a secure, responsive, and user centric web experience that feels modern to end users while remaining maintainable for engineers.',
      'Working incrementally with a strangler style migration, we replaced fragile monolithic pieces with well tested .NET microservices, containerized with Docker and deployed to Azure App Service (with options for AKS where needed). The React UI was built with an accessible component library and performance first patterns (code-splitting, server side rendering where appropriate), while authentication and authorization were hardened using Azure AD and token based flows. CI/CD pipelines, automated testing, and Application Insights logging were added to enable safe, frequent releases and fast troubleshooting. The project delivered measurable improvements in user satisfaction, faster page loads, stronger security posture, and dramatically reduced time to deploy and turning a risky legacy codebase into a scalable platform ready for future features.',
    ],
    background:
      'Our client in the construction industry relied on a long-standing Classic ASP application to manage critical business processes such as resource handling, time reporting, and supplier invoice management. While the system had served well for years, it was becoming increasingly difficult to maintain, lacked scalability, and did not meet modern security or usability standards.\n\nThe client’s business operations were dependent on this application, which was still live with customers but had no dedicated test environment, creating significant risks for stability and innovation. Recognizing the need to modernize, the client partnered with us to rebuild the application using React for the frontend, .NET for the backend, and Microsoft Azure for deployment, while also migrating the legacy database to Microsoft SQL Server (MSSQL) for better performance and scalability.',
    challenges: [
      { title: 'Legacy Technology', desc: 'The existing system was built in Classic ASP which limited scalability and integration with modern tools.' },
      { title: 'No Test Environment', desc: 'Any modification in the old system risked downtime as it was directly live with customers.' },
      { title: 'Database Compatibility', desc: 'The old database structure was outdated and required migration to MSSQL while preserving existing business data.' },
      { title: 'Limited Documentation', desc: 'Much of the functionality lacked formal documentation' },
      { title: 'User Experience Limitations', desc: 'The outdated UI was non-responsive and not aligned with modern usability standards and frustrating end-users.' },
      { title: 'Security Concerns', desc: 'The old system lacked robust authentication and role management and compliance-ready data handling.' },
    ],
    solutionIntro: 'We executed a phased modernization strategy to minimize disruption while delivering maximum value:',
    solutions: [
      { title: 'Modern Tech Stack Adoption', desc: 'Developed the frontend in React for a fast and responsive UI and the backend in .NET Core ensuring scalability and long-term maintainability.' },
      { title: 'Database Migration', desc: 'Converted the old legacy database into MSSQL and restructuring it to improve query performance for security and reporting capabilities.' },
      { title: 'Cloud Deployment', desc: 'Hosted the application on Microsoft Azure for leveraging its scalability and monitoring and security features for enterprise-grade reliability.' },
      { title: 'Progressive Migration Approach', desc: 'Recreated functionalities using screenshots and workflows from the old system to ensure feature parity before introducing improvements.' },
      { title: 'UI/UX Redesign', desc: 'Delivered a modern and user-centric design with intuitive navigation for mobile responsiveness and improved accessibility.' },
      { title: 'Security & Compliance', desc: 'Integrated Azure Active Directory authentication for role-based access control and secure API endpoints to ensure compliance with modern security standards.' },
      { title: 'Future-Ready Architecture', desc: 'Designed a modular system with APIs and services that allow new features like dashboards for advanced reporting and third-party integrations to be added seamlessly.' },
    ],
  },
  'seamless-salon-experience': {
    title: 'Seamless Salon Experience: Mobile App Migration with Real-Time Waiting Time Features',
    tag: 'Mobile Apps, 2025',
    heroImage: `${R2}/beauty-salon-with-cosmetology-equipment-anime-style-2.jpg`,
    secondaryImage: `${R2}/child-getting-their-hair-blown-salon-scaled.jpg`,
    projectInfo: {
      client: 'WordPressRiver Themes',
      date: '25 February, 2022',
      address: '1401, 21st Street STE R4569, California',
    },
    intro: [
      'Many salons struggle with outdated booking and waiting systems that frustrate both customers and staff. Our client, a fast growing salon chain, relied on a legacy mobile app that lacked real time updates, leading to long queues, scheduling confusion, and dissatisfied customers. The absence of instant notifications often caused missed appointments and wasted staff capacity, preventing the business from scaling smoothly.',
      'To solve these challenges, we migrated the salon’s mobile app to a modern architecture, ensuring seamless performance across iOS and Android. Real time waiting time features were introduced, allowing customers to track queues, receive instant updates, and manage bookings on the go. By integrating the app with the salon’s internal scheduling system, staff gained better visibility into customer flow, while clients enjoyed a transparent and stress free experience. The result was improved efficiency, higher customer satisfaction, and a scalable platform ready to support future growth.',
    ],
    background:
      'A popular salon wanted to improve the experience of customers waiting for their turn. Traditionally, customers had to either sit and wait at the salon or keep calling to check availability. This led to frustration, wasted time, and unclear communication between customers and the barber.\n\nTo solve this, we developed a cross-platform mobile application that provides real-time waiting time updates. Customers can now see exactly how long they need to wait for the barber chair, while the salon staff gets a clear view of upcoming bookings.',
    challenges: [
      { title: 'Customer Frustration', desc: 'Customers were unsure about their waiting time and often had to physically wait at the salon.' },
      { title: 'No Real-Time Updates', desc: 'The barber had no digital way to manage the queue or notify customers.' },
      { title: 'Time Wastage', desc: 'Both customers and staff wasted time due to unclear scheduling.' },
      { title: 'Manual Tracking', desc: 'The salon relied on pen-and-paper or calls which was inefficient and prone to errors.' },
      { title: 'Need for Cross-Platform', desc: 'The solution had to work on both iOS and Android without requiring separate apps.' },
    ],
    solutionIntro:
      'We built a cross-platform mobile application (React Native / Flutter) to bring real-time updates and convenience:\n\nThe new app created a smooth salon experience for both customers and barbers. Customers save time, feel more in control, and no longer need to wait endlessly. The barber benefits from better scheduling and fewer interruptions, leading to improved efficiency. The salon as a whole now runs more smoothly, more transparently, and with happier customers.',
    solutions: [
      { title: 'Real-Time Waiting Time', desc: 'Customers instantly see their waiting time on the app and saving them from sitting idle at the salon.' },
      { title: 'Smart Booking System', desc: 'Customers can book their slot in advance and get notifications when their turn is near.' },
      { title: 'Barber Dashboard', desc: 'The barber gets a clear and live view of bookings and upcoming customers for helping them manage time better.' },
      { title: 'Cross-Platform Development', desc: 'Built once and deployed on iOS and Android for ensuring a consistent experience across devices.' },
      { title: 'Push Notifications', desc: 'Customers get reminders and updates about their booking status and estimated time.' },
      { title: 'Data Insights', desc: 'The system tracks peak hours and cancellations and waiting times for helping the salon optimize operations.' },
    ],
  },
};

/** Display order for listing and home carousel */
export const featuredWorkSlugs = [
  'neonify-ai-content-platform',
  'rx-incident-safety-platform',
  'clause-room-legal-platform',
  'ai-enhanced-lead-management',
  'modernizing-legacy-software',
  'seamless-salon-experience',
];

export function getFeaturedWorks() {
  return featuredWorkSlugs.map((slug, index) => {
    const study = caseStudies[slug];
    return {
      id: index + 1,
      slug,
      title: study.title,
      tag: study.tag,
      image: study.heroImage,
    };
  });
}

/** Cards for the home page project carousel */
export function getHomeCarouselItems() {
  return featuredWorkSlugs.map((slug) => {
    const study = caseStudies[slug];
    const shortTitle = study.title.length > 72 ? `${study.title.slice(0, 69)}…` : study.title;
    return {
      slug,
      title: shortTitle,
      tags: study.tag.toUpperCase(),
      description: study.intro[0],
      image: study.heroImage,
      href: `/case-study/${slug}`,
    };
  });
}

export function getCaseStudy(slug) {
  return caseStudies[slug] ?? null;
}

export function getAllCaseStudySlugs() {
  return Object.keys(caseStudies);
}
