import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import ContactForm from '../components/ContactForm'

import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  title,
  contactTextTitle,
  text,
  locationTitle,
  address,
  openingHoursTitle,
  openingHours,
  contactInfoTitle,
  contactInfo
}) => {
  return (
    <main>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section className="section ContactPage">
        <div className="container">
          <h1>{title}</h1>
          <div className="ContactPage-splitview">
            <div>
              <h3>{contactTextTitle}</h3>
              <p>{text}</p>
              <h3>{locationTitle}</h3>
              <p>{address}</p>

              <a
                className="ContactPage--MapLink"
                href="https://goo.gl/maps/vwZ7BBCanhH2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/images/map.png" alt="Map" />
                <small>View on Google Maps</small>
              </a>
              <h3>{openingHoursTitle}</h3>
              <p>{openingHours}</p>
              <h3>{contactInfoTitle}</h3>
              <p>{contactInfo}</p>
            </div>
            <div>
              {' '}
              <ContactForm />{' '}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Export Default ContactPage for front-end
const ContactPage = ({ data: { page } }) => {
  return (
    <Layout>
      <ContactPageTemplate {...page} {...page.frontmatter} />
    </Layout>
  )
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
        contactTextTitle
        text
        locationTitle
        address
        openingHoursTitle
        openingHours
        contactInfoTitle
        contactInfo
      }
    }
  }
`
