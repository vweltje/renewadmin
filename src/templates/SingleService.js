import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import Accordion from '../components/Accordion'
import GetInTouchBlock from '../components/GetInTouchBlock'

// Export Template for use in CMS preview
export const SingleServiceTemplate = ({
  title,
  shortDescription,
  description,
  image,
  infoSection = {},
  getInTouchSection = {}
}) => {
  const blockData = {
    title: title,
    shortDescription: shortDescription,
    description: description,
    image: image
  }
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
      {!!getInTouchSection && (
        <section className="section Service--Contact">
          <div className="container">
            {!!getInTouchSection.edges &&
              getInTouchSection.edges.length && (
                <GetInTouchBlock
                  content={
                    getInTouchSection.edges[0].node.frontmatter
                      .sectionGetInTouch
                  }
                />
              )}
          </div>
        </section>
      )}
    </main>
  )
}

// Export Default SingleService for front-end
const SingleService = ({ data }) => {
  const service = {
    ...data.service
  }

  return (
    <Layout>
      <SingleServiceTemplate
        {...service}
        {...service.frontmatter}
        getInTouchSection={data.page}
      />
    </Layout>
  )
}

export default SingleService

export const pageQuery = graphql`
  ## Query for SingleService data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleService($id: String!) {
    service: markdownRemark(id: { eq: $id }) {
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
      }
    }
  }
`
