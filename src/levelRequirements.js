// Career level requirements, transcribed from the CGI career-level matrix
// screenshots. Keyed by career level number. Each level maps to a job code
// (job family) and the five assessment dimensions.
//
// A dimension item is either a plain string (a bullet) or
// { sub: 'heading', items: ['bullet', ...] } for the conditional blocks
// ("If responsible for a team" / "If individual contributor").

export const LEVEL_REQUIREMENTS = {
  4: {
    jobCode: 'Consultant',
    jobCodeNote: 'Consulting is part of the role',
    dimensions: [
      {
        name: 'Level of impact',
        items: [
          'Completes assigned tasks.',
          'Applies knowledge and improves own efficiency and quality.',
        ],
      },
      {
        name: 'Capabilities',
        items: [
          'Uses interpersonal and functional skills.',
          'Demonstrates an organized approach to work and informs supervisor of progress or issues.',
          'Demonstrates self-awareness and the impact on others.',
          'Learns new skills and applies newly acquired knowledge.',
          "Understands CGI's performance indicators and the rationale behind them.",
          'Knows contractual commitments and objectives of their own assignment.',
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Works on problems of unambiguous scope.',
          'Follows standard practices and procedures in analyzing situations or data from which answers can be readily obtained.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Builds basic relationships with internal and external stakeholders relevant for own assignment.',
          'Assists in determining client needs, drafting solutions, and supports initial assessment of client requests, including feasibility and cost/benefit analysis.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Receives detailed instructions, guidance and direction from others with an expectation of increasing independence.',
        ],
      },
    ],
  },

  5: {
    jobCode: 'Consultant',
    jobCodeNote: 'Consulting is part of the role',
    dimensions: [
      {
        name: 'Level of impact',
        items: ['Contributes to team goals.'],
      },
      {
        name: 'Capabilities',
        items: [
          'Develops professional expertise.',
          'Demonstrates a rational and organized approach to work and is able to handle change.',
          'Understands and uses appropriate methods, tools and applications.',
          'Plans, schedules and monitors own work for shorter periods.',
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Works on problems of moderate scope where analysis of situations or data requires a review of a variety of factors.',
          'Exercises judgment within defined procedures and practices to determine appropriate action.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Builds productive internal/external relationships.',
          'Interacts with clients to resolve problems, keeps them informed, discusses issues with supervisors, and performs feasibility and cost/benefit analysis.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Receives a moderate level of guidance, general instructions on routine work, detailed instructions on new projects or assignments.',
        ],
      },
    ],
  },

  6: {
    jobCode: 'Consultant',
    jobCodeNote: 'Consulting is part of the role',
    dimensions: [
      {
        name: 'Level of impact',
        items: ['Begins to influence team practices.'],
      },
      {
        name: 'Capabilities',
        items: [
          'Proactively maintains and updates own professional skills.',
          'Demonstrates an analytical and systematic approach to problem solving.',
          'Identifies opportunities for improvement (e.g. productivity, margin, etc.) of own assignment.',
          'Plans, schedules and monitors own work (and that of others where applicable) competently within limited deadlines and according to relevant legislation and procedures.',
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Works on problems of diverse scope where analysis of data requires evaluation of identifiable factors.',
          'Demonstrates good judgement in selecting methods and techniques for obtaining solutions and proactively proposes product/process/solution improvements.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Networks with senior internal and external relations in own area of expertise.',
          'Determines and documents client requirements effectively.',
          'Develops appropriate and effective solutions, identifies trends, seeks sales opportunities and markets business solutions.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Receives minimal guidance on day-to-day work, general instructions on new assignments. Works independently.',
        ],
      },
    ],
  },

  7: {
    jobCode: 'Senior Consultant',
    jobCodeNote: 'Focus beyond own assignment',
    dimensions: [
      {
        name: 'Level of impact',
        items: ['Provides expertise; improves team/project performance.'],
      },
      {
        name: 'Capabilities',
        items: [
          'Applies professional concepts to address moderately complex issues in alignment with team/assignment objectives.',
          'Plans and monitors own work to meet time and quality expectations, adhering to relevant procedures and regulations.',
          'Communicates (technical) information clearly to peers and (non-technical) stakeholders.',
          'Contributes to effective team dynamics, understanding the role they play.',
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Analyzes moderately complex issues.',
          'Evaluates diverse data and situations using established methods; identifies patterns and implications.',
          'Exercises informed judgment.',
          'Selects appropriate techniques and criteria based on experience and best practices.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Networks and actively collaborates outside own area, engaging with relevant contacts in other functions, inside CGI and at the client to gather insights and validate approaches.',
          'Effectively conducts structured analysis using established tools and methodologies; supports decision-making with data-driven insights.',
          'Considers client requirements and impact when preparing proposals.',
          'Demonstrates ability to synthesize analysis into actionable recommendations and evaluate trade-offs and risks. Effectively collaborates with stakeholders to address client needs, facilitate discussions, align solutions with client goals, and drive consensus across diverse stakeholder groups.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Works mainly independently.',
          'Manages tasks and responsibilities with minimal supervision; seeks guidance primarily for complex or unfamiliar challenges.',
          'Shares knowledge and provides informal support or advice when approached.',
        ],
      },
    ],
  },

  8: {
    jobCode: 'Senior Consultant',
    jobCodeNote: 'Focus beyond own assignment',
    dimensions: [
      {
        name: 'Level of impact',
        items: ['Coordinates efforts; impact on team/project outcomes.'],
      },
      {
        name: 'Capabilities',
        items: [
          'Applies professional concepts independently and creatively to solve a variety of complex issues, demonstrating strong judgment and initiative, and often influencing and coordinating activities beyond the immediate team.',
          'Advises on established standards, methods, tools, and applications within own area of specialization, making appropriate choices from known alternatives, also considering financial impacts, both for clients and CGI.',
          'Analyses, designs, and executes work to meet defined time, cost, and quality targets, also when these change.',
          'Delivers tailored solutions within known framework, with focus on execution and delivery quality.',
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Leads defined engagements with moderate complexity, applying established methodologies and leads to contributes to significant issues.',
          'Tackles problems that involve intangible factors such as stakeholder interests, organizational dynamics, or market trends.',
          'Applies independent judgment, considering different perspectives and views.',
          'Selects appropriate methods and techniques based on experience; adapts evaluation criteria to suit complex contexts.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Builds relevant and effective networks across CGI to support collaboration and shared goals and creates lasting relationships in the market.',
          'Demonstrates the ability to actively seek information to fill gaps and effectively synthesizes data from multiple, often disparate or informal sources (e.g. meetings, client feedback, metrics) to form a complete picture of a business process or problem.',
          'Facilitates collaboration among stakeholders with differing objectives.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Manages tasks and responsibilities independently in a complex environment; trusted to deliver high-quality outcomes.',
          'Seeks only guidance for highly complex or unfamiliar challenges.',
          'Mentors junior colleagues informally.',
          'Shares expertise and provides guidance when approached; supports others in developing skills and confidence.',
        ],
      },
    ],
  },

  9: {
    jobCode: 'Senior Consultant',
    jobCodeNote: 'Focus beyond own assignment',
    dimensions: [
      {
        name: 'Level of impact',
        items: [
          'Drives team/project performance and development.',
          'Works across teams; influences broader processes and outcomes.',
        ],
      },
      {
        name: 'Capabilities',
        items: [
          'Applies professional concepts strategically to resolve complex issues in creative and effective ways, contributing to broader organizational goals.',
          'Provides expert guidance on standards, methods, tools, and applications, influencing decisions across teams and projects. Leads operational improvement initiatives by identifying opportunities and advising on strategic options.',
          'Recognized by colleagues as an expert in a specific domain or industry.',
          'Effectively presents and adapts complex technical information for diverse audiences, including senior stakeholders.',
          'Drives effective collaboration across diverse stakeholder groups, resolving conflicts, managing interpersonal relations and aligning objectives.',
          'Acts as the gate keeper for contract agreements.',
          'Independently plans, schedules, and oversees workstreams to meet ambitious time and quality targets, ensuring compliance with relevant legislation and organizational procedures.',
          'Leads complex analysis, diagnosis, planning, execution, and evaluation of work, consistently achieving strategic time, cost, and quality goals.',
          'Champions continuous learning and capability development within the organization.',
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Leads resolution of high-stakes issues related to the assignment.',
          'Develops and adapts methods and criteria to suit complex, evolving contexts.',
          'Exercises expert-level judgment.',
          'Effectively manages more complex consulting assignments, while overseeing multifaceted engagements with strategic importance, navigating ambiguity and change.',
          'Leads resolution of high impact and sensitive issues related to the assignment.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Builds strategic relationships across the organization and industry and influences through cross-functional networks.',
          'Coordinates across multiple groups, functions, or external partners.',
          'Anticipates client needs and integrates innovative, tailored solutions into proposals.',
          'Demonstrates to be able to integrate complex, high-volume internal data with external intelligence to identify ambiguous signals and opportunities for innovation.',
          'Promotes integrated technical and process solutions and designs innovative, scalable solutions, aligning with client strategy and business goals.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Works independently in complex environments across complex workstreams; trusted to make sound decisions in ambiguous situations.',
          'Leads initiatives and solves problems, even in high-pressure situations.',
          'Proactively mentors and guides others.',
          'Serves as a go-to expert; actively supports development of junior colleagues through structured coaching and knowledge sharing.',
          'Is a role model for others / sets standards for excellence; contributes to team growth and capability development.',
        ],
      },
    ],
  },

  10: {
    jobCode: 'Manager',
    jobCodeNote: 'First time accountable for delivery',
    dimensions: [
      {
        name: 'Level of impact',
        items: [
          'Manages day to day operations; ensures delivery of team or unit objectives.',
          'Proactively drives effective collaboration across functional teams and diverse stakeholders to align team/project goals and efficiently resolve inter-team dependencies or conflicts.',
        ],
      },
      {
        name: 'Capabilities',
        items: [
          {
            sub: 'If responsible for a team',
            items: [
              'Oversees day-to-day operations and executes short-term functional strategy.',
              'Responsibilities typically include policy and strategy implementation for short-term results.',
              'Recruits, selects, on-boards, manages performance achievement and development of team members.',
            ],
          },
          {
            sub: 'If individual contributor',
            items: [
              'Applies advanced professional concepts and methodology, independently diagnoses and resolves complex, non-routine issues, proactively anticipating roadblocks and developing creative, effective solutions.',
              'Establishes and champions best practices, methods, and tools within functional area, guiding peers and ensuring quality standards are maintained. Identifies and qualifies new leads or prospects within established parameters and defined territories/markets in cooperation with client relationship owning leaders.',
              'Actively participates in discovery meetings and proposal creation, providing accurate technical or functional content relevant to their area of expertise.',
            ],
          },
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Handles difficult to moderately complex problems.',
          "Translates the BU or function's strategy into actionable steps and monitorable targets for the team.",
          'Effectively manages communications, expectations, and conflict resolution across internal and external stakeholders.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Engages with senior leadership, team, clients and CGI Partners for any escalations, problem solving and process improvements.',
          'Anticipates client needs and designs and integrates solutions into project delivery.',
          'Demonstrates the ability to identify systemic operational inefficiencies and develops data-backed proposals for process improvements that impact team or organizational performance.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Operates autonomously, requiring guidance only on issues of exceptional complexity or those involving significant cross-functional risk.',
          'Drives outcomes on projects and tasks, exercising sound judgment to resolve routine and non-routine issues and escalating only ambiguous or precedent-setting situations to senior leadership.',
          'Exhibits mature decision-making, and seeking input strategically rather than procedurally.',
          'Acts as a key technical resource and formal/informal coach, proactively mentoring less experienced colleagues.',
          'Shares expertise effectively, providing constructive feedback and guiding junior team members.',
        ],
      },
    ],
  },

  11: {
    jobCode: 'Director',
    jobCodeNote: 'Setting direction',
    dimensions: [
      {
        name: 'Level of impact',
        items: [
          'Shapes strategy for own team, aligned with organizational goals and BU/functional priorities.',
          'Builds a constructive team environment and actively drives improvements and innovation to enhance team/functional performance.',
          'Drives cross-team alignment, influences cross-functional priorities and ensures strategic coherence across departments.',
        ],
      },
      {
        name: 'Capabilities',
        items: [
          {
            sub: 'If responsible for a team',
            items: [
              'Leads a team as defined in the Management Foundation.',
              "Oversees day-to-day operations, sets the direction for team members, provides clear guidance and sets priorities, based on CGI's business goals and metrics.",
              'Anticipates future needs, and drives operational direction.',
            ],
          },
          {
            sub: 'If individual contributor',
            items: [
              'Recognized internally and externally as an expert and thought leader in a professional discipline, setting direction for this discipline internally and externally.',
              'Develops, implements, and champions transformational improvements (new products, processes, or standards) that redefine business offerings.',
              'Communicates and engages with senior leadership, providing expert insights and recommendations to influence decisions and strategic priorities and actively contributes to business development.',
            ],
          },
        ],
      },
      {
        name: 'Job Complexity',
        items: [
          'Handles complex and multi-dimensional problems, including issues that span multiple domains or functions and require significant collaboration.',
          'Leads the resolution of highly complex, ambiguous problems that are strategic and have long-term implications within the organization.',
          'Conducts thorough investigation and analysis by applying structured problem-solving techniques and using data and stakeholder input to inform decisions.',
          'Effectively navigates ambiguity and manages change within their context. Translates strategy into actionable change approach for their team, focusing on successful execution and stabilizing the team during transitions.',
        ],
      },
      {
        name: 'Stakeholder engagement',
        items: [
          'Maintains and enhances network of decision makers at appropriate level within CGI and in the market.',
          'Persuades peers, cross-functional teams, and stakeholders to adopt new practices and approaches through expertise, credibility, and collaboration.',
          'Demonstrates to be effective in engaging with senior leaders to shape strategic direction and present compelling business cases and insights.',
          'Tailors messaging to different audiences to ensure alignment and buy-in for initiatives.',
          'Effectively leverages consultative selling techniques to increase the value, scope, and longevity of existing client relationships by actively identifying and capitalizing on new revenue opportunities within the client\'s organization.',
        ],
      },
      {
        name: 'Level of autonomy',
        items: [
          'Works and operates with autonomy.',
          'Manages responsibilities and navigates complexity independently, seeking guidance in unprecedented situations.',
        ],
      },
    ],
  },
}

export function requirementsForLevel(level) {
  const lvl = Number(level)
  if (!lvl) return null
  return LEVEL_REQUIREMENTS[lvl] || null
}
