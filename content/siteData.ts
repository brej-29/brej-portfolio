export interface Profile {
  name: string
  headline: string
  summaryBullets: string[]
  location: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Skill {
  name: string
  category: string
  icon?: string
}

export interface FeaturedProject {
  title: string
  summary: string
  tags: string[]
  stack: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Project {
  id: string
  title: string
  oneLine: string
  description: string
  tags: string[]
  stack: string[]
  links: {
    github?: string
    demo?: string
  }
  highlights: string[]
  date: string
}

export interface Experience {
  company: string
  role: string
  dates: string
  location: string
  bullets: string[]
  techStack: string[]
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  credentialUrl?: string
  skillsTags: string[]
}

export interface Contact {
  email: string
  location: string
  availability: string
  socials: SocialLink[]
}

export const profile: Profile = {
  name: "Javi A. Torres",
  headline: "Software Engineer",
  summaryBullets: [
    "Built scalable cloud applications serving 100K+ users",
    "Specialized in ML/AI solutions and data-driven insights",
    "Delivered enterprise solutions at Accenture & startups",
  ],
  location: "San Francisco, CA",
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/yourusername", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "linkedin" },
  { name: "Email", url: "mailto:your.email@example.com", icon: "mail" },
  { name: "Twitter", url: "https://twitter.com/yourusername", icon: "twitter" },
]

export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "TensorFlow", category: "ML/AI" },
  { name: "PyTorch", category: "ML/AI" },
  { name: "scikit-learn", category: "ML/AI" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Stripe", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Redis", category: "Backend" },
  { name: "Chart.js", category: "Frontend" },
  { name: "WebSocket", category: "Backend" },
  { name: "HIPAA", category: "Security" },
]

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "TensorFlow",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Node.js",
  "Tailwind CSS",
]

