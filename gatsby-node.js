const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const Template = path.resolve(`src/helpers/WordpressPost.js`)
  const TemplateProductReview = path.resolve(`src/helpers/WordpressProductReview.js`)

  const {createPage} = actions
  const post  = await graphql(`
    {
      allWpPost {
        nodes {
          slug
          id
          title
          date(fromNow: true)
          authorId
          databaseId
          desiredSlug
          dateGmt
          content
          link
          commentCount
          featuredImageDatabaseId
          featuredImage {
            node {
              srcSet
            }
          }
        }
      }
    }
  `)
.then((resultPost) => {
    if (resultPost.errors) {
      Promise.reject(resultPost.errors)
    }
  resultPost.data.allWpPost.nodes.forEach((k) => {
    createPage ({
      // path: `/post/${id+1}`,
      path: `/post/${k.title}`,
      component: Template,
      context: {
        title: k.title,
        k:k,
      }
    })
  })
})

const produit = await graphql(`
{
    allWpProduct {
      nodes {
        id
        databaseId
        name
        reviewCount
      }
    }
  }
  `).then((resultProduit) => {
      if (resultProduit.errors) {
        Promise.reject(resultProduit.errors)
      }
    resultProduit.data. allWpProduct.nodes.forEach(k => {
      createPage ({
        path: `/commerce/${k.name}`,
        component: TemplateProductReview,
        context: {
          name: k.name,
          reviewCount: k.reviewCount,
          databaseId: k.databaseId,
          k:k,
        }
      })
    })
  })

return Promise.all([ post, produit])

  }