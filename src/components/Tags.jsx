import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tags = () => {
  const [query, setQuery] = useState("")

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          featuredTags
        }
      }
      allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const allTags = data.allMarkdownRemark.group
    .sort((a, b) => a.fieldValue.toLowerCase().localeCompare(b.fieldValue.toLowerCase()))

  const filteredTags = query
    ? allTags.filter(tag => tag.fieldValue.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <section className="tag-search">
      <h2>Search Tags</h2>
      <input
        type="text"
        placeholder="Search tags..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: ".6rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
      />
      <ul className="tagList fa-ul">
        {filteredTags.map(tag => (
          <li key={tag.fieldValue}>
            <FontAwesomeIcon className="fa-li" icon={['fas', 'tags']} size="xs" />
            <Link
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              className="category-item"
              activeClassName="active"
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tags