import React from 'react'
import Helmet from 'react-helmet'
import _format from 'date-fns/format'
import { graphql, Link } from 'gatsby'

import Content from '../components/Content'
import Image from '../components/Image'
import ShareWidget from '../components/ShareWidget'
import Layout from '../components/Layout'
import GetInTouchBlock from '../components/GetInTouchBlock'
import './SingleNewsItem.css'

export const SingleNewsItemTemplate = ({
  title,
  date,
  featuredImage,
  body,
  shortDescription,
  contentImages,
  bodyOptional,
  services = [],
  edges,
  sectionGetInTouch
}) => (
  <main>
    <article
      className="SingleNewsItem section light"
      itemScope
      itemType="http://schema.org/blogPost"
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="container">
        {featuredImage && (
          <header>
            <Image
              background
              className="SingleNewsItem--BackgroundImage BackgroundOverlay"
              src={featuredImage}
              alt={title}
            />
          </header>
        )}
        <div className="container skinny">
          <div className="SingleNewsItem--Content relative">
            <div className="SingleNewsItem--Meta">
              {date && (
                <time
                  className="SingleNewsItem--Meta--Date"
                  itemProp="dateCreated pubdate datePublished"
                  date={date}
                >
                  {_format(date, 'MM-DD-YYYY')}
                </time>
              )}
            </div>

            {title && (
              <h1 className="SingleNewsItem--Title" itemProp="title">
                {title}
              </h1>
            )}
            <div className="SingleNewsItem--Service">
              {services &&
                services.map((item, index) => (
                  <span
                    key={item.service}
                    className="SingleNewsItem--Meta--Service"
                  >
                    {item.service}
                    {/* Add a comma on all but last service */}
                    {index !== services.length - 1 ? ',' : ''}
                  </span>
                ))}
            </div>
            <div className="SingleNewsItem--InnerContent">
              <p className="larger">{shortDescription}</p>
              <Content source={body} />
              <div className="SingleNewsItem--ContentImages">
                {contentImages &&
                  contentImages.images.map((image, i) => (
                    <div key={'SingleNewsItem--ContentImages-' + i}>
                      <Image
                        src={image.Image}
                        alt={'SingleNewsItem--ContentImages-' + i}
                      />
                      {image.description}
                    </div>
                  ))}
              </div>
              <Content source={bodyOptional} />
            </div>
            <ShareWidget />
          </div>
        </div>

        {!!edges &&
          (edges.hasOwnProperty('previous') ||
            edges.hasOwnProperty('next')) && (
            <div className="edges">
              {(() => {
                const prev = edges.previous
                if (
                  prev !== null &&
                  typeof prev === 'object' &&
                  prev.hasOwnProperty('fields')
                ) {
                  return (
                    <Link to={prev.fields.slug} className="edge">
                      <span>Previous item</span>
                    </Link>
                  )
                }
              })()}
              {(() => {
                const next = edges.next
                if (
                  next !== null &&
                  typeof next === 'object' &&
                  next.hasOwnProperty('fields')
                ) {
                  return (
                    <Link to={next.fields.slug} className="edge">
                      <span>Next item</span>
                    </Link>
                  )
                }
              })()}
            </div>
          )}
      </div>
    </article>

    {!!sectionGetInTouch && (
      <section className="section">
        <div className="container">
          <GetInTouchBlock
            content={{
              ...sectionGetInTouch,
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
        </div>
      </section>
    )}
  </main>
)

// Export Default SingleNewsItem for front-end
const SingleNewsItem = ({ data: { newsItem, allNewsItems, page } }) => (
  <Layout meta={newsItem.frontmatter.meta || false}>
    <SingleNewsItemTemplate
      {...page.edges[0].node.frontmatter}
      {...newsItem}
      {...newsItem.frontmatter}
      body={newsItem.html}
      edges={allNewsItems.edges.find(edge => edge.node.id === newsItem.id)}
    />
  </Layout>
)

export default SingleNewsItem

export const pageQuery = graphql`
  ## Query for SingleNewsItem data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleNewsItem($id: String!) {
    newsItem: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        date
        categories {
          category
        }
        shortDescription
        contentImages {
          images {
            Image
            description
          }
        }
        bodyOptional
        featuredImage
      }
    }
    allNewsItems: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "news" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
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
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    page: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "pages" } }
        frontmatter: { template: { eq: "NewsIndex" } }
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
  }
`
