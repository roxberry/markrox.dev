import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Helmet from 'react-helmet'
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'

const Blog = (props) => {
    
    const post = props.data.markdownRemark
    const postImage = post.frontmatter.postimage
    const seoImage = post.frontmatter.postimage
    ? post.frontmatter.postimage.src.childImageSharp.resize
    : null
    const disqusShortname = "roxberry";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };
    const pathName = props.location.pathname


    return (

        <Layout>
            <SEO           
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                image={seoImage}
                pathname={pathName}>
            </SEO>
            <section>
                <h1 className="postTitle">{post.frontmatter.title}</h1>
                <div className="postedInfo">posted on {post.frontmatter.date} by {post.frontmatter.author}</div>
                <div className="postImage">
                    {
                        postImage && (
                            <GatsbyImage
                            image={postImage.src.childImageSharp.gatsbyImageData}
                            alt={postImage.alt}
                            layout="fullWidth"
                            />
                        )
                    }
                    <div className="overlay">
                        <div className="innerOverlayText">{post.frontmatter.subtitle}</div>
                    </div>
                </div>
                <div className="blogBody" dangerouslySetInnerHTML={{__html: post.html}}></div>
                <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                <Helmet>
                    <script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=d50ae18d-23ca-411f-bd12-d8b2b9bf5e18" type="text/javascript" />
                </Helmet>

                <div id="amzn-assoc-ad-d50ae18d-23ca-411f-bd12-d8b2b9bf5e18"></div>
            </section>        
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
        excerpt
        frontmatter {
            title
            subtitle
            date(formatString: "LL")
            author
            featured
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
                    resize(width: 1200) {
                        src
                        height
                        width
                      }
                }
              }
            }
        }
        html
        }
    }
`

export default Blog