import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { StaticImage } from "gatsby-plugin-image"

const ProjectsPage = () => {
    return (
        <Layout>
            <Seo title="Projects" />
            <section>
                <h1 className="sectionTitle">Projects</h1>
                <div className="flexbox-wide">
                    <div className="project-card-wide">
                        <div className="project-card-image">
                            <StaticImage
                                formats={["AUTO"]}
                                src="../images/projects/hactu8.jpg"
                                alt="project"
                                placeholder="NONE"
                                background="#282828"
                                loading="eager"
                                layout="constrained"
                                width={250}
                            />
                        </div>
                        <div className="project-card-wide-text">
                            <h3>HACTU8.COM</h3>
                            <span>A cutting-edge initiative dedicated to ethical hacking in the domains of robotics, AI, IoT, and consumer hardware.</span>
                            <div className="project-card-link">
                                <a href="https://hactu8.com" target="_blank" rel="noreferrer">Visit the project &gt;</a>
                            </div>
                        </div>
                    </div>
                    <div className="project-card-wide">
                        <div className="project-card-image">
                            <StaticImage
                                formats={["AUTO"]}
                                src="../images/projects/briefing-logo.webp"
                                alt="project"
                                placeholder="NONE"
                                background="#282828"
                                loading="eager"
                                layout="constrained"
                                width={250}
                            />
                        </div>
                        <div className="project-card-wide-text">
                            <h3>Briefing</h3>
                            <span>A knowledge tool designed to help professionals master knowledge by delivering curated, topic-specific content.</span>
                            <div className="project-card-link">
                                <a href="https://briefing.driveapplied.com" target="_blank" rel="noreferrer">Visit the project &gt;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ProjectsPage
