import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";

import "./HowItWorksPage.css";

// Export Template for use in CMS preview
export const HowItWorksPageTemplate = ({
  title,
  shortDescription,
  description,
  image
}) => {
  const contentData = {
    shortDescription: shortDescription,
    description: description,
    image: image
  };
  return (
    <main>
      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
          <ContentBlock content={contentData} />
        </div>
      </section>
    </main>
  );
};

// Export Default HowItWorksPage for front-end
const HowItWorksPage = ({ data: { page } }) => {
  return (
    <Layout>
      <HowItWorksPageTemplate {...page} {...page.frontmatter} />
    </Layout>
  );
};

export default HowItWorksPage;

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
  }
`;
