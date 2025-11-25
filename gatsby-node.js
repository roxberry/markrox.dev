const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")
const {
  extractMetadataFromFilename,
  isBlogPostFileName,
} = require("./src/utils/posthelper")

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  if (1 == 1) {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const { categories } = node.frontmatter
      const slug = createFilePath({ node, getNode })

      const [, date, title] = slug.match(
        /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
      )

      const datePath = date ? date.replace(/-/gi, "/") : ""
      const catPath = categories ? categories.join("/") : "blog"
      const slugPre = catPath ? catPath.concat("/", datePath) : datePath

      const value = `/${slugPre}/${title}/`
      createNodeField({ node, name: `slug`, value })
      createNodeField({ node, name: `date`, value: date })
    }
  }

  if (1 == 0) {
    const filePath = createFilePath({ node, getNode, basePath: `posts` })

    let date, slug
    if (isBlogPostFileName(filePath)) {
      const result = extractMetadataFromFilename(filePath)
      date = result.date
      slug = result.slug
      createNodeField({ node, name: `date`, value: date })
    } else {
      slug = filePath.substring(1)
    }
    createNodeField({ node, name: `slug`, value: slug })
  }

  if (1 == 0) {
    //TODO: think about existing SEO
    const { createNodeField } = actions

    if (node.internal.type === "MarkdownRemark") {
      const slug = path.basename(node.fileAbsolutePath, ".md")

      createNodeField({
        node,
        name: "slug",
        value: slug,
      })
    }
  }
}

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve("./src/templates/blog.js")
  const tagTemplate = path.resolve("./src/templates/tags.js")

  // const result = await graphql(`
  //     query {
  //         allMarkdownRemark {
  //             edges {
  //                 node {
  //                     fields {
  //                         slug
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // `)

  const result = await graphql(`
    {
        postsRemark: allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 2000) {
            edges {
            node {
                fields {
                slug
                }
                frontmatter {
                tags
                featured
                }
            }
            }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
            group(field: {frontmatter: {tags: SELECT}}) {
            fieldValue
            }
        }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // extract posts from query
  const posts = result.data.postsRemark.edges

  posts.forEach(({ node }) => {
    createPage({
      component: blogTemplate,
      path: node.fields.slug,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // extract tag data from query
  const tags = result.data.tagsGroup.group

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // Create blog post list pages
  const postsPerPage = 3

  const totalFeaturedPosts = posts.filter(p => p.node.frontmatter.featured).length

  //const numPages = Math.ceil(posts.length / postsPerPage)
  const numPages = Math.ceil(totalFeaturedPosts / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/posts.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

// Ensure pinned frontmatter is defined in the GraphQL schema so
// filtering by `frontmatter.pinned` won't cause GraphQLErrors
module.exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemarkFrontmatter {
      pinned: Boolean
    }
  `)
}
