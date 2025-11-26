import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const projects = [
  {
    title: "UN2 Context",
    description:
      "A personal AI context-layer — enabling mastery over your tools by putting you in control of context and data.",
    href: "https://github.com/UN2AI/un2-context",
    linkText: "View the project >",
    Image: () => (
      <StaticImage
        formats={["AUTO"]}
        src="../images/projects/un2x.jpg"
        alt="UN2 Context project"
        placeholder="NONE"
        background="#282828"
        loading="eager"
        layout="constrained"
        width={250}
      />
    ),
  },
  {
    title: "OWASP HACTU8",
    description:
      "A cutting-edge initiative dedicated to ethical hacking in the domains of robotics, AI, IoT, and consumer hardware.",
    href: "https://owasp.org/www-project-hactu8/",
    linkText: "Visit the project >",
    Image: () => (
      <StaticImage
        formats={["AUTO"]}
        src="../images/projects/hactu8.jpg"
        alt="OWASPHACTU8 project"
        placeholder="NONE"
        background="#282828"
        loading="eager"
        layout="constrained"
        width={250}
      />
    ),
  },
  {
    title: "Briefing",
    description:
      "A knowledge tool designed to help professionals master knowledge by delivering curated, topic-specific content.",
    href: "https://briefing.driveapplied.com"
    ,
    linkText: "Visit the project >",
    Image: () => (
      <StaticImage
        formats={["AUTO"]}
        src="../images/projects/briefing-logo.webp"
        alt="Briefing project"
        placeholder="NONE"
        background="#282828"
        loading="eager"
        layout="constrained"
        width={250}
      />
    ),
  },
];

const ProjectCard = ({ title, description, href, linkText, Image }) => (
  <div className="project-card-wide">
    <div className="project-card-image">
      <Image />
    </div>
    <div className="project-card-wide-text">
      <h3>{title}</h3>
      <span>{description}</span>
      <div className="project-card-link">
        <a href={href} target="_blank" rel="noreferrer">
          {linkText}
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => (
  <div className="flexbox-wide">
    {projects.map((project) => (
      <ProjectCard key={project.title} {...project} />
    ))}
  </div>
);

export default Projects;