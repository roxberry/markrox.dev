/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

module.exports = {
    siteMetadata: {
        title: "MARKROX.DEV",
        url: "https://www.markrox.dev",
        siteUrl: "https://www.markrox.dev",
        twitterUsername: "@markroxdotdev",
        author: "Mark Roxberry",
        keywords: ["roxberry", "journal", "development"],
        featuredTags: ["AppliedAI", "AI", "architecture", "development", "performance", "robotics", "security", "privacy", "apple"],
        version: "2025.08.14.01",
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-image",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/src/posts`,
            }
        },
        {    
            resolve: "gatsby-source-filesystem",
            options: {
                name: "archive",
                path: `${__dirname}/src/archive`,
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                          maxWidth: 800, // Adjust as needed
                        },
                    },
                    { 
                        resolve: "gatsby-remark-mermaid",
                        options: {
                            launchOptions: {
                                executablePath: puppeteer.executablePath(),
                                defaultViewport: {
                                    width: 1280,
                                    height: 3000,
                                }
                            },
                            theme: "dark" // Or install your favorite theme from GitHub
                        }
                    },
                    {
                        resolve: `gatsby-remark-twitter-cards`,
                        options: {
                            title: "markrox.dev",
                            separator: "|",
                            author: "Mark Roxberry",
                            background: require.resolve("./src/images/profile.1.jpg"),
                            fontColor: "#011a27",
                            titleFontSize: 96,
                            subtitleFontSize: 60,
                            fontStyle: "monospace",
                        },
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ "content:encoded": edge.node.excerpt }],
                                })
                            })
                        },
                        query: `
              {
                allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
                        output: "/feed.xml",
                        title: "markRox.DEV RSS Feed",
                        // // optional configuration to insert feed reference in pages:
                        // // if `string` is used, it will be used to create RegExp and then test if pathname of
                        // // current page satisfied this regular expression;
                        // // if not provided or `undefined`, all pages will have feed reference inserted
                        // match: "^/blog/",
                        // // optional configuration to specify external rss feed, such as feedburner
                        // link: "https://feeds.feedburner.com/gatsby/blog",
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                name: 'blog',
                query: `
                {
                    allMarkdownRemark {
                      nodes {
                        id
                        frontmatter {
                          title
                          excerpt
                        }
                        fields {
                            slug
                          }
                      }
                    }
                  }
                `,
                engine: 'flexsearch',
                engineOptions: 'speed',
                ref: 'id',
                index: ['title'],
                store: ['id', 'title', 'slug'],
                normalizer: ({ data }) =>
                data.allMarkdownRemark.nodes.map((node) => ({
                    id: node.id,
                    title: node.frontmatter.title,
                    slug: node.fields.slug
                })),
            },
        },
    ],
}
