/**
 * Industry-specific page content: challenges, use cases, and how technology helps.
 * Merged into industry records via getIndustry().
 */

export const INDUSTRY_SPECIFIC_CONTENT = {
  healthcare: {
    challengesTitle: 'Operational pressure points in healthcare and pharmacy',
    challengesDescription:
      'Clinics and pharmacies do not fail from a lack of effort. They struggle when safety reporting, patient communication, and system integrations stay fragmented.',
    challenges: [
      {
        title: 'Near-misses go unreported',
        description:
          'When staff fear blame, incidents stay in paper logs or never get recorded, so pharmacies cannot learn from patterns that put patients at risk.',
      },
      {
        title: 'Compliance work steals clinical time',
        description:
          'College expectations, audit trails, and mandatory fields turn into spreadsheet chores instead of living inside the daily workflow.',
      },
      {
        title: 'Patients fall through communication gaps',
        description:
          'Missed reminders, unclear follow-ups, and phone-tag heavy processes drive no-shows and delayed care.',
      },
      {
        title: 'EHR and pharmacy systems do not talk cleanly',
        description:
          'Double entry between clinical, dispensing, and admin tools creates errors, delays, and incomplete records.',
      },
    ],
    useCasesTitle: 'Healthcare use cases we build for',
    useCasesDescription:
      'Concrete scenarios where software changes outcomes for pharmacies, clinics, and health-tech teams.',
    useCases: [
      {
        title: 'Anonymous pharmacy incident learning',
        description:
          'Independent and multi-site pharmacies capture near-misses and incidents with mandatory anonymity, then use shared analytics to prevent repeats.',
        examples: ['CQI-aligned reporting', 'Trend dashboards', 'College-ready workflows'],
      },
      {
        title: 'Clinic operations with fewer handoffs',
        description:
          'Scheduling, inventory, and staff tools sit in one place so front desk and clinical teams stop reconciling competing spreadsheets.',
        examples: ['Staff schedules', 'Dispensing support', 'Ops dashboards'],
      },
      {
        title: 'Patient portals that reduce no-shows',
        description:
          'Reminders, secure messaging, and self-serve status keep patients informed without flooding the phone line.',
        examples: ['Appointment reminders', 'Secure messages', 'Visit prep'],
      },
      {
        title: 'AI-assisted safety and document ops',
        description:
          'Approved content and incident history feed assistants that surface trends and speed routine documentation while clinicians stay in control.',
        examples: ['Safety insights', 'Document helpers', 'Staff knowledge bots'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps healthcare businesses',
    howWeHelpDescription:
      'We turn regulated workflows into software people will actually use: privacy-aware products, integrations that cut double entry, and AI that supports staff judgment instead of replacing it.',
    howWeHelp: [
      {
        title: 'Bake compliance into the workflow',
        description:
          'Required fields, audit logs, and role-based access live in the product path, so reporting is not a separate after-hours task.',
      },
      {
        title: 'Connect the systems staff already use',
        description:
          'HL7/FHIR-aware and API integrations reduce re-keying between EHR, pharmacy, and internal tools.',
      },
      {
        title: 'Protect sensitive patient and pharmacy data',
        description:
          'Encryption, least-privilege access, and careful session handling are part of delivery from sprint one.',
      },
      {
        title: 'Give leaders visibility without extra admin',
        description:
          'Dashboards and reports pull from the same operational data used on the floor, not a parallel tracking system.',
      },
      {
        title: 'Use AI where it removes friction',
        description:
          'Trend detection, document assistance, and knowledge answers grounded in approved sources speed ops without inventing clinical advice.',
      },
      {
        title: 'Scale from one site to a network',
        description:
          'Architecture that supports multi-location rollout, partner integrations, and growing data volume as the organization expands.',
      },
    ],
  },

  education: {
    challengesTitle: 'Where education technology usually breaks down',
    challengesDescription:
      'Schools and edtech teams lose time when learning, admin, and student support live in disconnected tools that neither faculty nor students trust.',
    challenges: [
      {
        title: 'Students cannot find the next step',
        description:
          'Course materials, deadlines, and support links are scattered, so learners miss work or flood advisors with basic questions.',
      },
      {
        title: 'Faculty drown in manual admin',
        description:
          'Attendance, grading handoffs, and scheduling still depend on email threads and spreadsheets that do not sync with the LMS.',
      },
      {
        title: 'Campus systems stay siloed',
        description:
          'SIS, LMS, payments, and identity each hold partial truth, creating duplicate records and enrollment errors.',
      },
      {
        title: 'Leaders lack outcome visibility',
        description:
          'Engagement and completion data arrive too late (or not at all) to intervene when students start to slip.',
      },
    ],
    useCasesTitle: 'Education use cases we build for',
    useCasesDescription:
      'From K-12 and universities to edtech products, these are the learning and campus scenarios we ship against.',
    useCases: [
      {
        title: 'Course delivery with clear progress',
        description:
          'Learners see modules, assessments, and completion status in one journey designed for mixed devices and attention spans.',
        examples: ['Course portals', 'Assessments', 'Progress tracking'],
      },
      {
        title: 'Admissions and campus operations',
        description:
          'Staff manage applications, schedules, and day-to-day workflows without rebuilding the process in spreadsheets.',
        examples: ['Admissions pipelines', 'Timetables', 'Staff tools'],
      },
      {
        title: 'Student support that scales',
        description:
          'Portals and messaging routes reduce ticket volume for common questions while escalating complex cases to humans.',
        examples: ['Student portals', 'Help flows', 'Advisor handoff'],
      },
      {
        title: 'SIS and LMS connected products',
        description:
          'Enrollments, grades, and identity sync into the experience so students and faculty are not re-entering the same data.',
        examples: ['SIS sync', 'SSO', 'Grade exchange'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps education organizations',
    howWeHelpDescription:
      'We build education products that stay clear for students, practical for faculty, and connected to the campus systems you already run.',
    howWeHelp: [
      {
        title: 'Design for mixed digital comfort',
        description:
          'Navigation and language stay simple for students, parents, faculty, and administrators with different tech fluency.',
      },
      {
        title: 'Integrate the campus stack',
        description:
          'SIS, LMS, payments, and identity connections are planned early so the product does not become another silo.',
      },
      {
        title: 'Surface learning signals early',
        description:
          'Progress and engagement data help educators intervene before a term is already lost.',
      },
      {
        title: 'Automate repetitive campus chores',
        description:
          'Reminders, status updates, and routine routing cut the manual load on faculty and support staff.',
      },
      {
        title: 'Ground AI in approved materials',
        description:
          'Study helpers and support bots answer from course content and policies you control, not the open web.',
      },
      {
        title: 'Grow programs without rebuilding',
        description:
          'Architecture that can add courses, campuses, or product lines without starting from zero.',
      },
    ],
  },

  'real-estate': {
    challengesTitle: 'Where real estate deals and ops lose momentum',
    challengesDescription:
      'Brokerages and property teams lose leads and create buyer friction when listings, CRM, and transaction status live in different worlds.',
    challenges: [
      {
        title: 'Leads go cold before anyone responds',
        description:
          'Inquiries arrive by form, chat, and phone, then sit unassigned while buyers move on to the next listing.',
      },
      {
        title: 'Listing data drifts across channels',
        description:
          'Price, availability, and media get out of sync between the website, portals, and agent decks.',
      },
      {
        title: 'Deals stall in document limbo',
        description:
          'Offers, disclosures, and approvals bounce through email with no shared view of what is blocking close.',
      },
      {
        title: 'Property ops start after the sale with zero context',
        description:
          'Owners, managers, and maintenance teams inherit assets without clean digital history or ticket workflows.',
      },
    ],
    useCasesTitle: 'Real estate use cases we build for',
    useCasesDescription:
      'Marketplace, brokerage, and property-operations scenarios where speed and clarity decide revenue.',
    useCases: [
      {
        title: 'High-converting listing search',
        description:
          'Buyers and renters filter by map, amenities, and status, then inquire without leaving the detail experience.',
        examples: ['Map search', 'Saved searches', 'Inquiry capture'],
      },
      {
        title: 'Agent lead routing that sticks',
        description:
          'Every inquiry lands with property context in the CRM or queue the brokerage already uses.',
        examples: ['Lead assignment', 'Follow-up tasks', 'CRM sync'],
      },
      {
        title: 'Transaction status for all parties',
        description:
          'Buyers, sellers, and brokers see the same milestones, documents, and blockers in one place.',
        examples: ['Deal pipeline', 'Document sharing', 'Status alerts'],
      },
      {
        title: 'Post-lease property operations',
        description:
          'Maintenance tickets, owner updates, and unit inventory stay connected after the deal closes.',
        examples: ['Owner portals', 'Work orders', 'Unit inventory'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps real estate businesses',
    howWeHelpDescription:
      'We connect discovery, response, and operations so listings convert, agents move faster, and property teams inherit clean digital workflows.',
    howWeHelp: [
      {
        title: 'Make search feel like how people buy',
        description:
          'Fast filters, maps, and detail pages reduce drop-off before the inquiry ever happens.',
      },
      {
        title: 'Put leads in motion immediately',
        description:
          'Routing rules and CRM integrations stop inquiries from dying in shared inboxes.',
      },
      {
        title: 'Give deals a single source of truth',
        description:
          'Documents and milestones live with the transaction, not across personal drives.',
      },
      {
        title: 'Extend value past closing',
        description:
          'Owner and maintenance tools reuse the same property identity created during marketing and sale.',
      },
      {
        title: 'Use AI for speed, not gimmicks',
        description:
          'Listing drafts, FAQ bots, and lead prioritization hints save hours without inventing property facts.',
      },
      {
        title: 'Instrument what matters to brokers',
        description:
          'Response time, listing performance, and ops load become visible enough to manage.',
      },
    ],
  },

  fitness: {
    challengesTitle: 'Why fitness brands lose members after the signup',
    challengesDescription:
      'Gyms, studios, and coaches struggle when booking, memberships, and engagement live in separate apps that members abandon.',
    challenges: [
      {
        title: 'Booking creates front-desk chaos',
        description:
          'Class capacity, cancellations, and waitlists are managed by hand, so members get inconsistent answers.',
      },
      {
        title: 'Memberships and payments are opaque',
        description:
          'Failed renewals, plan changes, and freezes create surprise billing and unnecessary churn conversations.',
      },
      {
        title: 'Members stop opening the app',
        description:
          'If progress, plans, and community features feel generic, engagement dies between visits.',
      },
      {
        title: 'Coaches juggle clients across tools',
        description:
          'Training plans, messaging, and content sit in chats and spreadsheets that do not scale with roster size.',
      },
    ],
    useCasesTitle: 'Fitness use cases we build for',
    useCasesDescription:
      'Member, operator, and coaching scenarios built for retention as much as scheduling.',
    useCases: [
      {
        title: 'Member apps people keep opening',
        description:
          'Bookings, workouts, progress, and community features match the brand and the real weekly habit loop.',
        examples: ['Class booking', 'Progress tracking', 'Push reminders'],
      },
      {
        title: 'Studio operations without spreadsheet gymnastics',
        description:
          'Schedules, check-in, memberships, and staff tools reduce front-desk load during peak hours.',
        examples: ['Check-in', 'Capacity rules', 'Staff schedules'],
      },
      {
        title: 'Hybrid coaching platforms',
        description:
          'Trainers deliver plans and feedback to remote and on-site clients from one workspace.',
        examples: ['Training plans', 'Coach messaging', 'Content libraries'],
      },
      {
        title: 'Retention-aware billing',
        description:
          'Subscriptions, renewals, and recovery flows handle the edge cases that cause avoidable cancellations.',
        examples: ['Failed payment recovery', 'Plan changes', 'Offers'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps fitness businesses',
    howWeHelpDescription:
      'We build fitness products around the member habit loop and the operator reality behind it: capacity, billing, coaching, and retention.',
    howWeHelp: [
      {
        title: 'Respect real capacity rules',
        description:
          'Booking engines account for rooms, coaches, and equipment instead of overselling the calendar.',
      },
      {
        title: 'Make payments match membership life',
        description:
          'Renewals, pauses, and failed charges are designed as product flows, not support tickets.',
      },
      {
        title: 'Keep members coming back between visits',
        description:
          'Progress, reminders, and community features create reasons to open the app mid-week.',
      },
      {
        title: 'Give coaches a workable roster tool',
        description:
          'Plans and messaging stay attached to clients so hybrid coaching does not collapse into DMs.',
      },
      {
        title: 'Spot churn risk early',
        description:
          'Attendance and engagement signals help operators intervene before a membership quietly dies.',
      },
      {
        title: 'Brand the experience, not a template',
        description:
          'Mobile and web UX can feel like your studio, while still running reliable ops underneath.',
      },
    ],
  },

  'retail-ecommerce': {
    challengesTitle: 'Where ecommerce growth creates operational debt',
    challengesDescription:
      'Retail teams feel conversion pressure and inventory pain at the same time when storefronts outpace fulfillment and support systems.',
    challenges: [
      {
        title: 'Checkout friction kills intent',
        description:
          'Slow pages, unclear shipping, and payment failures abandon carts that marketing already paid to acquire.',
      },
      {
        title: 'Inventory promises more than the warehouse can ship',
        description:
          'Channel stock drifts, so customers buy unavailable SKUs and support absorbs the fallout.',
      },
      {
        title: 'Support repeats the same answers all day',
        description:
          'Order status, returns, and sizing questions flood the team because the storefront cannot answer them.',
      },
      {
        title: 'New channels mean new glue code',
        description:
          'Each marketplace or region adds brittle integrations instead of a coherent commerce architecture.',
      },
    ],
    useCasesTitle: 'Ecommerce use cases we build for',
    useCasesDescription:
      'Storefront, checkout, and retail-ops scenarios where conversion and fulfillment have to stay aligned.',
    useCases: [
      {
        title: 'Brand-led storefronts that still sell',
        description:
          'Collection and product experiences carry the brand without sacrificing performance or SEO fundamentals.',
        examples: ['Custom storefronts', 'Collection merchandising', 'Mobile commerce'],
      },
      {
        title: 'Checkout tuned for your markets',
        description:
          'Payment methods, tax handling, and confirmation flows match where you actually sell.',
        examples: ['Payment gateways', 'Address validation', 'Order confirmation'],
      },
      {
        title: 'Inventory-aware retail operations',
        description:
          'Orders, stock, and returns stay connected so the site does not oversell reality.',
        examples: ['OMS sync', 'Returns', 'Stock updates'],
      },
      {
        title: 'AI that helps shoppers and agents',
        description:
          'Recommendations and support bots grounded in catalog and policy data reduce bounce and ticket volume.',
        examples: ['Product recommendations', 'Support chat', 'Search assist'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps retail and ecommerce businesses',
    howWeHelpDescription:
      'We treat conversion and operations as one product: a storefront that sells, and a back office that can keep the promise.',
    howWeHelp: [
      {
        title: 'Optimize the path to purchase',
        description:
          'Performance, product discovery, and checkout clarity are engineered together, not as separate afterthoughts.',
      },
      {
        title: 'Keep stock truthful across channels',
        description:
          'Integrations and ops tooling reduce the gap between what the site shows and what can ship.',
      },
      {
        title: 'Deflect repetitive support',
        description:
          'Order status and policy answers move into self-serve and bot flows with clean escalation.',
      },
      {
        title: 'Personalize without guessing catalog facts',
        description:
          'Recommendations and assistants use your real product data and business rules.',
      },
      {
        title: 'Expand channels on purpose',
        description:
          'Architecture that can absorb new regions or storefronts without reinventing fulfillment every time.',
      },
      {
        title: 'Measure what operators can act on',
        description:
          'Funnel, fulfillment, and service metrics stay visible enough to guide weekly decisions.',
      },
    ],
  },

  'media-entertainment': {
    challengesTitle: 'Where media products lose audience and ops control',
    challengesDescription:
      'Publishers and entertainment brands struggle when content workflows, delivery, and monetization are held together by brittle scripts.',
    challenges: [
      {
        title: 'Publishing is slower than the news cycle',
        description:
          'Editorial handoffs and catalog updates stall releases that should already be live.',
      },
      {
        title: 'Playback fails when it matters most',
        description:
          'Premiere and live spikes expose weak CDN strategy, device gaps, and fragile streaming paths.',
      },
      {
        title: 'Audiences churn between visits',
        description:
          'Without memberships, personalization, or coherent apps, fans have no reason to return.',
      },
      {
        title: 'Monetization is bolted on late',
        description:
          'Subscriptions, paywalls, and ads get added after the product is live, creating entitlement bugs.',
      },
    ],
    useCasesTitle: 'Media use cases we build for',
    useCasesDescription:
      'Publishing, streaming, and audience scenarios built for traffic peaks and editorial reality.',
    useCases: [
      {
        title: 'Editorial platforms that ship on time',
        description:
          'Catalogs, workflows, and publishing tools keep content moving without chaotic side channels.',
        examples: ['CMS workflows', 'Catalogs', 'Release scheduling'],
      },
      {
        title: 'Audience apps and memberships',
        description:
          'Fans get personalized feeds, entitlements, and account experiences across devices.',
        examples: ['Fan apps', 'Memberships', 'Watchlists'],
      },
      {
        title: 'Streaming ready for premieres',
        description:
          'Playback and delivery architecture planned for spikes, not just quiet weekday traffic.',
        examples: ['Video playback', 'CDN strategy', 'Device support'],
      },
      {
        title: 'Paywalls and ads that match the catalog',
        description:
          'Entitlements and monetization rules connect cleanly to what users can actually watch or read.',
        examples: ['Subscriptions', 'Paywalls', 'Ads integrations'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps media and entertainment businesses',
    howWeHelpDescription:
      'We help media teams publish faster, engage audiences between releases, and monetize without breaking entitlements during peak traffic.',
    howWeHelp: [
      {
        title: 'Tighten the publish loop',
        description:
          'Editorial tooling and APIs reduce the distance between finished content and a live experience.',
      },
      {
        title: 'Design for premiere-scale traffic',
        description:
          'Caching, CDN-aware delivery, and resilient playback paths are part of the architecture conversation early.',
      },
      {
        title: 'Keep fans in a owned relationship',
        description:
          'Memberships and apps create return paths that are not fully dependent on social algorithms.',
      },
      {
        title: 'Connect monetization to entitlements',
        description:
          'Billing state and content access stay synchronized so paying users are not locked out mid-stream.',
      },
      {
        title: 'Use AI for catalog and discovery work',
        description:
          'Tagging, recommendations, and editorial helpers speed operations without inventing rights you do not have.',
      },
      {
        title: 'Instrument engagement honestly',
        description:
          'Retention, completion, and monetization signals guide roadmap decisions with less guesswork.',
      },
    ],
  },

  automotive: {
    challengesTitle: 'Where automotive customer journeys fall apart',
    challengesDescription:
      'Dealers and mobility teams lose sales and service trust when showroom, workshop, and ownership channels do not share context.',
    challenges: [
      {
        title: 'Vehicle inquiries die in the showroom inbox',
        description:
          'Leads arrive without inventory context or clear ownership, so response times stretch past buyer patience.',
      },
      {
        title: 'Service updates require phone tag',
        description:
          'Customers call repeatedly because booking status and workshop progress are invisible outside the bay.',
      },
      {
        title: 'Sales and service keep separate customer truths',
        description:
          'Ownership history, preferences, and open jobs do not travel with the customer across departments.',
      },
      {
        title: 'DMS and CRM integrations are fragile',
        description:
          'Re-keying between dealer systems creates wrong VINs, missed appointments, and angry return visits.',
      },
    ],
    useCasesTitle: 'Automotive use cases we build for',
    useCasesDescription:
      'Dealer, aftersales, and ownership scenarios that keep the vehicle and customer story connected.',
    useCases: [
      {
        title: 'Dealer inventory and lead platforms',
        description:
          'Shoppers browse real stock while sales teams get routed inquiries with vehicle details attached.',
        examples: ['Inventory feeds', 'Lead routing', 'Sales dashboards'],
      },
      {
        title: 'Service booking with live status',
        description:
          'Customers schedule work and receive updates as jobs move through the workshop.',
        examples: ['Service booking', 'Job tracking', 'Customer alerts'],
      },
      {
        title: 'Ownership and loyalty apps',
        description:
          'Post-sale experiences cover history, reminders, and loyalty without starting a new customer record.',
        examples: ['Service history', 'Reminders', 'Loyalty offers'],
      },
      {
        title: 'DMS-connected operations',
        description:
          'Dealer products sync with DMS, CRM, parts, and payments so departments stop retyping the same facts.',
        examples: ['DMS sync', 'Parts lookups', 'Payment flows'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps automotive businesses',
    howWeHelpDescription:
      'We connect sales, service, and ownership into digital workflows that respect how dealerships actually operate.',
    howWeHelp: [
      {
        title: 'Attach every lead to a vehicle',
        description:
          'Inquiry routing carries inventory context so sales conversations start with the right car.',
      },
      {
        title: 'Make service status customer-visible',
        description:
          'Bookings and job updates reduce “is it done yet” calls without adding desk work.',
      },
      {
        title: 'Share one customer timeline',
        description:
          'Sales and aftersales see shared history instead of competing notes.',
      },
      {
        title: 'Integrate the dealer stack first',
        description:
          'DMS and CRM connections are designed before feature sprawl creates reconciliation nightmares.',
      },
      {
        title: 'Assist advisors with practical AI',
        description:
          'FAQ bots, appointment helpers, and history summaries speed service desks with human oversight.',
      },
      {
        title: 'Measure throughput that managers care about',
        description:
          'Response times, booking conversion, and bay utilization become manageable metrics.',
      },
    ],
  },

  insurance: {
    challengesTitle: 'Where insurance operations create customer friction',
    challengesDescription:
      'Carriers and brokers lose trust when quoting, claims, and partner submissions depend on opaque handoffs and incomplete files.',
    challenges: [
      {
        title: 'Quotes and endorsements move too slowly',
        description:
          'Staff re-enter data across tools, so customers wait while competitors already issued coverage.',
      },
      {
        title: 'Claims status is a black box',
        description:
          'Policyholders and adjusters lack a shared timeline, which drives repeat calls and escalations.',
      },
      {
        title: 'Partner submissions arrive incomplete',
        description:
          'Brokers and agents upload partial packs that bounce back and forth before underwriting can start.',
      },
      {
        title: 'Audit evidence is hard to reconstruct',
        description:
          'When reviewers ask what happened, the trail lives in email instead of the system of record.',
      },
    ],
    useCasesTitle: 'Insurance use cases we build for',
    useCasesDescription:
      'Policy, claims, and distribution scenarios built for accuracy and customer clarity.',
    useCases: [
      {
        title: 'Policy lifecycle platforms',
        description:
          'Quotes, issuance, endorsements, and renewals keep status visible for staff and customers.',
        examples: ['Quoting', 'Endorsements', 'Renewals'],
      },
      {
        title: 'Claims intake to resolution',
        description:
          'Structured intake, adjuster tools, and status tracking reduce rework and mystery delays.',
        examples: ['FNOL intake', 'Adjuster queues', 'Status timelines'],
      },
      {
        title: 'Broker and partner portals',
        description:
          'Distributors submit, track, and service business without emailing half-complete packages.',
        examples: ['Partner portals', 'Submission checklists', 'Commission views'],
      },
      {
        title: 'Policyholder self-service',
        description:
          'Customers view coverage, upload documents, and check claims without calling the contact center.',
        examples: ['Policy portal', 'Document upload', 'Claims status'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps insurance businesses',
    howWeHelpDescription:
      'We design insurance software around lifecycle clarity, partner quality, and auditability so operations move faster without losing control.',
    howWeHelp: [
      {
        title: 'Shorten the path from quote to issue',
        description:
          'Shared data and guided workflows cut re-entry between sales, underwriting, and servicing.',
      },
      {
        title: 'Make claims progress legible',
        description:
          'Status, documents, and next actions stay visible to the people who need them.',
      },
      {
        title: 'Raise partner submission quality',
        description:
          'Portals enforce required inputs before incomplete files waste underwriting time.',
      },
      {
        title: 'Leave an audit trail by default',
        description:
          'Permissions and logging make it possible to reconstruct decisions when reviews arrive.',
      },
      {
        title: 'Use AI for intake and summarization',
        description:
          'Classification and document helpers speed routine work while humans own coverage decisions.',
      },
      {
        title: 'Reduce avoidable contact-center volume',
        description:
          'Self-serve policy and claims access answers the questions that should never need a phone call.',
      },
    ],
  },

  'banking-finance': {
    challengesTitle: 'Where financial products lose customer trust',
    challengesDescription:
      'Fintech and banking teams feel the tension between speed and control when onboarding, payments, and ops tooling are not designed together.',
    challenges: [
      {
        title: 'Onboarding drops before verification completes',
        description:
          'KYC steps feel confusing or fail silently, so applicants abandon before funding an account.',
      },
      {
        title: 'Money movement fails without clear recovery',
        description:
          'Transfers and payments hit edge cases that ops cannot diagnose quickly enough.',
      },
      {
        title: 'Support and risk teams work blind',
        description:
          'Cases lack the timeline and evidence needed for fast, compliant decisions.',
      },
      {
        title: 'Security controls arrive after features ship',
        description:
          'Access, auditability, and sensitive-flow design get bolted on once the product is already live.',
      },
    ],
    useCasesTitle: 'Banking and finance use cases we build for',
    useCasesDescription:
      'Customer, payments, and internal-ops scenarios where usability and controls have to coexist.',
    useCases: [
      {
        title: 'Digital onboarding and account experiences',
        description:
          'Applicants complete verification and land in dashboards that make balances and actions obvious.',
        examples: ['KYC flows', 'Account dashboards', 'Statements'],
      },
      {
        title: 'Payments with operable failure handling',
        description:
          'Transfers and reconciliations expose enough state for ops to recover without guesswork.',
        examples: ['Transfers', 'Payment rails', 'Reconciliation'],
      },
      {
        title: 'Risk and support case tooling',
        description:
          'Internal queues gather context so reviewers and agents resolve issues under control.',
        examples: ['Review queues', 'Case notes', 'Escalations'],
      },
      {
        title: 'Core and provider integrations',
        description:
          'Banking products connect to KYC, core, and payment providers without fragile one-off scripts.',
        examples: ['KYC APIs', 'Core banking', 'Processors'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps banking and finance businesses',
    howWeHelpDescription:
      'We build financial products that feel simple to customers and controlled to operators, with security treated as a product requirement.',
    howWeHelp: [
      {
        title: 'Clarify the money journey',
        description:
          'Onboarding and account UX reduce abandonment caused by confusion, not just conversion tricks.',
      },
      {
        title: 'Make payments diagnosable',
        description:
          'Failure states, retries, and reconciliations are designed for ops reality.',
      },
      {
        title: 'Equip risk and support with context',
        description:
          'Case tools carry the timeline reviewers need instead of forcing inbox archaeology.',
      },
      {
        title: 'Ship security with the feature',
        description:
          'Auth, least privilege, and auditability are part of the first release, not a later hardening project.',
      },
      {
        title: 'Integrate providers deliberately',
        description:
          'KYC and payment connections are scoped with ownership of edge cases and monitoring.',
      },
      {
        title: 'Use AI as an ops accelerator',
        description:
          'Support and review assistants summarize and route work while humans retain decisions that matter.',
      },
    ],
  },

  'design-architecture': {
    challengesTitle: 'Where design and architecture practices lose time',
    challengesDescription:
      'Studios bleed hours into email reviews, scattered files, and vague project status that clients should never have to chase.',
    challenges: [
      {
        title: 'Feedback lives in endless email chains',
        description:
          'Client comments detach from drawings and milestones, so revisions restart from the wrong version.',
      },
      {
        title: 'Project status is tribal knowledge',
        description:
          'Only the project lead knows what is blocked, which makes staffing and client updates unreliable.',
      },
      {
        title: 'Assets are impossible to find later',
        description:
          'Drawings, specs, and decisions scatter across drives with no project-centered structure.',
      },
      {
        title: 'Portfolio sites do not reflect the work',
        description:
          'Marketing pages lag behind completed projects, so the practice under-sells itself online.',
      },
    ],
    useCasesTitle: 'Design and architecture use cases we build for',
    useCasesDescription:
      'Studio delivery, client collaboration, and portfolio scenarios shaped for creative project work.',
    useCases: [
      {
        title: 'Phase-aware project delivery',
        description:
          'Milestones, tasks, and ownership follow how studios actually move from concept to construction support.',
        examples: ['Phase milestones', 'Task boards', 'Team assignments'],
      },
      {
        title: 'Client review portals',
        description:
          'Approvals and comments stay attached to the right package instead of disappearing into inboxes.',
        examples: ['Shared reviews', 'Approvals', 'Comment threads'],
      },
      {
        title: 'Maintainable portfolio sites',
        description:
          'Brand-forward showcases that principals and marketers can update without a developer for every project.',
        examples: ['Case galleries', 'CMS portfolios', 'Studio sites'],
      },
      {
        title: 'Project asset libraries',
        description:
          'Drawings and documents stay searchable by project so teams stop recreating folders for every phase.',
        examples: ['Versioned files', 'Asset libraries', 'Handoff packs'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps design and architecture firms',
    howWeHelpDescription:
      'We build tools that respect creative delivery: clearer phases, cleaner client reviews, and portfolios that keep pace with the work.',
    howWeHelp: [
      {
        title: 'Model work the way studios phase it',
        description:
          'Delivery tools follow concept, design development, and construction realities instead of generic tickets.',
      },
      {
        title: 'Put reviews where the files are',
        description:
          'Client portals keep feedback attached to the current package and decision.',
      },
      {
        title: 'Make status client-ready',
        description:
          'Teams and clients see the same milestones without a weekly status archaeology session.',
      },
      {
        title: 'Organize assets for reuse',
        description:
          'Project-centered libraries reduce lost drawings and repeated uploads.',
      },
      {
        title: 'Keep the portfolio current',
        description:
          'CMS-driven sites let the practice publish finished work while it is still relevant.',
      },
      {
        title: 'Add AI only where search helps',
        description:
          'Assistants can surface notes and assets faster without pretending to design the building.',
      },
    ],
  },

  logistics: {
    challengesTitle: 'Where logistics visibility breaks under volume',
    challengesDescription:
      'Shippers and operators lose money when tracking, dispatch, warehouse handoffs, and customer updates drift apart during peak load.',
    challenges: [
      {
        title: 'ETAs lie and exceptions hide',
        description:
          'Status events arrive late or inconsistently, so ops discovers delays after the customer already called.',
      },
      {
        title: 'Dispatch cannot see the real constraint',
        description:
          'Assignments ignore capacity, route reality, or warehouse readiness and create cascading misses.',
      },
      {
        title: 'Warehouse and linehaul handoffs drop context',
        description:
          'Inbound, inventory, and outbound teams work from different truths about what is ready to move.',
      },
      {
        title: 'Customers only hear bad news when they ask',
        description:
          'Proactive notifications are missing, so support spends the day answering “where is my shipment?”',
      },
    ],
    useCasesTitle: 'Logistics use cases we build for',
    useCasesDescription:
      'Visibility, dispatch, warehouse, and customer-communication scenarios built for exception-heavy operations.',
    useCases: [
      {
        title: 'Shipment visibility with honest ETAs',
        description:
          'Event pipelines and exception alerts give ops and customers a shared view of what is moving.',
        examples: ['Live tracking', 'Exception alerts', 'ETA updates'],
      },
      {
        title: 'Fleet dispatch that respects constraints',
        description:
          'Assignment and driver tools account for capacity and route conditions instead of optimistic spreadsheets.',
        examples: ['Dispatch boards', 'Driver apps', 'Route planning'],
      },
      {
        title: 'Warehouse flow from inbound to outbound',
        description:
          'Receiving, inventory, and packing workflows reduce lost handoffs on the floor.',
        examples: ['Receiving', 'Inventory', 'Outbound packing'],
      },
      {
        title: 'Customer updates before the complaint',
        description:
          'Tracking pages and delay notices cut reactive support volume during peak season.',
        examples: ['Tracking pages', 'SMS / email alerts', 'Delay notices'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps logistics businesses',
    howWeHelpDescription:
      'We build logistics software that stays accurate when volume spikes: event-driven visibility, operable dispatch, and customer communication that does not depend on heroics.',
    howWeHelp: [
      {
        title: 'Treat exceptions as first-class events',
        description:
          'Delays and failures surface in the same system that tracks happy-path shipments.',
      },
      {
        title: 'Connect warehouse readiness to dispatch',
        description:
          'Assignments reflect what is actually packed and ready, not what the spreadsheet hoped.',
      },
      {
        title: 'Give drivers tools that survive the field',
        description:
          'Mobile experiences are designed for real network conditions and quick status capture.',
      },
      {
        title: 'Tell customers before they call',
        description:
          'Notification rules turn status changes into proactive updates.',
      },
      {
        title: 'Integrate carriers and commerce systems',
        description:
          'Order and label data stay aligned across the tools that create demand and move freight.',
      },
      {
        title: 'Use AI for risk signals, not fake certainty',
        description:
          'Helpers flag patterns and support planning while operators remain accountable for decisions.',
      },
    ],
  },

  sports: {
    challengesTitle: 'Where sports digital products miss the moment',
    challengesDescription:
      'Clubs and leagues lose fans and ops control when engagement, ticketing, and staff tools are not ready for match-day reality.',
    challenges: [
      {
        title: 'Fan apps go quiet between fixtures',
        description:
          'Content and memberships do not create a weekly habit, so engagement collapses after match day.',
      },
      {
        title: 'Ticketing buckles at on-sale',
        description:
          'Registration and checkout paths were never designed for the surge that actually shows up.',
      },
      {
        title: 'Club staff run events from spreadsheets',
        description:
          'Schedules, access, and community workflows live outside the fan-facing product.',
      },
      {
        title: 'Media and stats are disconnected from the audience product',
        description:
          'Highlights and performance content never reach the places fans already open.',
      },
    ],
    useCasesTitle: 'Sports use cases we build for',
    useCasesDescription:
      'Fan, club, and event scenarios that have to work on quiet weekdays and chaotic sale windows.',
    useCases: [
      {
        title: 'Fan engagement and memberships',
        description:
          'Apps and membership experiences keep supporters close with content, access, and loyalty loops.',
        examples: ['Fan apps', 'Memberships', 'Content feeds'],
      },
      {
        title: 'Club operations platforms',
        description:
          'Staff manage schedules, community, and internal coordination without leaving the core system.',
        examples: ['Team schedules', 'Staff portals', 'Community tools'],
      },
      {
        title: 'Event and ticketing flows',
        description:
          'On-sale journeys handle peak demand with clear status and access control afterward.',
        examples: ['Ticketing', 'Registration', 'Entry access'],
      },
      {
        title: 'Performance and media distribution',
        description:
          'Stats and highlights publish into the same audience products fans already use.',
        examples: ['Stats views', 'Highlight publishing', 'Media libraries'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps sports organizations',
    howWeHelpDescription:
      'We build sports products for two clocks at once: everyday engagement and the surge of match day or on-sale.',
    howWeHelp: [
      {
        title: 'Create reasons to return between matches',
        description:
          'Membership and content features keep the relationship alive outside fixture windows.',
      },
      {
        title: 'Engineer ticketing for the surge',
        description:
          'Checkout and registration paths are designed around peak demand, not average Tuesday traffic.',
      },
      {
        title: 'Connect staff ops to fan products',
        description:
          'Schedules and event workflows stop living in separate tools from the audience experience.',
      },
      {
        title: 'Publish media where fans already are',
        description:
          'Highlights and stats reach owned channels instead of only third-party platforms.',
      },
      {
        title: 'Personalize without losing the club voice',
        description:
          'Recommendations and alerts stay grounded in roster, fixture, and membership data.',
      },
      {
        title: 'Measure engagement clubs can act on',
        description:
          'Membership, attendance, and content signals inform commercial and community decisions.',
      },
    ],
  },

  'travel-hospitality': {
    challengesTitle: 'Where travel businesses lose bookings in the gap between signal and response',
    challengesDescription:
      'Operators and hospitality brands miss revenue when leads, inventory, and guest updates move slower than traveler expectations.',
    challenges: [
      {
        title: 'New opportunities reach partners too late',
        description:
          'Operator leads and inventory changes sit in manual queues while competitors already messaged the network.',
      },
      {
        title: 'Guest communication feels generic',
        description:
          'Confirmations and updates ignore trip context, so travelers tune out or call support instead.',
      },
      {
        title: 'Peak season overwhelms admin tools',
        description:
          'Booking and partner workflows that worked in low season collapse when volume spikes.',
      },
      {
        title: 'Systems do not share traveler context',
        description:
          'CRM, booking, and messaging tools each hold a partial story, creating missed handoffs.',
      },
    ],
    useCasesTitle: 'Travel and tourism use cases we build for',
    useCasesDescription:
      'Booking, operator, and guest-experience scenarios where timing and personalization decide conversion.',
    useCases: [
      {
        title: 'Booking journeys that convert under pressure',
        description:
          'Search, availability, payments, and confirmation stay fast when demand surges.',
        examples: ['Availability search', 'Checkout', 'Confirmations'],
      },
      {
        title: 'Operator lead and partner portals',
        description:
          'New opportunities distribute to the right partners with the context needed to act immediately.',
        examples: ['Lead sharing', 'Partner portals', 'Inventory updates'],
      },
      {
        title: 'Personalized guest updates',
        description:
          'Itineraries and alerts reflect the traveler’s trip instead of blasting one generic template.',
        examples: ['Itinerary messages', 'Delay alerts', 'Pre-arrival tips'],
      },
      {
        title: 'Automation for high season',
        description:
          'Workflows and AI-assisted messaging remove manual chasing when staff cannot keep up.',
        examples: ['n8n automations', 'Personalized emails', 'Support bots'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps travel and hospitality businesses',
    howWeHelpDescription:
      'We help travel teams respond while the opportunity is still live: faster operator communication, clearer guest journeys, and automations that survive peak season.',
    howWeHelp: [
      {
        title: 'Collapse the time from signal to message',
        description:
          'Automations capture new leads or inventory changes and notify the right people in seconds.',
      },
      {
        title: 'Personalize with real trip context',
        description:
          'Messages use traveler and booking data so updates feel relevant instead of spammy.',
      },
      {
        title: 'Design admin tools for peak load',
        description:
          'Operator UX stays usable when volume multiplies, with clear failure handling.',
      },
      {
        title: 'Connect booking, CRM, and messaging',
        description:
          'Integrations keep guest context moving with the journey across systems.',
      },
      {
        title: 'Support guests without drowning staff',
        description:
          'Bots and self-serve flows answer routine questions while escalating exceptions.',
      },
      {
        title: 'Measure response as a commercial metric',
        description:
          'Lead response time and booking conversion become visible enough to manage.',
      },
    ],
  },

  'apparel-fashion': {
    challengesTitle: 'Where fashion commerce breaks the brand promise',
    challengesDescription:
      'Apparel brands feel the gap between campaign storytelling and operational truth when variants, inventory, and checkout are treated as afterthoughts.',
    challenges: [
      {
        title: 'Campaign sites sell unavailable sizes',
        description:
          'Lookbooks launch beautifully, then shoppers hit out-of-stock variants that inventory never confirmed.',
      },
      {
        title: 'Drops collapse under traffic',
        description:
          'Launch moments overwhelm storefront and checkout paths that were only tested in quiet conditions.',
      },
      {
        title: 'Variant complexity confuses discovery',
        description:
          'Color, size, and fit options are hard to browse, so conversion dies on product detail pages.',
      },
      {
        title: 'Post-purchase reality damages the brand',
        description:
          'Returns, exchanges, and fulfillment mismatches create support load that campaigns never planned for.',
      },
    ],
    useCasesTitle: 'Apparel and fashion use cases we build for',
    useCasesDescription:
      'Brand storytelling and commerce scenarios that still respect inventory, variants, and fulfillment.',
    useCases: [
      {
        title: 'Campaign-ready brand storefronts',
        description:
          'Collection and lookbook experiences launch with merchandising control and commerce fundamentals intact.',
        examples: ['Lookbooks', 'Collection pages', 'Campaign launches'],
      },
      {
        title: 'Variant-aware fashion checkout',
        description:
          'Size and color complexity is handled cleanly through detail pages and purchase flows.',
        examples: ['Size variants', 'Fit guidance', 'Drop checkout'],
      },
      {
        title: 'Retail ops behind the brand',
        description:
          'Inventory, orders, and returns stay aligned so the storefront does not oversell the rack.',
        examples: ['Inventory sync', 'Order ops', 'Returns'],
      },
      {
        title: 'Personalization that knows the catalog',
        description:
          'Recommendations and styling helpers use real product data instead of generic fashion tropes.',
        examples: ['Recommendations', 'Styling assistants', 'Retention journeys'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps apparel and fashion brands',
    howWeHelpDescription:
      'We build fashion commerce that looks like the brand and still tells the truth about stock, variants, and fulfillment.',
    howWeHelp: [
      {
        title: 'Launch campaigns without breaking ops',
        description:
          'Visual storytelling and inventory checks ship as one release, not two conflicting teams.',
      },
      {
        title: 'Make variants shoppable',
        description:
          'Product detail and checkout flows reduce size and color confusion that kills conversion.',
      },
      {
        title: 'Prepare for drop traffic',
        description:
          'Architecture and UX are tested against launch surges before the campaign goes live.',
      },
      {
        title: 'Keep fulfillment honest',
        description:
          'OMS and inventory connections protect the brand from selling what cannot ship.',
      },
      {
        title: 'Personalize from catalog truth',
        description:
          'AI recommendations and styling tools stay grounded in real SKUs and availability.',
      },
      {
        title: 'Give merchandisers operable tools',
        description:
          'CMS and merchandising controls let marketing move quickly without developer bottlenecks for every update.',
      },
    ],
  },

  'legal-tech': {
    challengesTitle: 'Where legal teams lose hours before the real work starts',
    challengesDescription:
      'Lawyers and legal ops burn time hunting clauses, chasing approvals, and reconstructing contract status from email instead of practicing law.',
    challenges: [
      {
        title: 'Approved language is impossible to find',
        description:
          'Clauses live in old deals and personal folders, so teams renegotiate from scratch on every matter.',
      },
      {
        title: 'Approvals stall in inboxes',
        description:
          'Review requests vanish into email threads with no shared view of who is blocking signature.',
      },
      {
        title: 'Junior lawyers lack reusable playbooks',
        description:
          'Institutional knowledge stays tribal, so quality depends on who is available that week.',
      },
      {
        title: 'Contract status is invisible to stakeholders',
        description:
          'Business partners cannot see what is in review, which creates duplicate pings and missed deadlines.',
      },
    ],
    useCasesTitle: 'Legal tech use cases we build for',
    useCasesDescription:
      'Clause, contract, and practice scenarios designed for document-heavy legal work with strict permissions.',
    useCases: [
      {
        title: 'Searchable clause libraries',
        description:
          'Teams reuse approved language with version history instead of rebuilding every agreement.',
        examples: ['Clause search', 'Approved libraries', 'Version control'],
      },
      {
        title: 'Matter and contract tracking',
        description:
          'Status, owners, and deadlines stay visible across legal and business stakeholders.',
        examples: ['Matter dashboards', 'Review pending states', 'Client portals'],
      },
      {
        title: 'Playbook-guided workflows',
        description:
          'Common agreement types follow structured paths that teach while they move work forward.',
        examples: ['SOW playbooks', 'Services agreements', 'Learning modules'],
      },
      {
        title: 'AI-assisted legal operations',
        description:
          'Search and summarization helpers speed review while attorneys keep judgment and final control.',
        examples: ['AI clause search', 'Document summaries', 'Review assistants'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps legal teams and legal-tech products',
    howWeHelpDescription:
      'We build legal software around search, permissions, and workflow reality so attorneys find language faster and stakeholders see status without email archaeology.',
    howWeHelp: [
      {
        title: 'Centralize the language that matters',
        description:
          'Clause libraries become the system of record for approved wording.',
      },
      {
        title: 'Move approvals out of email',
        description:
          'Inbox-style workflows keep ownership and blockers visible.',
      },
      {
        title: 'Teach through playbooks',
        description:
          'Structured paths help junior lawyers work from proven patterns.',
      },
      {
        title: 'Protect confidential work by default',
        description:
          'Role-based access and audit logs are designed for sensitive client material.',
      },
      {
        title: 'Ground AI in firm-approved content',
        description:
          'Assistants retrieve from your library instead of inventing language from the open web.',
      },
      {
        title: 'Give legal ops measurable bottlenecks',
        description:
          'Dashboards show where review time and clause reuse are helping or hurting throughput.',
      },
    ],
  },

  construction: {
    challengesTitle: 'Where construction software becomes a business risk',
    challengesDescription:
      'Firms stuck on legacy systems cannot safely change live tools, so field and office teams keep paying the tax of fragile software.',
    challenges: [
      {
        title: 'Legacy apps have no safe place to test',
        description:
          'Classic systems run only in production, so every change risks downtime for crews and customers.',
      },
      {
        title: 'Field teams inherit desktop-era UX',
        description:
          'Interfaces that worked in the office fail on site, pushing people back to paper and calls.',
      },
      {
        title: 'Resource and time data arrives late',
        description:
          'Crew reporting and supplier status lag, so project managers manage from outdated snapshots.',
      },
      {
        title: 'Invoice and approval packs live in email',
        description:
          'Project finance slows down because documents and approvals are not attached to a durable workflow.',
      },
    ],
    useCasesTitle: 'Construction use cases we build for',
    useCasesDescription:
      'Modernization, field ops, and project-finance scenarios for firms that cannot afford a reckless cutover.',
    useCases: [
      {
        title: 'Phased legacy modernization',
        description:
          'React, .NET, and cloud rebuilds replace fragile stacks while the business keeps operating.',
        examples: ['Strangler migration', 'Staging environments', 'Azure delivery'],
      },
      {
        title: 'Crew and resource tracking',
        description:
          'Time and resource reporting that works for office and field users on the same system of record.',
        examples: ['Time reporting', 'Crew allocation', 'Project reports'],
      },
      {
        title: 'Supplier invoice workflows',
        description:
          'Approvals and documents move through controlled steps instead of fragile email packs.',
        examples: ['Invoice approvals', 'Supplier docs', 'Audit history'],
      },
      {
        title: 'Field-ready interfaces',
        description:
          'Mobile-friendly experiences that supervisors and crews can use outside the office.',
        examples: ['Tablet UX', 'Simplified forms', 'On-site status'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps construction businesses',
    howWeHelpDescription:
      'We modernize construction systems with staging, clearer field UX, and workflows that reduce operational risk instead of adding a big-bang cutover.',
    howWeHelp: [
      {
        title: 'Create a safe path off legacy',
        description:
          'Phased migration and test environments let you change systems without betting the live business.',
      },
      {
        title: 'Rebuild UX for field reality',
        description:
          'Interfaces are designed for site conditions, not only desktop admin users.',
      },
      {
        title: 'Centralize project and resource truth',
        description:
          'Time, crews, and status stop living in conflicting spreadsheets.',
      },
      {
        title: 'Attach finance docs to workflow',
        description:
          'Invoice and supplier approvals leave an audit trail project teams can trust.',
      },
      {
        title: 'Harden identity and access',
        description:
          'Modern authentication and roles replace outdated assumptions in aging apps.',
      },
      {
        title: 'Leave room for future modules',
        description:
          'API-minded architecture makes dashboards and integrations additive instead of invasive.',
      },
    ],
  },

  martech: {
    challengesTitle: 'Where marketing technology slows the team it was meant to accelerate',
    challengesDescription:
      'Growth teams lose days when brand voice, publishing, and integrations are split across tools that do not share context.',
    challenges: [
      {
        title: 'Brand voice breaks across channels',
        description:
          'Generic AI and disconnected editors produce content that needs heavy rewrites before it can publish.',
      },
      {
        title: 'Publishing requires too many handoffs',
        description:
          'Writers, reviewers, and channel owners bounce between tools to get one post live.',
      },
      {
        title: 'Integrations are scattered and fragile',
        description:
          'Social, CMS, and email connections live on separate screens with inconsistent OAuth and failure handling.',
      },
      {
        title: 'Knowledge never reaches the AI',
        description:
          'Brand docs, URLs, and guidelines stay outside the generation workflow, so output ignores what the company already knows.',
      },
    ],
    useCasesTitle: 'MarTech use cases we build for',
    useCasesDescription:
      'Campaign, content, and automation scenarios for teams that need speed without losing brand control.',
    useCases: [
      {
        title: 'Brand-aware content platforms',
        description:
          'Generation and editing stay grounded in approved voice, guidelines, and knowledge sources.',
        examples: ['Brand profiling', 'AI drafting', 'Review workflows'],
      },
      {
        title: 'Campaign calendars with real publishing',
        description:
          'Planning and posting happen in one workspace connected to social and CMS destinations.',
        examples: ['Campaign calendar', 'Quick post', 'Multi-channel publish'],
      },
      {
        title: 'Automation across the growth stack',
        description:
          'CRM, email, ads, and analytics connect into dependable orchestration instead of brittle glue.',
        examples: ['Workflow automation', 'CRM sync', 'Event pipelines'],
      },
      {
        title: 'Knowledge ingestion for better AI',
        description:
          'URLs, docs, and media feed retrieval systems that keep generation on-brand and factual to your materials.',
        examples: ['URL ingestion', 'Document search', 'Knowledge bases'],
      },
    ],
    howWeHelpTitle: 'How Nexuron technology helps MarTech and growth teams',
    howWeHelpDescription:
      'We build marketing platforms that unify brand voice, collaboration, and publishing so AI accelerates the workflow instead of creating cleanup work.',
    howWeHelp: [
      {
        title: 'Ground AI in your brand knowledge',
        description:
          'Generation pulls from approved docs and guidelines before anyone hits publish.',
      },
      {
        title: 'Collapse the publish path',
        description:
          'Draft, review, and channel posting live together so handoffs stop killing velocity.',
      },
      {
        title: 'Unify integrations into one hub',
        description:
          'OAuth and publishing connections are designed as a coherent product surface.',
      },
      {
        title: 'Support real-time collaboration',
        description:
          'Editors and agencies can work in shared spaces without version chaos.',
      },
      {
        title: 'Instrument growth honestly',
        description:
          'Campaign and publishing events become measurable inputs for iteration.',
      },
      {
        title: 'Scale AI workloads on purpose',
        description:
          'Architecture for long-running generation and ingestion jobs that will not collapse under team adoption.',
      },
    ],
  },
};
