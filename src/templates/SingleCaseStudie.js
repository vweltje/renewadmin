import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import GetInTouchBlock from '../components/GetInTouchBlock'

// Export Template for use in CMS preview
export const SingleCaseStudieTemplate = ({ caseStudie = {}, page = {} }) => {
  return (
    <main>
      <section className="section Service--TitleSection">
        <div className="container" />
      </section>
      <section className="section">
        <div className="container">
          <GetInTouchBlock content={page} />
        </div>
      </section>
    </main>
  )
}

// Export Default SingleCaseStudie for front-end
const SingleCaseStudie = ({ data }) => {
  return (
    <Layout>
      <SingleCaseStudieTemplate
        case={data.case.frontmatter}
        page={data.page.edges[0].node.frontmatter.sectionGetInTouch}
      />
    </Layout>
  )
}

export default SingleCaseStudie

export const pageQuery = graphql`
  ## Query for SingleService data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleCaseStudie($id: String!) {
    case: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        service
        clientLogo
        quote
        contentBlock {
          text
          title
        }
        image
        youtubeVideo
      }
    }
    page: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "pages" } }
        frontmatter: { template: { eq: "SingleCaseStudie" } }
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
