import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import Accordion from '../components/Accordion'
import Image from '../components/Image'
import GetInTouchBlock from '../components/GetInTouchBlock'
import Slider from 'react-slick'

import _kebabCase from 'lodash/kebabCase'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './SingleService.css'

export const getRelatedCases = (cases, filter) => {
  let casesFiltered = false
  if (cases && cases.hasOwnProperty('edges')) {
    casesFiltered = []
    cases = { ...(cases.edges || false) }
    if (cases) {
      Object.keys(cases).map((key, index) => {
        let item = {
          ...cases[key].node.fields,
          ...cases[key].node.frontmatter
        }
        if (_kebabCase(item.service) === _kebabCase(filter)) {
          casesFiltered.push(item)
        }
        return casesFiltered
      })
    }
  }
  return casesFiltered
}

// Export Template for use in CMS preview
export const SingleServiceTemplate = ({
  title,
  shortDescription,
  description,
  image,
  infoSection = {},
  getInTouchSection = {},
  caseStudies
}) => {
  const blockData = {
    title: title,
    shortDescription: shortDescription,
    description: description,
    image: image
  }
  const relatedCaseStudies = getRelatedCases(caseStudies, title)
  return (
    <main>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section className="section Service--TitleSection">
        <div className="container">
          <ContentBlock content={blockData} />
        </div>
      </section>
      {!!infoSection && (
        <section className="section Service--Info">
          <div className="container">
            <h3 className="taCenter">{infoSection.title}</h3>
            <Accordion items={infoSection.infoblocks} />
          </div>
        </section>
      )}

      {!!relatedCaseStudies &&
        relatedCaseStudies.length > 0 && (
          <section className="section Service--Cases">
            <div className="container">
              <Slider
                {...{
                  initialSlide: 0,
                  slidesToScroll: 1,
                  variableWidth: true,
                  centerMode: true,
                  arrows: true,
                  focusOnSelect: true,
                  autoplay: true,
                  autoplaySpeed: 3000
                }}
              >
                {relatedCaseStudies.map((item, i) => {
                  return (
                    <div
                      className="Service--RelatedCase"
                      key={'Service--RelatedCase-' + i}
                    >
                      <div className="Service--RelatedCaseContent">
                        <div className="Service--RelatedCaseImageBox">
                          <Image src={item.clientLogo} alt="Logo" />
                          <Image
                            src={item.image}
                            background
                            alt="background"
                            className="BackgroundOverlay"
                          />
                        </div>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.quote}</p>
                          <Link to={item.slug} className="Button Secondary">
                            See related project
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </section>
        )}

      {!!getInTouchSection && (
        <section className="section Service--Contact">
          <div className="container">
            {!!getInTouchSection.edges &&
              getInTouchSection.edges.length && (
                <GetInTouchBlock
                  content={{
                    ...getInTouchSection.edges[0].node.frontmatter
                      .sectionGetInTouch,
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
              )}
          </div>
        </section>
      )}
    </main>
  )
}

// Export Default SingleService for front-end
const SingleService = ({ data: { service, page, caseStudies } }) => (
  <Layout meta={service.frontmatter.meta || false}>
    <SingleServiceTemplate
      {...service}
      {...service.frontmatter}
      getInTouchSection={page}
      caseStudies={caseStudies}
    />
  </Layout>
)

export default SingleService

export const pageQuery = graphql`
  ## Query for SingleService data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleService($id: String!) {
    service: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        shortDescription
        description
        image
        infoSection {
          title
          infoblocks {
            title
            description
          }
        }
      }
    }
    page: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "pages" } }
        frontmatter: { template: { eq: "SingleService" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            sectionGetInTouch {
              title
              subtitle
            }
          }
        }
      }
    }
    caseStudies: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseStudies" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            service
            title
            clientLogo
            quote
            image
          }
        }
      }
    }
  }
`
