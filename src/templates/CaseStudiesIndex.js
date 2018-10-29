import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import GetInTouchBlock from '../components/GetInTouchBlock'
import _kebabCase from 'lodash/kebabCase'

import './CaseStudies.css'

export const niceTitle = title => {
  title = title.replace('[', '<span>')
  title = title.replace(']', '</span>')
  return title
}

// Export Template for use in CMS preview
export const CaseStudiesTemplate = ({
  title,
  businessesSection = {},
  titleSection = {},
  sectionGetInTouch = {},
  caseStudies = {}
}) => {
  return (
    <main>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {!!titleSection && (
        <section className="section CaseStudies--TitleSection">
          <div className="container">
            <div className="blockSmaller">
              <h1
                dangerouslySetInnerHTML={{
                  __html: niceTitle(titleSection.title)
                }}
              />
              <p className="larger">{titleSection.shortDescription}</p>
              <p>{titleSection.description}</p>
            </div>
          </div>
        </section>
      )}

      {!!caseStudies && (
        <section className="section">
          <div className="container">
            <div className="CaseStudies--Cases">
              {caseStudies.map((studie, i) => {
                studie = {
                  ...studie.node.fields,
                  ...studie.node.frontmatter
                }
                return (
                  <Link
                    to={studie.slug}
                    className="caseStudie"
                    key={_kebabCase(studie.slug) + '-' + i}
                  >
                    <Image
                      background
                      src={studie.image}
                      className="BackgroundOverlay"
                    />
                    <Image
                      src={studie.clientLogo}
                      alt={_kebabCase(studie.slug)}
                      className="clientLogo"
                    />
                    <button className="Button Quaternary">
                      See case studie
                    </button>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {!!businessesSection && (
        <section className="section CaseStudies--BusinessLogos">
          <div className="container">
            <h2>{businessesSection.title}</h2>
            <div>
              {businessesSection.logos.map((logo, index) => {
                return (
                  <Image
                    src={logo}
                    alt={'Logo ' + index}
                    key={'BusinessLogo-' + index}
                  />
                )
              })}
            </div>
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

// Export Default CaseStudies for front-end
const CaseStudies = ({ data }) => {
  const page = {
    ...data.page,
    caseStudies: data.allCaseStudies.edges
  }
  return (
    <Layout>
      <CaseStudiesTemplate {...page} {...page.frontmatter} />
    </Layout>
  )
}

export default CaseStudies

export const pageQuery = graphql`
  ## Query for CaseStudies data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query CaseStudies($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        titleSection {
          title
          shortDescription
          description
        }
        businessesSection {
          title
          logos
        }
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
    allCaseStudies: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseStudies" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            clientLogo
            image
          }
        }
      }
    }
  }
`
