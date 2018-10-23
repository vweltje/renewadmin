import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";
import ServicesGrid from "../components/ServicesGrid";
import InlineBanner from "../components/InlineBanner";
import "./Services.css";

// Export Template for use in CMS preview
export const ServicesTemplate = ({
  title,
  shortDescription,
  description,
  image,
  inlineBanner,
  services = {}
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
          <ServicesGrid services={services} />
          {inlineBanner && <InlineBanner className="light" {...inlineBanner} />}
        </div>
      </section>
    </main>
  );
};

// Export Default Services for front-end
const Services = ({ data }) => {
  const page = data.page;
  let services = [];
  data.services.edges.map((service, index) => {
    return services.push({
      ...service.node.fields,
      ...service.node.frontmatter
    });
  });
  return (
    <Layout>
      <ServicesTemplate {...page} {...page.frontmatter} services={services} />
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
        shortDescription
        description
        image
        inlineBanner {
          background
          button {
            link
            text
          }
          title
          description
        }
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
            shortDescription
          }
        }
      }
    }
  }
`;
