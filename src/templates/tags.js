import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TagList from "../components/TagList"
import PropTypes from "prop-types"

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GatsbyImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`

    return (
        <Layout>
            <SEO title={tag} />
            <section>
                <h1><FontAwesomeIcon icon={['fas', 'tags']} />&nbsp;&nbsp;{tagHeader}</h1>
                <div className="flexbox">
                    {edges.map(({ node }, i) => {

                        const postImage = node.frontmatter.postimage

                        return (
                            <div key={node.fields.slug + i.toString()}>
                                <Link to={node.fields.slug}><h1 className="postTitle">{node.frontmatter.title}</h1></Link>
                                <div className="postedInfo">posted on {node.frontmatter.date} | tags: [ <TagList tags= { node.frontmatter.tags } /> ]</div>
                                <Link to={node.fields.slug}>
                                    {postImage && postImage.src && (
                                        <div className="postImage">
                                            <GatsbyImage
                                                image={postImage.src.childImageSharp.gatsbyImageData}
                                                alt={postImage.alt}
                                                layout="fullWidth"
                                            />
                                            <div className="overlay">
                                                <div className="innerOverlayText" dangerouslySetInnerHTML={{__html: node.frontmatter.excerpt }}></div>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        )
                    })}
                </div>
                {/* <ul>
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul> */}
                {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
                {/* <Link to="/tags">All tags</Link> */}
            </section>
        </Layout>
    )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
}

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: {frontmatter: {date: DESC}}
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
              title
              subtitle
              date(formatString: "LL")
              author
              excerpt
              featured
              tags
              postimage
              {
                alt
                src {
                  absolutePath
                  childImageSharp {
                      gatsbyImageData(
                        layout: FULL_WIDTH
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                      )
                  }
                }
              }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default Tags
