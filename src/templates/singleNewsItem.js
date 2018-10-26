import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Image from '../components/Image'
import Layout from '../components/Layout'
import './SingleNewsItem.css'

export const SingleNewsItemTemplate = ({
  title,
  date,
  featuredImage,
  body,
  nextNewsItemURL,
  prevNewsItemURL,
  categories = []
}) => (
  <main>
    <article
      className="SingleNewsItem section light"
      itemScope
      itemType="http://schema.org/BlogNewsIteming"
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {featuredImage && (
        <Image
          background
          className="SingleNewsItem--BackgroundImage"
          src={featuredImage}
          alt={title}
        />
      )}

      <div className="container skinny">
        <Link className="SingleNewsItem--BackButton" to="/blog/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SingleNewsItem--Content relative">
          <div className="SingleNewsItem--Meta">
            {date && (
              <time
                className="SingleNewsItem--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {_format(date, 'MMMM Do, YYYY')}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SingleNewsItem--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SingleNewsItem--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SingleNewsItem--InnerContent">
            <Content source={body} />
          </div>

          <div className="SingleNewsItem--Pagination">
            {prevNewsItemURL && (
              <Link
                className="SingleNewsItem--Pagination--Link prev"
                to={prevNewsItemURL}
              >
                Previous NewsItem
              </Link>
            )}
            {nextNewsItemURL && (
              <Link
                className="SingleNewsItem--Pagination--Link next"
                to={nextNewsItemURL}
              >
                Next NewsItem
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SingleNewsItem for front-end
const SingleNewsItem = ({ data, pageContext }) => {
  // const { newsItem, allNewsItems } = data
  // const thisEdge = allNewsItems.edges.find(edge => edge.node.id === newsItem.id)
  // return (
  // <Layout>
  //   <SingleNewsItemTemplate
  //     {...newsItem}
  //     {...newsItem.frontmatter}
  //     body={newsItem.html}
  //     nextNewsItemURL={_get(thisEdge, 'next.fields.slug')}
  //     prevNewsItemURL={_get(thisEdge, 'previous.fields.slug')}
  //   />
  // </Layout>
  // )

  return ''
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
    }
  }
`
