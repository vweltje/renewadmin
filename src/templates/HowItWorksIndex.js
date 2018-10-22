import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import "./HowItWorks.css";

// Export Template for use in CMS preview
export const HowItWorksTemplate = ({ title }) => {
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

// Export Default HowItWorks for front-end
const HowItWorks = ({ data: { page } }) => {
  return (
    <Layout>
      <HowItWorksTemplate {...page} {...page.frontmatter} />
    </Layout>
  );
};

export default HowItWorks;

export const pageQuery = graphql`
  ## Query for HowItWorks data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HowItWorks($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
