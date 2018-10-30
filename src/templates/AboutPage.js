import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content from '../components/Content'
import ContentBlock from '../components/ContentBlock'
import InlineBanner from '../components/InlineBanner'
import Image from '../components/Image'
import ShareWidget from '../components/ShareWidget'
import CertificationsSection from '../components/Certifications'

import './AboutPage.css'

// Export Template for use in CMS preview
export class AboutPageTemplate extends React.Component {
  static defaultProps = {
    title: '',
    shortDescription: '',
    description: '',
    image: '',
    teamTitle: '',
    servicesSection: {},
    inlineBanner: {},
    certificationsSection: {},
    team: {}
  }

  state = {
    activePopup: null
  }

  handlePopup = memberIndex => {
    const activePopup =
      this.state.activePopup === memberIndex ? null : memberIndex
    this.setState({ activePopup })
  }

  render() {
    const page = { ...this.props }

    const contentData = {
      shortDescription: page.shortDescription,
      description: page.description,
      image: page.image
    }

    return (
      <main>
        <Helmet>
          <title>{page.title}</title>
        </Helmet>

        {!!contentData && (
          <section className="section About--TitleSection">
            <div className="container">
              <h1>{page.title}</h1>
              <ContentBlock content={contentData} />
            </div>
          </section>
        )}

        {!!page.team && (
          <section className="section About--Team">
            <div className="container">
              <h1>{page.teamTitle}</h1>
              <div className="About--teamBlocks">
                {page.team.length &&
                  page.team.map((member, i) => {
                    return (
                      <Fragment key={'f-' + i}>
                        <div
                          className="About--TeamMember"
                          key={'teamMember-' + i}
                        >
                          <Image src={member.photo} alt={member.title} />
                          <div>
                            <h3>{member.title}</h3>
                            <span>{member.function}</span>
                            <button
                              className="Button Secondary"
                              onClick={() => this.handlePopup(i)}
                            >
                              know more
                            </button>
                            <ShareWidget heading={''} />
                          </div>
                        </div>
                        <div
                          className={
                            'About--TeamPopover ' +
                            (this.state.activePopup === i ? 'active' : '')
                          }
                          key={'teamMemberPopover-' + i}
                        >
                          <div className="About--TeamPopoverContent">
                            <Image src={member.photo} alt={member.title} />
                            <button
                              className="About--TeamPopoverContentClose"
                              onClick={() => this.handlePopup(i)}
                            />
                            <div>
                              <h3>{member.title}</h3>
                              <span>{member.function}</span>
                              <div className="About--TeamPopoverContentSplitVieuw">
                                <div>
                                  <h4>Bio</h4>
                                  <p>{member.bio}</p>
                                  <ShareWidget
                                    heading={'Folow ' + member.title}
                                  />
                                </div>
                                <div>
                                  <Content source={member.additionalInfo} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )
                  })}
              </div>
            </div>
          </section>
        )}

        {!!page.servicesSection && (
          <section className="section About--Services">
            <div className="container">
              <h1>{page.servicesSection.title}</h1>
              <p className="taCenter">{page.servicesSection.description}</p>
            </div>
          </section>
        )}

        {!!page.inlineBanner && (
          <InlineBanner className="light" {...page.inlineBanner} />
        )}

        {!!page.certificationsSection && (
          <CertificationsSection {...page.certificationsSection} />
        )}
      </main>
    )
  }
}

// Export Default AboutPage for front-end
const AboutPage = ({ data: { page, teamMembers } }) => {
  return (
    <Layout>
      <AboutPageTemplate
        {...page}
        {...page.frontmatter}
        team={teamMembers.edges.map(edge => ({
          ...edge.node.frontmatter,
          ...edge.node.fields
        }))}
      />
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  ## Query for AboutPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        shortDescription
        description
        image
        teamTitle
        servicesSection {
          title
          description
        }
        inlineBanner {
          background
          button {
            link
            text
          }
          title
          description
        }
        certificationsSection {
          logos
          description
          shortDescription
          title
        }
      }
    }
    teamMembers: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "teamMembers" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            photo
            function
            bio
            socialMediaLinks {
              googlePlus
              linkedin
              twitter
            }
            additionalInfo
          }
        }
      }
    }
  }
`
