import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const currentYear = new Date().getFullYear();

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          version
        }
      }
    }
  `)

  return (
    <footer>
      <div>
        © {currentYear} {data.site.siteMetadata.author} (v{data.site.siteMetadata.version})
      </div>
    </footer>
  )
}

export default Footer
