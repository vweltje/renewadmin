import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import InlineBanner from '../components/InlineBanner'
import CertificationsSection from '../components/Certifications'
import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  shortDescription,
  description,
  image,
  teamTitle,
  servicesSection = {},
  inlineBanner = {},
  certificationsSection = {}
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
        </div>
      </section>
      <section className="section About--Team">
        <div className="container">
          <h1>{teamTitle}</h1>
        </div>
      </section>
      {servicesSection && (
        <section className="section About--Services">
          <div className="container">
            <h1>{servicesSection.title}</h1>
            <p className="taCenter">{servicesSection.description}</p>
          </div>
        </section>
      )}
      {inlineBanner && <InlineBanner className="light" {...inlineBanner} />}
      <CertificationsSection {...certificationsSection} />
    </main>
  )
}

// Export Default AboutPage for front-end
const AboutPage = ({ data }) => {
  const page = {
    ...data.page
  }

  return (
    <Layout>
      <AboutPageTemplate {...page} {...page.frontmatter} />
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  ## Query for AboutPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        shortDescription
        description
        image
        teamTitle
        servicesSection {
          title
          description
        }
        inlineBanner {
          background
          button {
            link
            text
          }
          title
          description
        }
        certificationsSection {
          logos
          description
          shortDescription
          title
        }
      }
    }
  }
`
