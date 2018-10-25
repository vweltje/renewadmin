import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import ServicesGrid from '../components/ServicesGrid'

import './HowItWorksPage.css'

// Export Template for use in CMS preview
export const HowItWorksPageTemplate = ({
  title,
  shortDescription,
  description,
  image,
  services
}) => {
  const contentData = {
    shortDescription: shortDescription,
    description: description,
    image: image
  }
  let styles = {
    width: '100%',
    height: '650px',
    background: '#33495b'
  }
  return (
    <main>
      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
          <ContentBlock content={contentData} />
          <section className="section Home--CaseStudiesSection">
            <div className="container">
              <div style={styles}>placeholder</div>
            </div>
          </section>
          <ServicesGrid services={services} />
        </div>
      </section>
    </main>
  )
}

// Export Default HowItWorksPage for front-end
const HowItWorksPage = ({ data }) => {
  const page = data.page
  let services = []
  data.services.edges.map((service, index) => {
    return services.push({
      ...service.node.fields,
      ...service.node.frontmatter
    })
  })
  return (
    <Layout>
      <HowItWorksPageTemplate
        {...page}
        {...page.frontmatter}
        services={services}
      />
    </Layout>
  )
}

export default HowItWorksPage

export const pageQuery = graphql`
  ## Query for HowItWorksPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HowItWorksPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        shortDescription
        description
        image
      }
    }
    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            shortDescription
          }
        }
      }
    }
  }
`
