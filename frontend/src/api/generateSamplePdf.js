import { jsPDF } from "jspdf";

export function generateSamplePdf() {
  const doc = new jsPDF({
    unit: "pt",
    format: "letter",
  });

  const margin = 40;
  const pageWidth = 612;
  const maxWidth = pageWidth - margin * 2;
  let y = 50;

  function checkPage(needed = 20) {
    if (y + needed > 740) {
      doc.addPage();
      y = 50;
    }
  }

  // Name & Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(20, 24, 30);
  doc.text("Alex Mercer", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(47, 74, 58);
  doc.text("Senior Full Stack Engineer", margin, y);
  y += 18;

  // Contact
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 110);
  doc.text(
    "San Francisco, CA  |  alex.mercer.dev@example.com  |  +1 (555) 382-9104  |  github.com/alexmercer  |  linkedin.com/in/alexmercer",
    margin,
    y
  );
  y += 20;

  // Horizontal divider
  doc.setDrawColor(215, 220, 225);
  doc.line(margin, y, margin + maxWidth, y);
  y += 18;

  function sectionHeader(title) {
    checkPage(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(47, 74, 58);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(215, 220, 225);
    doc.line(margin, y, margin + maxWidth, y);
    y += 14;
  }

  // Summary
  sectionHeader("Professional Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 35, 42);
  const summaryText =
    "High-impact Senior Full Stack Engineer with 6+ years of experience architecting distributed cloud systems, modern web platforms, and REST/GraphQL APIs. Proven track record of improving web performance, scaling database throughput, and mentoring engineering teams.";
  const summaryLines = doc.splitTextToSize(summaryText, maxWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 13 + 12;

  // Experience
  sectionHeader("Experience");

  // Job 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 24, 30);
  doc.text("Senior Full Stack Engineer — Apex Cloud Technologies", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 110);
  doc.text("San Francisco, CA  |  2022 - Present", margin + maxWidth, y, { align: "right" });
  y += 14;

  const job1Bullets = [
    "Architected real-time event analytics pipeline processing 45M+ daily messages with Node.js, Kafka, and Redis, lowering ingestion latency by 42%.",
    "Led frontend modernizations using React, Vite, and Tailwind CSS, improving Core Web Vitals (LCP from 3.4s to 0.9s) and elevating user retention by 18%.",
    "Refactored monolithic billing service into decoupled AWS microservices (ECS, SQS, RDS PostgreSQL), achieving 99.99% uptime and zero payment interruptions.",
    "Instituted comprehensive automated testing suite and CI/CD pipelines with GitHub Actions, reducing release cycle time from 5 days to 2 hours.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(35, 40, 48);
  for (const b of job1Bullets) {
    checkPage(24);
    const split = doc.splitTextToSize(`•  ${b}`, maxWidth - 10);
    doc.text(split, margin + 5, y);
    y += split.length * 12 + 3;
  }
  y += 8;

  // Job 2
  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 24, 30);
  doc.text("Full Stack Software Engineer — Streamline Systems", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 110);
  doc.text("Austin, TX  |  2019 - 2022", margin + maxWidth, y, { align: "right" });
  y += 14;

  const job2Bullets = [
    "Developed high-throughput customer management dashboards serving 350K+ active users using React, Node.js, Express, and PostgreSQL.",
    "Implemented multi-layer Redis caching strategy, reducing database server loads by 55% during peak traffic windows.",
    "Partnered with product managers and UX designers to build accessible, WCAG AA compliant design system components.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(35, 40, 48);
  for (const b of job2Bullets) {
    checkPage(24);
    const split = doc.splitTextToSize(`•  ${b}`, maxWidth - 10);
    doc.text(split, margin + 5, y);
    y += split.length * 12 + 3;
  }
  y += 12;

  // Education
  sectionHeader("Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 24, 30);
  doc.text("B.S. in Computer Science — University of California, Berkeley", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 110);
  doc.text("2015 - 2019", margin + maxWidth, y, { align: "right" });
  y += 12;
  doc.text("Graduated with Honors · Magna Cum Laude · Coursework in Distributed Systems & Data Structures", margin, y);
  y += 18;

  // Skills
  sectionHeader("Technical Skills");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(35, 40, 48);
  const skillsText =
    "Languages & Frameworks: JavaScript, TypeScript, React, Node.js, Express, Next.js, HTML5, CSS3, Tailwind CSS\nDatabases & Cloud: PostgreSQL, MongoDB, Redis, AWS (ECS, S3, RDS), Docker, Kafka\nTooling & Practices: GraphQL, REST APIs, Jest, Git, CI/CD (GitHub Actions), Microservices Architecture";
  const skillLines = doc.splitTextToSize(skillsText, maxWidth);
  doc.text(skillLines, margin, y);
  y += skillLines.length * 12 + 12;

  // Projects
  sectionHeader("Projects");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 24, 30);
  doc.text("CloudMetrics Dashboard", margin, y);
  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(35, 40, 48);
  const projDesc =
    "Open-source monitoring tool for Docker cluster health with live WebSocket streaming and automated alerting. Built with React, TypeScript, Node.js, and Redis. (github.com/alexmercer/cloudmetrics)";
  const projLines = doc.splitTextToSize(projDesc, maxWidth);
  doc.text(projLines, margin, y);
  y += projLines.length * 12 + 12;

  // Certifications
  sectionHeader("Certifications");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(35, 40, 48);
  doc.text("AWS Certified Solutions Architect – Associate (Amazon Web Services, 2023)", margin, y);

  return doc.output("blob");
}
