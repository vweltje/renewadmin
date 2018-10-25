import React from 'react'
import { graphql, Link } from 'gatsby'
import _truncate from 'lodash/truncate'

import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import ServicesGrid from '../components/ServicesGrid'
import InlineBanner from '../components/InlineBanner'
import Image from '../components/Image'
import CertificationsSection from '../components/Certifications'

import './HomePage.css'

export const TitleSection = ({ title, subtitle, button1, button2 }) => {
  return (
    <section className="section Home--TitleSection">
      <div className="container">
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
        <div className="ButtonBox">
          <Link to={button1.link} className="Button Bordered">
            {button1.text}
          </Link>
          <Link to={button2.link} className="Button">
            {button2.text}
          </Link>
        </div>
        <Image
          src="/images/homeHeadingIllustration.png"
          alt="Heading Illustration"
        />
      </div>
    </section>
  )
}

export const ServicesSection = ({
  title,
  description,
  button = [],
  services = {}
}) => {
  return (
    <section className="section Home--ServicesSecction">
      <div className="container">
        <h2 className="taCenter">{title}</h2>
        <p className="taCenter">{description}</p>
        <ServicesGrid services={services} showDescription />
        <Link to={button.link} className="Button">
          {button.text}
        </Link>
      </div>
    </section>
  )
}

export const CaseStudiesSection = ({
  title,
  description,
  button = [],
  caseStudies = {}
}) => {
  return (
    <section className="section Home--CaseStudiesSection">
      <div className="container">
        <h2 className="taCenter">{title}</h2>
        <p className="taCenter">{description}</p>
        <div className="Home-caseStudies">
          {caseStudies.map((caseStudie, i) => {
            const studie = {
              ...caseStudie.node.fields,
              ...caseStudie.node.frontmatter
            }
            return (
              <Link
                to={studie.slug}
                className="Home--Case"
                key={studie.slug + '-' + i}
              >
                <div>
                  <div className="square">
                    <Image src={studie.image} alt="erger" />
                  </div>
                </div>
                <div>
                  <h4>{studie.title}</h4>
                  <p>
                    {_truncate(studie.contentBlock[0].text, {
                      length: 150,
                      separator: ' '
                    })}
                    <span>Read more+</span>
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
        <Link to={button.link} className="Button">
          {button.text}
        </Link>
      </div>
    </section>
  )
}

export const NewsSection = ({ title, description }) => {
  let styles = {
    width: '100%',
    height: '650px',
    background: '#33495b'
  }
  return (
    <section className="section Home--NewsSection">
      <div className="container">
        <h2 className="taCenter">{title}</h2>
        <p className="taCenter">{description}</p>
        <div style={styles}>placeholder</div>
      </div>
    </section>
  )
}

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  titleSection,
  aboutUsSection,
  howItWorksSection,
  servicesSection,
  inlineBanner,
  caseStudiesSection,
  newsSection,
  certificationsSection,
  services
}) => {
  console.log(caseStudiesSection)
  const infoSectionData = [{ ...aboutUsSection }, { ...howItWorksSection }]
  return (
    <main className="Home">
      <TitleSection {...titleSection} />
      <ContentBlock content={infoSectionData} multiple />
      <ServicesSection {...servicesSection} services={services} />
      <InlineBanner {...inlineBanner} />
      <CaseStudiesSection {...caseStudiesSection} />
      <NewsSection {...newsSection} />
      <CertificationsSection {...certificationsSection} />
    </main>
  )
}

// Export Default HomePage for front-end
const HomePage = ({ data }) => {
  const page = {
    ...data.page,
    services: []
  }
  page.frontmatter.caseStudiesSection = {
    ...page.frontmatter.caseStudiesSection,
    caseStudies: data.allCaseStudies.edges
  }
  data.services.edges.map((service, index) => {
    return page.services.push({
      ...service.node.fields,
      ...service.node.frontmatter
    })
  })
  return (
    <Layout>
      <HomePageTemplate {...page} {...page.frontmatter} />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        titleSection {
          title
          subtitle
          button1 {
            link
            text
          }
          button2 {
            link
            text
          }
        }
        aboutUsSection {
          button {
            link
            text
          }
          description
          image
          shortDescription
          title
        }
        howItWorksSection {
          button {
            link
            text
          }
          description
          image
          shortDescription
          title
        }
        servicesSection {
          button {
            link
            text
          }
          description
          title
        }
        inlineBanner {
          background
          button {
            link
            text
          }
          description
          title
        }
        caseStudiesSection {
          button {
            link
            text
          }
          description
          title
        }
        newsSection {
          description
          title
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
    allCaseStudies: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseStudies" } } }
      sort: { order: ASC, fields: [frontmatter___date] }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            contentBlock {
              text
            }
            image
          }
        }
      }
    }
  }
`
