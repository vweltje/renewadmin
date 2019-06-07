import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import ContentBlock from '../components/ContentBlock'
import InlineBanner from '../components/InlineBanner'

import ServicesGrid from '../components/ServicesGrid'

import CertificationsSection from '../components/Certifications'

import './AboutPage.css'

// Export Template for use in CMS preview
export class AboutPageTemplate extends React.Component {
  static defaultProps = {
    title: '',
    shortDescription: '',
    description: '',
    image: '',
    servicesSection: {},
    inlineBanner: {},
    certificationsSection: {},
    services: {}
  }

  state = {
    activePopup: null
  }

  handlePopup = memberIndex => {
    const activePopup =
      this.state.activePopup === memberIndex ? null : memberIndex
    this.setState({ activePopup })
  }

  render() {
    const page = { ...this.props }
    const services = this.props.services
    const contentData = {
      shortDescription: page.shortDescription,
      description: page.description,
      image: page.image
    }

    return (
      <main>
        <Helmet>
          <title>{page.title}</title>
        </Helmet>

        {!!contentData && (
          <section className="section About--TitleSection">
            <div className="container">
              <h1>{page.title}</h1>
              <ContentBlock content={contentData} />
            </div>
          </section>
        )}

        {!!page.servicesSection && (
          <section className="section About--Services">
            <div className="container">
              <h1>{page.servicesSection.title}</h1>
              <p className="taCenter">{page.servicesSection.description}</p>
              {!!services && <ServicesGrid services={services} hideButton />}
            </div>
          </section>
        )}

        {!!page.inlineBanner && (
          <InlineBanner
            className="light"
            {...page.inlineBanner}
            button={{ text: 'see how it works', link: '/how-it-works' }}
          />
        )}

        {!!page.certificationsSection && (
          <CertificationsSection {...page.certificationsSection} />
        )}
      </main>
    )
  }
}

// Export Default AboutPage for front-end
const AboutPage = ({ data: { page, services } }) => {
  page.services = []
  services.edges.map((service, index) => {
    return page.services.push({
      ...service.node.fields,
      ...service.node.frontmatter
    })
  })
  return (
    <Layout meta={page.frontmatter.meta || false}>
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
      ...Meta
      frontmatter {
        title
        shortDescription
        description
        image
        servicesSection {
          title
          description
        }
        inlineBanner {
          background
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
    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
      limit: 6
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
