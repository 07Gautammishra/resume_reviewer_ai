export const sampleDemoSections = {
  basics: {
    name: "Alex Mercer",
    title: "Senior Full Stack Engineer",
    location: "San Francisco, CA",
    email: "alex.mercer.dev@example.com",
    phone: "+1 (555) 382-9104",
    links: [
      { label: "GitHub", url: "https://github.com/alexmercer" },
      { label: "LinkedIn", url: "https://linkedin.com/in/alexmercer" },
    ],
  },
  summary:
    "High-impact Senior Full Stack Engineer with 6+ years of experience architecting distributed cloud systems, modern web platforms, and REST/GraphQL APIs. Proven track record of improving web performance, scaling database throughput, and mentoring engineering teams.",
  experience: [
    {
      company: "Apex Cloud Technologies",
      role: "Senior Full Stack Engineer",
      location: "San Francisco, CA",
      period: "2022 - Present",
      bullets: [
        "Architected real-time event analytics pipeline processing 45M+ daily messages with Node.js, Kafka, and Redis, lowering ingestion latency by 42%.",
        "Led frontend modernizations using React, Vite, and Tailwind CSS, improving Core Web Vitals (LCP from 3.4s to 0.9s) and elevating user retention by 18%.",
        "Refactored monolithic billing service into decoupled AWS microservices (ECS, SQS, RDS PostgreSQL), achieving 99.99% uptime and zero payment interruptions.",
        "Instituted comprehensive automated testing suite and CI/CD pipelines with GitHub Actions, reducing release cycle time from 5 days to 2 hours.",
      ],
    },
    {
      company: "Streamline Systems",
      role: "Full Stack Software Engineer",
      location: "Austin, TX",
      period: "2019 - 2022",
      bullets: [
        "Developed high-throughput customer management dashboards serving 350K+ active users using React, Node.js, Express, and PostgreSQL.",
        "Implemented multi-layer Redis caching strategy, reducing database server loads by 55% during peak traffic windows.",
        "Partnered with product managers and UX designers to build accessible, WCAG AA compliant design system components.",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      period: "2015 - 2019",
      details: "Graduated with Honors · Magna Cum Laude · Coursework in Distributed Systems & Data Structures",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Next.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS (ECS, S3, RDS)",
    "GraphQL",
    "REST APIs",
    "Tailwind CSS",
    "Jest",
    "CI/CD (GitHub Actions)",
    "Git",
  ],
  projects: [
    {
      name: "CloudMetrics Dashboard",
      description:
        "Open-source monitoring tool for Docker cluster health with live WebSocket streaming and automated alerting.",
      tech: ["TypeScript", "React", "Node.js", "Redis", "Docker"],
      links: "https://github.com/alexmercer/cloudmetrics",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      year: "2023",
    },
  ],
  languages: ["English (Native)", "Spanish (Conversational)"],
  interests: ["Distributed Systems", "Open Source Contributing", "Tech Mentorship"],
};
