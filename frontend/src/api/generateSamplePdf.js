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

export function downloadVersionWithJsPdf(version, fileName, resumeTitle) {
  const p = version?.parsedSections || {};
  const b = p.basics || {};

  const doc = new jsPDF({
    unit: "pt",
    format: "letter",
  });

  const margin = 40;
  const pageWidth = 612;
  const maxWidth = pageWidth - margin * 2;
  let y = 50;

  function checkPage(needed = 24) {
    if (y + needed > 740) {
      doc.addPage();
      y = 50;
    }
  }

  // Name & Title
  const displayName = b.name?.trim() || resumeTitle || "Resume";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(20, 24, 30);
  doc.text(displayName, margin, y);
  y += 20;

  if (b.title) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(47, 74, 58);
    doc.text(b.title, margin, y);
    y += 18;
  }

  // Contact line
  const contactParts = [
    b.location,
    b.email,
    b.phone,
    ...(Array.isArray(b.links)
      ? b.links.map((l) => (typeof l === "string" ? l : l?.url || l?.label))
      : []),
  ].filter(Boolean);

  if (contactParts.length) {
    doc.setFontSize(9);
    doc.setTextColor(90, 100, 110);
    const contactLine = contactParts.join("  |  ");
    const contactLines = doc.splitTextToSize(contactLine, maxWidth);
    doc.text(contactLines, margin, y);
    y += contactLines.length * 11 + 6;
  }

  // Divider
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
  if (p.summary) {
    sectionHeader("Professional Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 35, 42);
    const sumLines = doc.splitTextToSize(p.summary, maxWidth);
    doc.text(sumLines, margin, y);
    y += sumLines.length * 13 + 12;
  }

  // Experience
  if (Array.isArray(p.experience) && p.experience.length) {
    sectionHeader("Experience");
    for (const exp of p.experience) {
      if (!exp) continue;
      checkPage(32);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(20, 24, 30);
      const roleText = [exp.role, exp.company].filter(Boolean).join(" — ");
      doc.text(roleText || "Role", margin, y);

      const metaRight = [exp.location, exp.period].filter(Boolean).join("  |  ");
      if (metaRight) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(90, 100, 110);
        doc.text(metaRight, margin + maxWidth, y, { align: "right" });
      }
      y += 14;

      if (Array.isArray(exp.bullets)) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(35, 40, 48);
        for (const b of exp.bullets) {
          const bulletText =
            typeof b === "string"
              ? b
              : b?.rewritten || b?.text || String(b || "");
          if (!bulletText.trim()) continue;
          checkPage(24);
          const split = doc.splitTextToSize(`•  ${bulletText}`, maxWidth - 10);
          doc.text(split, margin + 5, y);
          y += split.length * 12 + 3;
        }
      }
      y += 8;
    }
  }

  // Projects
  if (Array.isArray(p.projects) && p.projects.length) {
    sectionHeader("Projects");
    for (const proj of p.projects) {
      if (!proj) continue;
      checkPage(28);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(20, 24, 30);
      doc.text(proj.name || proj.title || "Project", margin, y);
      y += 12;

      if (proj.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(35, 40, 48);
        const descLines = doc.splitTextToSize(proj.description, maxWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 12 + 6;
      }
    }
  }

  // Education
  if (Array.isArray(p.education) && p.education.length) {
    sectionHeader("Education");
    for (const edu of p.education) {
      if (!edu) continue;
      checkPage(28);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(20, 24, 30);
      const degreeText = [edu.degree, edu.school].filter(Boolean).join(" — ");
      doc.text(degreeText || "Education", margin, y);

      const eduMeta = [edu.location, edu.period].filter(Boolean).join("  |  ");
      if (eduMeta) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(90, 100, 110);
        doc.text(eduMeta, margin + maxWidth, y, { align: "right" });
      }
      y += 12;

      if (edu.details) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(90, 100, 110);
        doc.text(edu.details, margin, y);
        y += 14;
      }
    }
  }

  // Skills
  if (Array.isArray(p.skills) && p.skills.length) {
    sectionHeader("Skills");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(35, 40, 48);
    const skillList = p.skills
      .map((s) => (typeof s === "string" ? s : s?.name || ""))
      .filter(Boolean);
    const skillLines = doc.splitTextToSize(skillList.join("  •  "), maxWidth);
    doc.text(skillLines, margin, y);
    y += skillLines.length * 12 + 12;
  }

  // Certifications
  if (Array.isArray(p.certifications) && p.certifications.length) {
    sectionHeader("Certifications");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(35, 40, 48);
    for (const c of p.certifications) {
      const cText =
        typeof c === "string"
          ? c
          : [c.name, c.issuer, c.year].filter(Boolean).join(" — ");
      if (cText) {
        doc.text(`•  ${cText}`, margin, y);
        y += 14;
      }
    }
  }

  doc.save(fileName || "resume.pdf");
}
