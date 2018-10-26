import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import GetInTouchBlock from '../components/GetInTouchBlock'
import PostCategoriesNav from '../components/PostCategoriesNav'
import PostSection from '../components/PostSection'

import './News.css'

// Export Template for use in CMS preview
export const NewsTemplate = ({
  title,
  sectionGetInTouch = {},
  newsItems = {},
  services = {},
  contentType
}) => {
  const isFilter = contentType === 'postCategories'
  const byService = newsItem =>
    newsItem.service &&
    newsItem.service.filter(ser => ser.service === title).length
  const filteredItems = isFilter ? newsItems.filter(byService) : newsItems
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

      {!!services.length && (
        <section className="section thin">
          <div className="container">
            <PostCategoriesNav categories={services} />
          </div>
        </section>
      )}

      {!!newsItems.length && (
        <section className="section">
          <div className="container">
            <PostSection posts={filteredItems} />
          </div>
        </section>
      )}

      {!!sectionGetInTouch && (
        <section className="section">
          <div className="container">
            <GetInTouchBlock content={sectionGetInTouch} />
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
        {...page.frontmatter}
        newsItems={data.newsItems.edges.map(item => ({
          ...item.node,
          ...item.node.frontmatter,
          ...item.node.fields
        }))}
        services={data.services.edges.map(service => ({
          ...service.node,
          ...service.node.frontmatter,
          ...service.node.fields
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
      html
      fields {
        contentType
      }
      frontmatter {
        title
        sectionGetInTouch {
          title
          subtitle
          button1 {
            text
            link
          }
          button2 {
            text
            link
          }
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
          }
          frontmatter {
            title
            services {
              service
            }
            shortDescription
            featuredImage
          }
        }
      }
    }
    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
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
