export function buildEngagementModels(roleShort, roleLong = roleShort) {
  return [
    {
      icon: 'UserCheck',
      label: 'Dedicated team',
      title: `Dedicated ${roleLong}`,
      description: `One developer joins your team full time — your standups, repo, and tools, like an in-house hire without the recruiting cycle.`,
      points: [
        'Exclusive focus on your product',
        'Aligned to your timezone & stack',
        'Ideal for long-term roadmap work',
      ],
      bestFor: 'Product teams scaling headcount or filling a permanent role',
    },
    {
      icon: 'Clock',
      label: 'Flexible capacity',
      title: 'Hourly / Part-time',
      description: `Senior ${roleShort} support when you need it — extra hands for sprints, reviews, audits, or coverage between full-time hires.`,
      points: [
        'Hours that flex with your workload',
        'No long-term commitment required',
        'Easy to scale up or wind down',
      ],
      bestFor: 'Short bursts of work or testing fit before a full-time hire',
    },
    {
      icon: 'FileCheck',
      label: 'Scoped delivery',
      title: 'Project-based',
      description: `A defined ${roleShort} engagement with agreed milestones, deliverables, and timeline — we staff and manage delivery end to end.`,
      points: [
        'Clear scope and milestone plan',
        'Single point of contact',
        'Outcome-focused from kickoff to handoff',
      ],
      bestFor: 'MVPs, module rebuilds, and integrations with a fixed deadline',
    },
  ];
}

export function buildProcessSteps(roleName) {
  return [
    {
      title: 'Share Your Requirements',
      description: `Tell us about your project, tech stack, team structure, and timeline. We align on the skills and seniority level you need before shortlisting ${roleName} candidates.`,
    },
    {
      title: 'Interview & Select Your Developer',
      description: `Review pre-vetted ${roleName} developers, run interviews at your pace, and choose the engineer who fits your codebase standards and team culture.`,
    },
    {
      title: 'Onboard & Start Building',
      description:
        'Your developer integrates into your workflow within 48–72 hours — joining your sprints, tools, and communication channels from day one.',
    },
  ];
}
