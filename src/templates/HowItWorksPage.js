import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
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

  return (
    <main>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
          <ContentBlock content={contentData} />
          {!!services &&
            services.length && (
              <Fragment>
                <section className="section Home--CaseStudiesSection">
                  <div className="container">
                    <div className="Howitworks--GraphSection">
                      <Image
                        className="default"
                        src="/images/howitworks_graphic.svg"
                        alt="how it works graphic"
                      />
                      <Image
                        className="mobile"
                        src="/images/howitworks_graphic_mobile.svg"
                        alt="how it works graphic"
                      />
                    </div>
                  </div>
                </section>
                <ServicesGrid services={services} />
              </Fragment>
            )}
        </div>
      </section>
    </main>
  )
}

// Export Default HowItWorksPage for front-end
const HowItWorksPage = ({ data: { page, services } }) => {
  return (
    <Layout meta={page.frontmatter.meta || false}>
      <HowItWorksPageTemplate
        {...page}
        {...page.frontmatter}
        services={services.edges.map((service, index) => ({
          ...service.node.fields,
          ...service.node.frontmatter
        }))}
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
      ...Meta
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
            status
            shortDescription
            howItWorks {
              steps {
                title
              }
            }
          }
        }
      }
    }
  }
`
