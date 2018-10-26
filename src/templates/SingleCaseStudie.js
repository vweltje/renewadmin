import React from 'react'
import { Link, graphql } from 'gatsby'
import _kebabCase from 'lodash/kebabCase'
import YouTube from 'react-youtube'

import Layout from '../components/Layout'
import Image from '../components/Image'
import ShareWidget from '../components/ShareWidget'
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
export const SingleCaseStudieTemplate = ({
  caseStudie = {},
  page = {},
  edges = {}
}) => {
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
                <ShareWidget />
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
      <section className="section Case--Edges">
        <div className="container">
          <div className="edges">
            {(() => {
              const prev = edges.previous
              if (prev !== null) {
                return (
                  <Link to={prev.fields.slug} className="edge">
                    <Image
                      background
                      src={prev.frontmatter.image}
                      alt="backgroundImage"
                    />
                    <Image src={prev.frontmatter.clientLogo} alt="clientLogo" />
                    <span>Previous Case</span>
                  </Link>
                )
              } else {
                return (
                  <div className="edge default">
                    <span>Nothing to show</span>
                  </div>
                )
              }
            })()}
            {(() => {
              const next = edges.next
              if (edges.next !== null) {
                return (
                  <Link to={next.fields.slug} className="edge">
                    <Image
                      background
                      src={next.frontmatter.image}
                      alt="backgroundImage"
                    />
                    <Image src={next.frontmatter.clientLogo} alt="clientLogo" />
                    <span>Next Case</span>
                  </Link>
                )
              } else {
                return (
                  <div className="edge default">
                    <span>Nothing to show</span>
                  </div>
                )
              }
            })()}
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
  const thisEdge = data.allCaseStudies.edges.find(
    edge => edge.node.id === data.case.id
  )
  return (
    <Layout>
      <SingleCaseStudieTemplate
        caseStudie={data.case.frontmatter}
        page={data.page.edges[0].node.frontmatter.sectionGetInTouch}
        edges={thisEdge}
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
      id
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
    allCaseStudies: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseStudies" } } }
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
            image
            clientLogo
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
            image
            clientLogo
          }
        }
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
