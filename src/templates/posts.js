import React, { createRef } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import AmazonSiteStripe from "../components/AmazonSiteStripe"
import amazonProducts from "../config/amazonProducts"
import Pager from "../components/Pager"
import TagList from "../components/TagList"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"


class BlogIndex extends React.Component {
    projectCarouselRef = createRef();
    state = {
        showLeft: false,
        showRight: false,
    };

    componentDidMount() {
        this.updateScrollButtons();
        if (this.projectCarouselRef.current) {
            this.projectCarouselRef.current.addEventListener('scroll', this.updateScrollButtons);
            window.addEventListener('resize', this.updateScrollButtons);
        }
    }

    componentWillUnmount() {
        if (this.projectCarouselRef.current) {
            this.projectCarouselRef.current.removeEventListener('scroll', this.updateScrollButtons);
            window.removeEventListener('resize', this.updateScrollButtons);
        }
    }

    updateScrollButtons = () => {
        const el = this.projectCarouselRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        this.setState({
            showLeft: scrollLeft > 5,
            showRight: scrollLeft + clientWidth < scrollWidth - 5,
        });
    };

    scrollProjects = (direction) => {
        const container = this.projectCarouselRef.current;
        if (!container) return;
        const scrollAmount = 300;
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
        setTimeout(this.updateScrollButtons, 350); // update after scroll
    };

    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const { currentPage, numPages } = this.props.pageContext
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString()
        const nextPage = "/" + (currentPage + 1).toString()

        let pager;
        if (numPages > 1) {
            pager = <Pager
                isFirst={isFirst}
                isLast={isLast}
                prevPage={prevPage}
                nextPage={nextPage}
                currentPage={currentPage}
                numPages={numPages}
            />;
        }
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <Seo title="Welcome!" />
                <AmazonSiteStripe
                    amazonProducts={amazonProducts}
                    layout="horizontal"
                />
                {data.pinnedPosts && data.pinnedPosts.edges && data.pinnedPosts.edges.length > 0 && (
                    <section>
                        <h1 className="sectionTitle">Pinned Posts</h1>
                            <div className="pinned-carousel-container">
                                {this.state.showLeft && (
                                    <button
                                        className="carousel-button left"
                                        onClick={() => this.scrollProjects('left')}
                                        aria-hidden={!this.state.showLeft}
                                        aria-label="Scroll pinned posts left"
                                    >
                                        ‹
                                    </button>
                                )}
                                <div className="pinned-carousel" ref={this.projectCarouselRef}>
                                    {data.pinnedPosts.edges.map((edge, i) => {
                                const postImage = edge.node.frontmatter.postimage
                                return (
                                    <div
                                            key={edge.node.fields.slug + i.toString()}
                                                className="post pinned pinned-card"
                                        >
                                            {postImage && postImage.src && (
                                                <Link to={edge.node.fields.slug} className="postThumbLink" aria-label={`Read ${edge.node.frontmatter.title}`}>
                                                    <div className="postThumb">
                                                        <GatsbyImage
                                                            image={postImage.src.childImageSharp.gatsbyImageData}
                                                            alt={edge.node.frontmatter.title}
                                                            layout="constrained"
                                                            formats={["auto", "webp"]}
                                                        />
                                                    </div>
                                                </Link>
                                            )}
                                            <div className="pinned-card-content">
                                                <Link to={edge.node.fields.slug} className="pinnedTitleLink">
                                                    <h2 className="postTitle">{edge.node.frontmatter.title} <span className="pinnedBadge">Pinned</span></h2>
                                                </Link>
                                                <div className="postedInfo">
                                                    posted on {edge.node.frontmatter.date} | tags: [ <TagList tags={edge.node.frontmatter.tags} /> ]
                                                </div>
                                                <div className="postExcerpt" dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.excerpt }} />
                                            </div>
                                    </div>
                                )
                            })}
                            </div>
                            {this.state.showRight && (
                                <button
                                    className="carousel-button right"
                                    onClick={() => this.scrollProjects('right')}
                                    aria-hidden={!this.state.showRight}
                                    aria-label="Scroll pinned posts right"
                                >
                                    ›
                                </button>
                            )}
                        </div>
                    </section>
                )}

                <section>
                    <h1 className="sectionTitle">Latest Posts</h1>
                    <div className="flexbox">
                        {data.allMarkdownRemark.edges.map((edge, i) => {
                            const postImage = edge.node.frontmatter.postimage

                            return (
                                <div
                                    key={edge.node.fields.slug + i.toString()}
                                    className="post"
                                >
                                    <Link to={edge.node.fields.slug}>
                                        <h1 className="postTitle">{edge.node.frontmatter.title}</h1>
                                    </Link>
                                    <div className="postedInfo">
                                        posted on {edge.node.frontmatter.date} | tags: [ <TagList tags={edge.node.frontmatter.tags} /> ]
                                    </div>
                                    <Link to={edge.node.fields.slug}>

                                        {postImage && postImage.src && (
                                            <div className="postImage">
                                                <GatsbyImage
                                                    image={postImage.src.childImageSharp.gatsbyImageData}
                                                    alt={edge.node.frontmatter.title}
                                                    layout="fullWidth"
                                                    formats={["auto", "webp"]}
                                                />
                                                <div className="overlay">
                                                    <div className="innerOverlayText" dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.excerpt }}></div>
                                                </div>
                                            </div>
                                        )}
                                    </Link>


                                </div>
                            )
                        })}
                        {pager}
                    </div>
                </section>
                <section>
                    <h1 className="sectionTitle">Featured Projects</h1>
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
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
        pinnedPosts: allMarkdownRemark(
            sort: { frontmatter: {date: DESC} }
            filter: { frontmatter: { pinned: { eq: true } } }
        ) {
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
                        postimage {
                            alt
                            src {
                                absolutePath
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED
                                        width: 280
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
        allMarkdownRemark(
            sort: { frontmatter: {date: DESC} }
            # Exclude pinned posts from Latest Posts so they don't duplicate
            filter: { frontmatter: { featured: { eq: true } } }
            limit: $limit
            skip: $skip
        ) {
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
                        postimage {
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