export const featuredProjects: FeaturedProject[] = [
  {
    title: "AI-Powered Analytics Dashboard",
    summary:
      "Built a real-time analytics platform with ML-based insights for enterprise clients. Reduced data processing time by 60%.",
    tags: ["Featured", "Enterprise"],
    stack: ["React", "Python", "TensorFlow", "AWS"],
    githubUrl: "https://github.com/yourusername/project1",
    liveUrl: "https://project1.demo.com",
  },
  {
    title: "E-Commerce Platform with Personalization",
    summary:
      "Developed a full-stack e-commerce solution with AI-driven product recommendations. Increased conversion rates by 35%.",
    tags: ["Full-Stack", "ML"],
    stack: ["Next.js", "Node.js", "MongoDB", "scikit-learn"],
    githubUrl: "https://github.com/yourusername/project2",
    liveUrl: "https://project2.demo.com",
  },
  {
    title: "Predictive Maintenance System",
    summary: "Created an IoT-based predictive maintenance system for manufacturing. Reduced downtime by 40%.",
    tags: ["IoT", "Data Science"],
    stack: ["Python", "PyTorch", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/yourusername/project3",
  },
]

export const projects: Project[] = [
  {
    id: "project-1",
    title: "AI-Powered Analytics Dashboard",
    oneLine: "Real-time analytics platform with ML-based insights",
    description:
      "Built a comprehensive real-time analytics platform that processes millions of data points daily. Implemented machine learning models for predictive insights and anomaly detection. Reduced data processing time by 60% through optimized pipelines and caching strategies.",
    tags: ["Featured", "Enterprise", "ML/AI"],
    stack: ["React", "Python", "TensorFlow", "AWS", "PostgreSQL"],
    links: {
      github: "https://github.com/yourusername/analytics-dashboard",
      demo: "https://analytics-demo.com",
    },
    highlights: [
      "Reduced data processing time by 60%",
      "Handles 5M+ data points daily",
      "Real-time ML predictions with 92% accuracy",
      "Deployed across 50+ enterprise clients",
    ],
    date: "2024-11",
  },
  {
    id: "project-2",
    title: "E-Commerce Platform with Personalization",
    oneLine: "Full-stack e-commerce with AI-driven recommendations",
    description:
      "Developed a scalable e-commerce solution featuring AI-powered product recommendations, real-time inventory management, and seamless payment integration. Implemented collaborative filtering algorithms that increased conversion rates by 35%.",
    tags: ["Full-Stack", "ML", "E-Commerce"],
    stack: ["Next.js", "Node.js", "MongoDB", "Stripe", "scikit-learn"],
    links: {
      github: "https://github.com/yourusername/ecommerce-platform",
      demo: "https://shop-demo.com",
    },
    highlights: [
      "35% increase in conversion rates",
      "Personalized recommendations for 100K+ users",
      "Seamless payment processing with Stripe",
      "Mobile-first responsive design",
    ],
    date: "2024-09",
  },
  {
    id: "project-3",
    title: "Predictive Maintenance System",
    oneLine: "IoT-based system for manufacturing predictive maintenance",
    description:
      "Created an IoT-based predictive maintenance system that monitors equipment health in real-time. Utilized deep learning models to predict failures before they occur, reducing downtime by 40% and saving $2M+ annually.",
    tags: ["IoT", "Data Science", "Enterprise"],
    stack: ["Python", "PyTorch", "PostgreSQL", "Docker", "MQTT"],
    links: {
      github: "https://github.com/yourusername/predictive-maintenance",
    },
    highlights: [
      "40% reduction in equipment downtime",
      "$2M+ annual cost savings",
      "Real-time monitoring of 200+ sensors",
      "Predictive accuracy of 89%",
    ],
    date: "2024-06",
  },
  {
    id: "project-4",
    title: "Social Media Analytics Tool",
    oneLine: "Track and analyze social media performance across platforms",
    description:
      "Built a comprehensive social media analytics tool that aggregates data from multiple platforms. Features sentiment analysis, engagement tracking, and automated reporting. Helps brands make data-driven marketing decisions.",
    tags: ["Analytics", "SaaS", "API Integration"],
    stack: ["Next.js", "Python", "FastAPI", "Redis", "Chart.js"],
    links: {
      github: "https://github.com/yourusername/social-analytics",
      demo: "https://social-analytics-demo.com",
    },
    highlights: [
      "Supports 5+ social platforms",
      "Real-time sentiment analysis",
      "Automated weekly reports",
      "Used by 500+ marketing teams",
    ],
    date: "2024-03",
  },
  {
    id: "project-5",
    title: "Real-Time Collaboration Workspace",
    oneLine: "Team collaboration platform with real-time editing",
    description:
      "Developed a real-time collaboration workspace similar to Notion/Figma. Features include live document editing, commenting, version history, and team management. Built with WebSockets for instant synchronization.",
    tags: ["Real-Time", "Full-Stack", "Collaboration"],
    stack: ["React", "Node.js", "WebSocket", "PostgreSQL", "Redis"],
    links: {
      github: "https://github.com/yourusername/collab-workspace",
      demo: "https://workspace-demo.com",
    },
    highlights: [
      "Real-time collaboration for unlimited users",
      "WebSocket-based instant sync",
      "Version control and conflict resolution",
      "Rich text editor with blocks",
    ],
    date: "2024-01",
  },
  {
    id: "project-6",
    title: "Healthcare Patient Portal",
    oneLine: "Secure patient portal for healthcare providers",
    description:
      "Built a HIPAA-compliant patient portal for healthcare providers. Features include appointment scheduling, secure messaging, prescription refills, and medical records access. Improved patient engagement by 50%.",
    tags: ["Healthcare", "Security", "Enterprise"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS", "HIPAA"],
    links: {},
    highlights: [
      "HIPAA-compliant security",
      "50% increase in patient engagement",
      "Integrated with 3 EHR systems",
      "Mobile app for iOS and Android",
    ],
    date: "2023-11",
  },
]

export const experience: Experience[] = [
  {
    company: "Accenture",
    role: "Full Stack Developer",
    dates: "Jan 2023 - Present",
    location: "San Francisco, CA",
    bullets: [
      "Led development of enterprise-scale web applications for Fortune 500 clients, serving 100K+ active users",
      "Architected and implemented microservices infrastructure using Node.js, Docker, and Kubernetes, improving system reliability by 45%",
      "Mentored team of 5 junior developers on React, TypeScript, and cloud deployment best practices",
      "Reduced application load time by 60% through code optimization and implementing advanced caching strategies",
    ],
    techStack: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
  },
  {
    company: "TechStart Inc.",
    role: "Data Science Engineer",
    dates: "Jun 2022 - Dec 2022",
    location: "Remote",
    bullets: [
      "Built machine learning models for customer churn prediction, achieving 88% accuracy and reducing churn by 25%",
      "Developed data pipelines processing 10M+ records daily using Python, Apache Spark, and AWS services",
      "Created interactive dashboards with Plotly and Streamlit for stakeholder presentations and real-time monitoring",
      "Collaborated with product team to integrate ML models into production applications via REST APIs",
    ],
    techStack: ["Python", "TensorFlow", "Spark", "AWS", "PostgreSQL", "Streamlit"],
  },
  {
    company: "Digital Solutions Co.",
    role: "Junior Full Stack Developer",
    dates: "Aug 2021 - May 2022",
    location: "New York, NY",
    bullets: [
      "Developed responsive web applications using React, Next.js, and Tailwind CSS for multiple client projects",
      "Implemented RESTful APIs with Express.js and MongoDB, handling 50K+ daily requests",
      "Participated in code reviews and agile development processes, improving code quality and team velocity",
      "Deployed and maintained applications on Vercel and AWS, ensuring 99.9% uptime",
    ],
    techStack: ["React", "Next.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
]

export const certificates: Certificate[] = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2024-08",
    credentialUrl: "https://aws.amazon.com/certification/verify",
    skillsTags: ["Cloud", "AWS", "Architecture", "DevOps"],
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera (Stanford University)",
    date: "2024-05",
    credentialUrl: "https://coursera.org/verify/specialization",
    skillsTags: ["ML/AI", "Python", "TensorFlow", "Data Science"],
  },
  {
    title: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    date: "2024-03",
    credentialUrl: "https://scrum.org/certificates",
    skillsTags: ["Agile", "Scrum", "Project Management"],
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (via Coursera)",
    date: "2023-12",
    credentialUrl: "https://coursera.org/verify/professional-cert",
    skillsTags: ["React", "JavaScript", "Frontend", "UX/UI"],
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google (via Coursera)",
    date: "2023-09",
    credentialUrl: "https://coursera.org/verify/professional-cert",
    skillsTags: ["Data Analysis", "SQL", "Tableau", "Statistics"],
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2023-06",
    credentialUrl: "https://docker.com/certification",
    skillsTags: ["Docker", "Containers", "DevOps", "Kubernetes"],
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2023-04",
    credentialUrl: "https://university.mongodb.com/certification",
    skillsTags: ["MongoDB", "Database", "NoSQL", "Backend"],
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google (TensorFlow)",
    date: "2023-02",
    credentialUrl: "https://tensorflow.org/certificate",
    skillsTags: ["TensorFlow", "Deep Learning", "ML/AI", "Python"],
  },
]

export const contact: Contact = {
  email: "your.email@example.com",
  location: "San Francisco, CA",
  availability: "Available for full-time opportunities",
  socials: [
    { name: "GitHub", url: "https://github.com/yourusername", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/yourusername", icon: "twitter" },
  ],
}

export const experienceStats = [
  { label: "Years Experience", value: "3+", description: "Full-stack & Data Science" },
  { label: "Enterprise Projects", value: "15+", description: "At Accenture & clients" },
  { label: "Tech Stack", value: "20+", description: "Technologies mastered" },
]
