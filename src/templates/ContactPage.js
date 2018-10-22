import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({ title }) => {
  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
    </Fragment>
  )
}

// Export Default ContactPage for front-end
const ContactPage = ({ data }) => {
  return <Layout />
}

export default ContactPage

export const pageQuery = graphql`
  ## Query for ContactPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
