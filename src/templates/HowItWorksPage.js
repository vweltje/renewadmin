import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import ServicesGrid from '../components/ServicesGrid'

import './HowItWorksPage.css'

export class StepSection extends React.Component {
  static defaultProps = {
    services: {}
  }

  state = {
    activeService: 0
  }

  handleServiceNavClick = index => {
    const activeService =
      this.state.activeService === index ? this.state.activeService : index
    this.setState({ activeService })
  }

  getIconSrc(slug) {
    let icon
    if (slug.includes('account-payable')) icon = 'payable'
    else if (slug.includes('accounts-receivable')) icon = 'receive'
    else if (slug.includes('bas')) icon = 'bas'
    else if (slug.includes('month-end')) icon = 'month'
    else if (slug.includes('payg')) icon = 'pay'
    else if (slug.includes('payroll')) icon = 'payroll'
    else if (slug.includes('reconciliations')) icon = 'reconciliantion'
    else if (slug.includes('superannuation')) icon = 'super'
    else if (slug.includes('work-flow-efficiency')) icon = 'flow'
    return icon
  }

  render() {
    let services =
      !!this.props.services &&
      this.props.services.length &&
      this.props.services.filter(item => item.status === 'Featured')

    return (
      <div className="ServiceSteps">
        <div className="ServiceStepsNav">
          {!!services &&
            services.map((service, i) => {
              return (
                <div
                  className={
                    'ServiceNavItem ' +
                    (this.state.activeService === i ? 'active' : '')
                  }
                  key={'ServiceNavItem-' + i}
                  onClick={() => this.handleServiceNavClick(i)}
                >
                  <div
                    className={'Service--Icon ' + this.getIconSrc(service.slug)}
                  />
                  <span>{service.title}</span>
                </div>
              )
            })}
        </div>
        <div className="ServiceStepsContentBlocks">
          {!!services &&
            services.map((service, i) => {
              return (
                <div
                  className={
                    'ServiceStepsContentBlock ' +
                    (this.state.activeService === i ? 'active' : '')
                  }
                  key={'ServiceStepsContentBlock-' + i}
                >
                  {service.howItWorks.steps.map((step, num) => {
                    return (
                      <div
                        className="ServiceStepsContentBlockItem"
                        key={'step-' + num}
                      >
                        <span>{num + 1}</span>
                        <p>{step.title}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

// Export Template for use in CMS preview
export const HowItWorksPageTemplate = ({
  title,
  shortDescription,
  description,
  image,
  services
}) => {
  const contentData = {
    shortDescription: shortDescription,
    description: description,
    image: image
  }

  return (
    <main>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
          <ContentBlock content={contentData} />
          {!!services &&
            services.length && (
              <Fragment>
                <section className="section Home--CaseStudiesSection">
                  <div className="container">
                    <StepSection services={services} />
                  </div>
                </section>
                <ServicesGrid services={services} />
              </Fragment>
            )}
        </div>
      </section>
    </main>
  )
}

// Export Default HowItWorksPage for front-end
const HowItWorksPage = ({ data }) => {
  const page = data.page
  let services = []
  data.services.edges.map((service, index) => {
    return services.push({
      ...service.node.fields,
      ...service.node.frontmatter
    })
  })
  return (
    <Layout>
      <HowItWorksPageTemplate
        {...page}
        {...page.frontmatter}
        services={services}
      />
    </Layout>
  )
}

export default HowItWorksPage

export const pageQuery = graphql`
  ## Query for HowItWorksPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HowItWorksPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        shortDescription
        description
        image
      }
    }
    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            status
            shortDescription
            howItWorks {
              steps {
                title
              }
            }
          }
        }
      }
    }
  }
`
