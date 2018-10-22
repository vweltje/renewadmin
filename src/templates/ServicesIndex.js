import React, { Fragment } from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import "./Services.css";

// Export Template for use in CMS preview
export const ServicesTemplate = ({ title }) => {
  return (
    <Fragment>
      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
    </Fragment>
  );
};

// Export Default Services for front-end
const Services = ({ data: { page } }) => {
  return (
    <Layout>
      <ServicesTemplate {...page} {...page.frontmatter} />
    </Layout>
  );
};

export default Services;

export const pageQuery = graphql`
  ## Query for Services data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query Services($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
