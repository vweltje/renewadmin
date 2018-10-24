import React from "react";
import { graphql, Link } from "gatsby";

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
  return (
    <main>
      <section className="section Service--TitleSection">
        <div className="container">
          <ContentBlock content={blockData} />
        </div>
      </section>
      <section className="section Service--Info">
        <div className="container">
          <h3 className="taCenter">{infoSection.title}</h3>
          <Accordion items={infoSection.infoblocks} />
        </div>
      </section>
      <section className="section Service--Contact">
        <div className="container">
          <div className="Service--ContactBlock">
            <div>
              <h3>{getInTouchSection.subtitle}</h3>
              <h2>{getInTouchSection.title}</h2>
            </div>
            <div>
              {getInTouchSection.button1 && (
                <Link to={getInTouchSection.button1.link} className="Button">
                  {getInTouchSection.button1.text}
                </Link>
              )}
              {getInTouchSection.button2 && (
                <Link
                  to={getInTouchSection.button2.link}
                  className="Button Secondary"
                >
                  {getInTouchSection.button2.text}
                </Link>
              )}
            </div>
          </div>
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
