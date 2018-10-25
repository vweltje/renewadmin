import React from 'react'
import { graphql } from 'gatsby'
import _kebabCase from 'lodash/kebabCase'
import YouTube from 'react-youtube'

import Layout from '../components/Layout'
import Image from '../components/Image'
import GetInTouchBlock from '../components/GetInTouchBlock'

import './singleCase.css'

export const YouTubeGetID = url => {
  var ID = ''
  url = url
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if (url[2] !== undefined) {
    ID = url[2].split('/[^0-9a-z_-]/i)')
    ID = ID[0]
  } else {
    ID = url
  }
  return ID
}

// Export Template for use in CMS preview
export const SingleCaseStudieTemplate = ({ caseStudie = {}, page = {} }) => {
  return (
    <main>
      <section className="section Case--Content">
        <div className="container">
          <h1>{caseStudie.title}</h1>
          <div className="Case--ContentBlock">
            <div>
              <div className="Case--InfoBlock">
                <div>
                  <h4>Service</h4>
                  <p>{caseStudie.service}</p>
                </div>
                <div>
                  <h4>Client</h4>
                  <Image src={caseStudie.clientLogo} alt="Client logo" />
                </div>
                <div>
                  <h4>Share on</h4>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="16"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.555.246a6.46 6.46 0 0 1-2.085.816A3.237 3.237 0 0 0 11.075 0C9.263 0 7.794 1.507 7.794 3.365c0 .264.028.52.084.766-2.727-.14-5.145-1.479-6.764-3.517A3.426 3.426 0 0 0 .67 2.308c0 1.167.579 2.197 1.46 2.8a3.23 3.23 0 0 1-1.488-.42v.042c0 1.631 1.132 2.992 2.634 3.3a3.203 3.203 0 0 1-1.482.059c.417 1.336 1.628 2.31 3.065 2.335A6.481 6.481 0 0 1 0 11.82a9.137 9.137 0 0 0 5.03 1.511c6.038 0 9.338-5.127 9.338-9.574 0-.146-.003-.293-.008-.436a6.727 6.727 0 0 0 1.636-1.742 6.399 6.399 0 0 1-1.884.53A3.357 3.357 0 0 0 15.555.246"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="9"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.946 5.333v-2.11C1.946 2.803 1.846 0 6.04 0H9v3.2H6.43c-.402 0-.643.183-.643.534v1.6H9l-.643 3.2H5.786V16h-3.84V8.533H0v-3.2h1.946z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://plus.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="25"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.359 4.444h1.778v2.668h2.667v1.776h-2.667v2.668h-1.778V8.888h-2.666V7.112h2.666V4.444zM7.913 9.778V6.222h8.001V8a8 8 0 0 1-8 8C3.494 16 0 12.419 0 8c0-4.419 3.495-8 7.913-8a7.96 7.96 0 0 1 5.191 1.92L10.57 4.444a4.4 4.4 0 0 0-2.657-.888 4.444 4.444 0 1 0 4.073 6.222H7.913z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <blockquote>{caseStudie.quote}</blockquote>

              {caseStudie.contentBlock.map((item, i) => {
                return (
                  <div key={_kebabCase(item.title) + '-' + i}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                )
              })}
            </div>
            <div>
              <Image src={caseStudie.image} alt={caseStudie.title} />
              <YouTube
                videoId={YouTubeGetID(caseStudie.youtubeVideo)}
                opts={{
                  playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: false
                  }
                }}
              />
            </div>
          </div>
        </div>
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
        caseStudie={data.case.frontmatter}
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
