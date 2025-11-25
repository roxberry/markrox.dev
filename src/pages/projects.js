import React from "react"
import Layout from "../components/Layout"
import Projects from "../components/Projects"
import Seo from "../components/Seo"

import { StaticImage } from "gatsby-plugin-image"

const ProjectsPage = () => {
    return (
        <Layout>
            <Seo title="Projects" />
            <section>
                <h1 className="sectionTitle">Projects</h1>
                <Projects />
            </section>
        </Layout>
    )
}

export default ProjectsPage
