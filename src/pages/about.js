import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import ReactMarkdown from "react-markdown"

const AboutPage = () => {
    const [markdown, setMarkdown] = useState("")

    useEffect(() => {
        fetch("/about.md")
            .then(res => res.text())
            .then(setMarkdown)
    }, [])

    return (
        <Layout>
            <Seo title="About Me" />
            <section>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </section>
        </Layout>
    )
}

export default AboutPage
