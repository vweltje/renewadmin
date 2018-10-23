import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import "./SingleService.css";

// Export Template for use in CMS preview
export const SingleServiceTemplate = ({ title }) => {
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

// Export Default SingleService for front-end
const SingleService = ({ data: { service } }) => {
  return (
    <Layout>
      <SingleServiceTemplate {...service} {...service.frontmatter} />
    </Layout>
  );
};

export default SingleService;

export const pageQuery = graphql`
  ## Query for SingleService data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleService($id: String!) {
    service: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        shortDescription
        description
        image
        infoSection {
          title
          infoblocks {
            title
            description
          }
        }
        getInTouchSection {
          title
          subtitle
          button1 {
            link
            text
          }
          button2 {
            link
            text
          }
        }
      }
    }
  }
`;
