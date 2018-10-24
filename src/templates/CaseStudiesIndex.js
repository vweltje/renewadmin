import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import "./CaseStudies.css";

// Export Template for use in CMS preview
export const CaseStudiesTemplate = ({ title }) => {
  return (
    <main>
      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
    </main>
  );
};

// Export Default CaseStudies for front-end
const CaseStudies = ({ data: { page } }) => {
  return (
    <Layout>
      {/* <CaseStudiesTemplate {...page} {...page.frontmatter} /> */}
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
  }
`;
