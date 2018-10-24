import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Image from "../components/Image";
import GetInTouchBlock from "../components/GetInTouchBlock";

import "./CaseStudies.css";

export const niceTitle = title => {
  title = title.replace("[", "<span>");
  title = title.replace("]", "</span>");
  return title;
};

// Export Template for use in CMS preview
export const CaseStudiesTemplate = ({
  businessesSection = {},
  titleSection = {},
  getInTouchSection = {}
}) => {
  return (
    <main>
      <section className="section CaseStudies--TitleSection">
        <div className="container">
          <div className="blockSmaller">
            <h1
              dangerouslySetInnerHTML={{
                __html: niceTitle(titleSection.title)
              }}
            />
            <p className="larger">{titleSection.shortDescription}</p>
            <p>{titleSection.description}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">blocks are comming!!!!</div>
      </section>
      <section className="section CaseStudies--BusinessLogos">
        <div className="container">
          <h2>{businessesSection.title}</h2>
          <div>
            {businessesSection.logos.map((logo, index) => {
              return (
                <Image
                  src={logo}
                  alt={"Logo " + index}
                  key={"BusinessLogo-" + index}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className="section Service--Contact">
        <div className="container">
          <GetInTouchBlock content={getInTouchSection} />
        </div>
      </section>
    </main>
  );
};

// Export Default CaseStudies for front-end
const CaseStudies = ({ data }) => {
  const page = {
    ...data.page,
    getInTouchSection: data.sectionContact
  };
  return (
    <Layout>
      <CaseStudiesTemplate {...page} {...page.frontmatter} />
    </Layout>
  );
};

export default CaseStudies;

export const pageQuery = graphql`
  ## Query for CaseStudies data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query CaseStudies($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        titleSection {
          title
          shortDescription
          description
        }
        businessesSection {
          title
          logos
        }
      }
    }
    sectionContact: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "repeatableContent" } } }
    ) {
      edges {
        node {
          frontmatter {
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
`;
