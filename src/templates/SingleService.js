import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";
import Accordion from "../components/Accordion";
import "./SingleService.css";

// Export Template for use in CMS preview
export const SingleServiceTemplate = ({
  title,
  shortDescription,
  description,
  image,
  infoSection = {},
  getInTouchSection = {}
}) => {
  const blockData = {
    title: title,
    shortDescription: shortDescription,
    description: description,
    image: image
  };
  console.log(infoSection);
  return (
    <main>
      <section className="section Service--TitleSection">
        <div className="container">
          <ContentBlock content={blockData} />
        </div>
      </section>
      <section className="section Service--Info">
        <div className="container">
          <h3 class="taCenter">{infoSection.title}</h3>
          <Accordion items={infoSection.infoblocks} />
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
