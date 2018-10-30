import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import GetInTouchBlock from '../components/GetInTouchBlock'
import PostCategoriesNav from '../components/PostCategoriesNav'
import PostSection from '../components/PostSection'

import './NewsIndex.css'

// Export Template for use in CMS preview
export const NewsTemplate = ({
  title,
  sectionGetInTouch = {},
  newsItems = {},
  newsCategories = {},
  contentType
}) => {
  const isCategory = contentType === 'newsCategories'
  const byCategory = item => {
    return (
      item.categories &&
      item.categories.filter(i => i.category === title).length
    )
  }
  const filteredNewsItems = isCategory
    ? newsItems.filter(byCategory)
    : newsItems

  return (
    <main className="blog">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section className="section">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>

      {!!newsCategories.length && (
        <section className="section thin">
          <div className="container">
            <PostCategoriesNav categories={newsCategories} />
          </div>
        </section>
      )}

      {!!newsItems.length && (
        <section className="section newsItems">
          <div className="container">
            <PostSection posts={filteredNewsItems} />
          </div>
        </section>
      )}

      {!!sectionGetInTouch && (
        <section className="section">
          <div className="container">
            <GetInTouchBlock
              content={{
                ...sectionGetInTouch,
                ...{
                  button1: {
                    text: 'Create acount',
                    link: '/contact'
                  },
                  button2: {
                    text: 'contact us',
                    link: '/contact'
                  }
                }
              }}
            />
          </div>
        </section>
      )}
    </main>
  )
}

// Export Default News for front-end
const News = ({ data }) => {
  const page = {
    ...data.page
  }
  return (
    <Layout>
      <NewsTemplate
        {...page}
        {...page.fields}
        {...page.frontmatter}
        newsItems={data.newsItems.edges.map(item => ({
          ...item.node,
          ...item.node.frontmatter,
          ...item.node.fields
        }))}
        newsCategories={data.newsCategories.edges.map(category => ({
          ...category.node,
          ...category.node.frontmatter,
          ...category.node.fields
        }))}
      />
    </Layout>
  )
}

export default News

export const pageQuery = graphql`
  ## Query for News data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query News($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        contentType
      }
      frontmatter {
        title
        sectionGetInTouch {
          title
          subtitle
        }
      }
    }
    newsItems: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "news" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            contentType
          }
          frontmatter {
            title
            categories {
              category
            }
            shortDescription
            featuredImage
          }
        }
      }
    }
    newsCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "newsCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
