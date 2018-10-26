import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _format from 'date-fns/format'
import { graphql } from 'gatsby'

import Content from '../components/Content'
import Image from '../components/Image'
import ShareWidget from '../components/ShareWidget'
import Layout from '../components/Layout'
import './SingleNewsItem.css'

export const SingleNewsItemTemplate = ({
  title,
  date,
  featuredImage,
  body,
  shortDescription,
  contentImages,
  bodyOptional,
  services = []
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
              {services && (
                <Fragment>
                  {services.map((item, index) => (
                    <span
                      key={item.service}
                      className="SingleNewsItem--Meta--Service"
                    >
                      {item.service}
                      {/* Add a comma on all but last service */}
                      {index !== services.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </Fragment>
              )}
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
      </div>
    </article>
  </main>
)

// Export Default SingleNewsItem for front-end
const SingleNewsItem = ({ data, pageContext }) => {
  const { newsItem } = data
  // const thisEdge = allNewsItems.edges.find(edge => edge.node.id === newsItem.id)
  return (
    <Layout>
      <SingleNewsItemTemplate
        {...newsItem}
        {...newsItem.frontmatter}
        body={newsItem.html}
        // nextNewsItemURL={_get(thisEdge, 'next.fields.slug')}
        // prevNewsItemURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleNewsItem

export const pageQuery = graphql`
  ## Query for SingleNewsItem data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleNewsItem($id: String!) {
    newsItem: markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        title
        template
        date
        services {
          service
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
    # allNewsItems: allMarkdownRemark(
    #   filter: { fields: { contentType: { eq: "news" } } }
    #   sort: { order: DESC, fields: [frontmatter___date] }
    # ) {
    #   edges {
    #     node {
    #       id
    #     }
    #     next {
    #       fields {
    #         slug
    #       }
    #       frontmatter {
    #         title
    #       }
    #     }
    #     previous {
    #       fields {
    #         slug
    #       }
    #       frontmatter {
    #         title
    #       }
    #     }
    #   }
    # }
  }
`
