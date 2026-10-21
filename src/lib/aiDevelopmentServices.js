/**
 * Content + nav config for the AI Development services column.
 * Copy aligned with Nexuron_Revised_AI_Service_Content.docx
 */

export const AI_DEVELOPMENT_SERVICES = [
  {
    slug: 'ai-chatbot',
    name: 'AI Chatbot Development',
    shortName: 'AI Chatbot Development',
    href: '/services/ai-chatbot',
    heroTitle: 'AI Chatbot Development',
    heroDescription:
      'Website, WhatsApp, and customer-support chatbots that answer common questions, qualify leads, and help resolve support requests using your business information.',
    overviewTitle: 'Conversational bots for the channels your customers use',
    overviewHighlight: 'channels your customers use',
    overviewDescription:
      'We design and build conversational bots for websites, WhatsApp, and support platforms. Bots can use your FAQs, product information, and policies to provide relevant answers and hand off complex requests to your team.',
    serviceName: 'AI Chatbot Development',
    hireSubject: 'AI Chatbot Developer',
    overviewItems: [
      {
        title: 'Website chat widgets',
        description: 'FAQs, visitor assistance, and lead capture on your website.',
      },
      {
        title: 'WhatsApp & messaging bots',
        description: 'Customer conversations on WhatsApp and other supported channels.',
      },
      {
        title: 'Support automation',
        description: 'Common questions, order-status requests, and routing to human agents.',
      },
      {
        title: 'Lead qualification',
        description: 'Flows that identify customer needs and pass relevant details to sales.',
      },
      {
        title: 'Multilingual experiences',
        description: 'Where selected models and platforms support the required languages.',
      },
      {
        title: 'Analytics & integrations',
        description: 'Integrations with supported CRM and helpdesk tools.',
      },
    ],
    solutions: [
      {
        title: 'E-commerce',
        description: 'Product questions, order tracking, and returns guidance.',
        examples: ['Product Q&A', 'Order tracking', 'Returns guidance'],
      },
      {
        title: 'SaaS',
        description: 'Onboarding, feature help, and initial issue triage.',
        examples: ['Onboarding', 'Feature help', 'Issue triage'],
      },
      {
        title: 'Services and agencies',
        description: 'Lead capture, booking requests, and FAQs.',
        examples: ['Lead capture', 'Booking requests', 'FAQs'],
      },
      {
        title: 'Support teams',
        description: 'Common-question handling and request routing.',
        examples: ['Common questions', 'Request routing', 'Handoff'],
      },
    ],
    faqs: [
      {
        question: 'Which channels can you support?',
        answer:
          'We can build for websites, WhatsApp, and other channels or platforms where suitable integrations are available.',
      },
      {
        question: 'Can the bot use our business information?',
        answer:
          'Yes. It can be configured to use approved documents, FAQs, product details, and policies.',
      },
      {
        question: 'Can it transfer a conversation to a person?',
        answer:
          'Human handoff can be included where the channel and support workflow allow it.',
      },
      {
        question: 'How long does an MVP take?',
        answer:
          'A focused MVP may take a few weeks, depending on scope, integrations, and content readiness.',
      },
    ],
  },
  {
    slug: 'ai-agent',
    name: 'AI Agent Development',
    shortName: 'AI Agent Development',
    href: '/services/ai-agent',
    heroTitle: 'AI Agent Development',
    heroDescription:
      'AI agents that help carry out defined business tasks, from booking appointments and updating CRM records to coordinating multi-step workflows, with human oversight where needed.',
    overviewTitle: 'Agents that work with your systems and rules',
    overviewHighlight: 'your systems and rules',
    overviewDescription:
      'We build AI agents that use approved tools and APIs to work with your systems and follow defined business rules. Solutions can include permissions, validation, activity logs, and fallback paths appropriate to the workflow.',
    serviceName: 'AI Agent Development',
    hireSubject: 'AI Agent Developer',
    overviewItems: [
      {
        title: 'Booking & scheduling agents',
        description: 'Check availability and send confirmations through supported systems.',
      },
      {
        title: 'CRM agents',
        description: 'Create or update leads, notes, and deal stages with appropriate access.',
      },
      {
        title: 'Order-support workflows',
        description: 'Look up orders and initiate permitted actions, subject to business rules and approvals.',
      },
      {
        title: 'Multi-step workflows',
        description: 'Coordinate supported APIs and business applications.',
      },
      {
        title: 'Approvals & limits',
        description: 'Approval steps and limits for sensitive or high-impact actions.',
      },
      {
        title: 'Audit logs',
        description: 'Show the actions taken and tools used, where supported by the implementation.',
      },
    ],
    solutions: [
      {
        title: 'Operations',
        description: 'Data entry, status updates, and request routing.',
        examples: ['Data entry', 'Status updates', 'Request routing'],
      },
      {
        title: 'Sales and customer success',
        description: 'Lead updates, meeting scheduling, and follow-up preparation.',
        examples: ['Lead updates', 'Meeting scheduling', 'Follow-ups'],
      },
      {
        title: 'Support',
        description: 'Order enquiries and permitted account or plan workflows.',
        examples: ['Order enquiries', 'Account workflows', 'Plan changes'],
      },
      {
        title: 'Internal tools',
        description: 'Operations assistants and admin support.',
        examples: ['Ops assistants', 'Admin support', 'Internal helpers'],
      },
    ],
    faqs: [
      {
        question: 'How is an agent different from a chatbot?',
        answer:
          'A chatbot primarily handles conversation; an agent can also use tools and APIs to perform defined actions.',
      },
      {
        question: 'How are actions controlled?',
        answer:
          'Permissions, validation, limits, approvals, and logging can be built into the workflow. These controls reduce risk but do not eliminate it.',
      },
      {
        question: 'Which systems can agents connect to?',
        answer:
          'Integrations depend on the available APIs, permissions, and supported platforms.',
      },
      {
        question: 'Can our team maintain the solution?',
        answer:
          'We design for maintainability and can document the workflows and operational requirements.',
      },
    ],
  },
  {
    slug: 'llm-integration',
    name: 'LLM Integration (OpenAI, Claude, Gemini)',
    shortName: 'LLM Integration',
    href: '/services/llm-integration',
    heroTitle: 'LLM Integration (OpenAI, Claude, Gemini)',
    heroDescription:
      'Add AI features to your existing applications, including summarization, search, copilots, and smart workflows powered by OpenAI, Anthropic Claude, Google Gemini, and other suitable models.',
    overviewTitle: 'Integrate LLMs into applications you already run',
    overviewHighlight: 'applications you already run',
    overviewDescription:
      'We integrate large language models into web and mobile applications using server-side APIs, carefully designed prompts, evaluation, and cost controls—without requiring a full rewrite of your existing system.',
    serviceName: 'LLM Integration',
    hireSubject: 'LLM Integration Engineer',
    overviewItems: [
      {
        title: 'Model selection',
        description: 'Based on task requirements, quality, latency, cost, and provider capabilities.',
      },
      {
        title: 'In-app copilots',
        description: 'For dashboards, admin tools, and business applications.',
      },
      {
        title: 'Summarization & extraction',
        description: 'From documents, tickets, and email.',
      },
      {
        title: 'Server-side API integration',
        description: 'With appropriate key management, access controls, and rate limits.',
      },
      {
        title: 'Versioned prompts & evaluation',
        description: 'Checks to measure output quality before you ship changes.',
      },
      {
        title: 'Cost & latency optimization',
        description: 'Caching, model routing, and streaming where suitable.',
      },
    ],
    solutions: [
      {
        title: 'SaaS',
        description: 'Copilots, smart search, and draft generation.',
        examples: ['Copilots', 'Smart search', 'Draft generation'],
      },
      {
        title: 'Internal applications',
        description: 'Ticket assistance and document summaries.',
        examples: ['Ticket assistance', 'Doc summaries', 'Internal helpers'],
      },
      {
        title: 'Mobile apps',
        description: 'In-app assistance and supported speech-to-text features.',
        examples: ['In-app assist', 'Speech-to-text', 'Mobile AI'],
      },
      {
        title: 'Legacy systems',
        description: 'Adding AI capabilities through an API layer.',
        examples: ['API layer', 'Adapters', 'Gradual rollout'],
      },
    ],
    faqs: [
      {
        question: 'Which model providers do you work with?',
        answer:
          'We can work with OpenAI, Anthropic Claude, Google Gemini, and other providers when appropriate.',
      },
      {
        question: 'Do you need to rebuild our application?',
        answer:
          'Most integration projects add AI features to an existing application rather than replacing the whole system.',
      },
      {
        question: 'How is privacy handled?',
        answer:
          "Privacy depends on the provider's terms, data settings, system architecture, access controls, retention configuration, and applicable requirements. These should be reviewed for each project.",
      },
      {
        question: 'How can costs be controlled?',
        answer:
          'Model selection, usage limits, caching, routing, and monitoring can help manage cost. Actual costs depend on usage and provider pricing.',
      },
    ],
  },
  {
    slug: 'rag-knowledge-bots',
    name: 'RAG & Custom Knowledge Bots',
    shortName: 'RAG & Knowledge Bots',
    href: '/services/rag-knowledge-bots',
    heroTitle: 'RAG & Custom Knowledge Bots',
    heroDescription:
      "AI assistants that retrieve information from your company's documents, policies, manuals, wikis, and product data, with source citations where supported.",
    overviewTitle: 'Ground answers in your approved knowledge',
    overviewHighlight: 'your approved knowledge',
    overviewDescription:
      'We build retrieval-augmented generation (RAG) systems that index approved content, retrieve relevant information, and provide model-generated answers grounded in that context. Retrieval and citations can help reduce unsupported answers, but they do not guarantee that every response is correct.',
    serviceName: 'RAG & Custom Knowledge Bots',
    hireSubject: 'RAG / AI Engineer',
    overviewItems: [
      {
        title: 'Content ingestion',
        description: 'From supported sources such as PDFs, websites, document platforms, and custom systems.',
      },
      {
        title: 'Document processing',
        description: 'Chunking, indexing, and search ranking for your content types.',
      },
      {
        title: 'Cited answers',
        description: 'References to source documents where the source data and interface support citations.',
      },
      {
        title: 'Role-based access controls',
        description: 'Designed to limit retrieval to authorized content.',
      },
      {
        title: 'Refresh pipelines',
        description: 'Update indexed content when source documents change.',
      },
      {
        title: 'Evaluation & monitoring',
        description: 'Identify retrieval gaps and incorrect responses over time.',
      },
    ],
    solutions: [
      {
        title: 'Internal knowledge',
        description: 'HR, IT, sales enablement, and operations.',
        examples: ['HR', 'IT help', 'Sales enablement'],
      },
      {
        title: 'Customer support',
        description: 'Assistants that search approved help content.',
        examples: ['Help content', 'Support search', 'Onboarding'],
      },
      {
        title: 'Compliance workflows',
        description: 'Source-linked answers and reviewable information retrieval.',
        examples: ['Source links', 'Reviewable retrieval', 'Policy Q&A'],
      },
      {
        title: 'Enterprise search',
        description: 'Discovery across supported wikis, tickets, and files.',
        examples: ['Wikis', 'Tickets', 'Files'],
      },
    ],
    faqs: [
      {
        question: 'What is RAG?',
        answer:
          'RAG retrieves relevant information from a knowledge source and provides it to the model as context when generating an answer. It does not necessarily train or fine-tune the model.',
      },
      {
        question: 'Which content can be indexed?',
        answer:
          'Supported formats and connectors may include PDF, Word, HTML, Markdown, document platforms, and structured data, depending on the implementation.',
      },
      {
        question: 'Does RAG eliminate incorrect answers?',
        answer:
          'No. Better retrieval, citations, refusal behavior when evidence is missing, and ongoing evaluation can help reduce errors.',
      },
      {
        question: 'Can permissions be enforced?',
        answer:
          "Yes, when authorization is correctly implemented across ingestion, retrieval, and response generation. This must be tested against the client's access rules.",
      },
    ],
  },
  {
    slug: 'ai-workflow-automation',
    name: 'AI Workflow Automation',
    shortName: 'AI Workflow Automation',
    href: '/services/ai-workflow-automation',
    heroTitle: 'AI Workflow Automation',
    heroDescription:
      'Workflow automation using platforms such as n8n, Make, and Zapier, with optional AI steps to connect applications, move data, and reduce repetitive work.',
    overviewTitle: 'Connect your tools and reduce repetitive work',
    overviewHighlight: 'reduce repetitive work',
    overviewDescription:
      'We design and implement workflows that connect CRMs, email, spreadsheets, support tools, and AI services. The solution is selected according to your processes, integrations, hosting needs, maintenance requirements, and budget.',
    serviceName: 'AI Workflow Automation',
    hireSubject: 'Automation / n8n Developer',
    overviewItems: [
      {
        title: 'Workflow platform selection',
        description: 'Based on requirements and total operating cost.',
      },
      {
        title: 'AI-enhanced steps',
        description: 'Classification, summarization, extraction, and draft creation.',
      },
      {
        title: 'CRM & sales operations',
        description: 'Routing, enrichment, and follow-up workflows.',
      },
      {
        title: 'Support & operations sync',
        description: 'Triage, notifications, and status updates.',
      },
      {
        title: 'Custom API connectors',
        description: 'Where supported and appropriate for your systems.',
      },
      {
        title: 'Monitoring & error handling',
        description: 'Retries, logging, and alerts configured for the workflow.',
      },
    ],
    solutions: [
      {
        title: 'Marketing and sales',
        description: 'Form submissions to CRM, lead scoring, and team notifications.',
        examples: ['Form to CRM', 'Lead scoring', 'Notifications'],
      },
      {
        title: 'Support',
        description: 'Request triage, reply drafts, and escalation routing.',
        examples: ['Triage', 'Reply drafts', 'Escalation'],
      },
      {
        title: 'Finance and administration',
        description: 'Reminders, approvals, and spreadsheet synchronization.',
        examples: ['Reminders', 'Approvals', 'Sheet sync'],
      },
      {
        title: 'Product and engineering',
        description: 'Alert routing, changelog workflows, and issue synchronization.',
        examples: ['Alert routing', 'Changelog', 'Issue sync'],
      },
    ],
    faqs: [
      {
        question: 'Which platform should we use?',
        answer:
          'Zapier and Make can suit many managed automation needs; n8n may suit some self-hosted or customized setups. The best choice depends on complexity, hosting, integrations, maintenance, and cost.',
      },
      {
        question: 'Can workflows include AI?',
        answer:
          'Yes, where the chosen platform and model integration support the required task.',
      },
      {
        question: 'How are failures handled?',
        answer:
          'Workflows can use configured retries, error branches, logs, and alerts. Retry design must account for API limits and the risk of duplicate actions.',
      },
      {
        question: 'Can you migrate an existing workflow?',
        answer:
          'Migration may be possible after reviewing the current platform, integrations, data, and workflow behavior.',
      },
    ],
  },
  {
    slug: 'generative-ai',
    name: 'Generative AI App Development',
    shortName: 'Generative AI Apps',
    href: '/services/generative-ai',
    heroTitle: 'Generative AI App Development',
    heroDescription:
      'Custom content, image, and document-generation applications that help teams work faster with templates, brand guidance, and review workflows.',
    overviewTitle: 'Generative tools with templates and review built in',
    overviewHighlight: 'templates and review built in',
    overviewDescription:
      'We build generative AI applications for marketing, operations, and product teams—from content tools to document generators—with structured inputs, reusable templates, and review steps suited to the use case.',
    serviceName: 'Generative AI App Development',
    hireSubject: 'Generative AI Developer',
    overviewItems: [
      {
        title: 'Content tools',
        description: 'Blogs, ads, emails, and social posts using supplied brand guidelines.',
      },
      {
        title: 'Image-generation workflows',
        description: 'With review and version history where supported.',
      },
      {
        title: 'Document generators',
        description: 'Proposals, reports, and other business documents.',
      },
      {
        title: 'Template libraries',
        description: 'Reusable content structures for consistent outputs.',
      },
      {
        title: 'Human review workflows',
        description: 'Approval steps suited to your publishing process.',
      },
      {
        title: 'Usage limits & safeguards',
        description: 'Configurable safeguards and activity history where appropriate.',
      },
    ],
    solutions: [
      {
        title: 'Marketing',
        description: 'Ad copy, social content, and landing-page drafts.',
        examples: ['Ad copy', 'Social content', 'Landing drafts'],
      },
      {
        title: 'Sales enablement',
        description: 'Proposals, one-pagers, and customer materials.',
        examples: ['Proposals', 'One-pagers', 'Customer materials'],
      },
      {
        title: 'Product and design',
        description: 'Interface copy and concept imagery.',
        examples: ['UI copy', 'Concept imagery', 'Draft assets'],
      },
      {
        title: 'Operations',
        description: 'Standard operating procedures, reports, and client documents.',
        examples: ['SOPs', 'Reports', 'Client documents'],
      },
    ],
    faqs: [
      {
        question: 'Can outputs follow our brand voice?',
        answer:
          'Templates and brand guidelines can help make outputs more consistent, but human review may still be needed.',
      },
      {
        question: 'Can image generation be included?',
        answer:
          'Yes, where suitable models and integrations are available.',
      },
      {
        question: 'Who owns generated content?',
        answer:
          'Rights and permitted uses depend on applicable law, contracts, and the terms of the selected model provider. These terms should be reviewed for each project.',
      },
      {
        question: 'How is output quality managed?',
        answer:
          'Structured inputs, templates, evaluation examples, and optional approval steps can help improve consistency. Important legal or business documents should receive appropriate human review.',
      },
    ],
  },
  {
    slug: 'ai-voice-assistants',
    name: 'AI Voice Assistants',
    shortName: 'AI Voice Assistants',
    href: '/services/ai-voice-assistants',
    heroTitle: 'AI Voice Assistants',
    heroDescription:
      'Voice assistants that can answer calls, handle common enquiries, qualify callers, book appointments, and route complex requests to the right person.',
    overviewTitle: 'Voice solutions for inbound and outbound calls',
    overviewHighlight: 'inbound and outbound calls',
    overviewDescription:
      'We build voice solutions for inbound and, where permitted, outbound calls. Depending on the selected models and telephony integrations, they can support natural-language conversations, business workflows, CRM updates, and transfers to live agents.',
    serviceName: 'AI Voice Assistants',
    hireSubject: 'Voice AI Developer',
    overviewItems: [
      {
        title: 'Inbound call handling',
        description: 'Common questions and caller-intent detection.',
      },
      {
        title: 'Appointment booking',
        description: 'Through supported scheduling systems.',
      },
      {
        title: 'Lead qualification',
        description: 'Structured information capture for sales follow-up.',
      },
      {
        title: 'Conversational IVR',
        description: 'An alternative to fixed phone menus.',
      },
      {
        title: 'CRM & helpdesk integrations',
        description: 'Call notes, tickets, and records where supported.',
      },
      {
        title: 'Live-agent handoff',
        description: 'With relevant conversation context where supported.',
      },
    ],
    solutions: [
      {
        title: 'Clinics and professional services',
        description: 'Appointment enquiries and after-hours requests.',
        examples: ['Appointments', 'After-hours', 'Enquiries'],
      },
      {
        title: 'Support teams',
        description: 'Order-status enquiries, triage, and callback requests.',
        examples: ['Order status', 'Triage', 'Callbacks'],
      },
      {
        title: 'Sales teams',
        description: 'Initial qualification, demo scheduling, and CRM notes.',
        examples: ['Qualification', 'Demo scheduling', 'CRM notes'],
      },
      {
        title: 'Local businesses',
        description: 'Missed-call handling, FAQs, and call routing.',
        examples: ['Missed calls', 'FAQs', 'Call routing'],
      },
    ],
    faqs: [
      {
        question: 'Can callers speak to a person?',
        answer:
          'A transfer workflow can be included where the telephony platform supports it.',
      },
      {
        question: 'Which phone systems can you integrate?',
        answer:
          'Support depends on the telephony or contact-centre platform, its APIs, and the project requirements.',
      },
      {
        question: 'Will the assistant sound natural?',
        answer:
          'Conversation quality depends on the models, language, vocabulary, call quality, and latency. Performance should be tested for the intended users.',
      },
      {
        question: 'Are there compliance requirements?',
        answer:
          'Call recording, consent, outbound calling, and personal-data handling may be subject to local laws and platform rules. Requirements should be assessed for each deployment.',
      },
    ],
  },
  {
    slug: 'ai-consulting',
    name: 'AI Consulting & Integration',
    shortName: 'AI Consulting & Integration',
    href: '/services/ai-consulting',
    heroTitle: 'AI Consulting & Integration',
    heroDescription:
      'Practical AI guidance for businesses that need help choosing use cases, planning a roadmap, selecting models and vendors, and integrating AI into existing systems.',
    overviewTitle: 'Choose the right AI bets for your business',
    overviewHighlight: 'for your business',
    overviewDescription:
      'We help teams evaluate where AI may add measurable business value, define an appropriate technical approach, and plan solutions that fit their operations, data, budget, and internal capabilities.',
    serviceName: 'AI Consulting & Integration',
    hireSubject: 'AI Consultant',
    overviewItems: [
      {
        title: 'Use-case discovery',
        description: 'Stakeholder workshops to identify practical opportunities.',
      },
      {
        title: 'Roadmaps with measurable goals',
        description: 'Assumptions and success metrics you can track.',
      },
      {
        title: 'Architecture & vendor advice',
        description: 'Including build-versus-buy analysis.',
      },
      {
        title: 'Integration planning',
        description: 'For CRM, ERP, support, and product systems.',
      },
      {
        title: 'Pilot projects',
        description: 'Test feasibility and value before scaling.',
      },
      {
        title: 'Team enablement',
        description: 'Operational guidance after launch.',
      },
    ],
    solutions: [
      {
        title: 'Leadership',
        description: 'Discovery workshops, roadmaps, and investment planning.',
        examples: ['Workshops', 'Roadmaps', 'Investment planning'],
      },
      {
        title: 'Operations and support',
        description: 'Process reviews, pilots, and performance metrics.',
        examples: ['Process reviews', 'Pilots', 'KPIs'],
      },
      {
        title: 'Product teams',
        description: 'Feature briefs, technical designs, and evaluation plans.',
        examples: ['Feature briefs', 'Tech designs', 'Eval plans'],
      },
      {
        title: 'IT and security',
        description: 'Data-flow reviews, access models, and risk assessment.',
        examples: ['Data flows', 'Access models', 'Risk assessment'],
      },
    ],
    faqs: [
      {
        question: 'Can you help us decide where to start?',
        answer:
          'Yes. We can assess candidate use cases, feasibility, cost, risk, and measurable outcomes.',
      },
      {
        question: 'Do you only provide advice?',
        answer:
          'Engagements may include consulting, implementation, or both, depending on scope.',
      },
      {
        question: 'How long does discovery take?',
        answer:
          'A discovery and roadmap engagement may take a few weeks, depending on scope, stakeholder availability, and the information provided.',
      },
      {
        question: 'How do you select tools?',
        answer:
          'Recommendations should be based on the business problem, data, budget, security requirements, integration needs, and team capabilities—not novelty alone.',
      },
    ],
  },
];

export function getAiDevelopmentService(slug) {
  return AI_DEVELOPMENT_SERVICES.find((s) => s.slug === slug) ?? null;
}

export function getAiDevelopmentNavItems() {
  return AI_DEVELOPMENT_SERVICES.map((s) => ({
    name: s.shortName,
    href: s.href,
  }));
}
