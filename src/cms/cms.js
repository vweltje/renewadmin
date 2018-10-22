import React from "react";
import CMS from "netlify-cms";
import "./cms-utils";

import { HomePageTemplate } from "../templates/HomePage";
import { AboutPageTemplate } from "../templates/AboutPage";
import { ContactPageTemplate } from "../templates/ContactPage";
import { ServicesTemplate } from "../templates/ServicesIndex";

if (
  window.location.hostname === "localhost" &&
  window.localStorage.getItem("netlifySiteURL")
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem("netlifySiteURL") + "/styles.css"
  );
} else {
  CMS.registerPreviewStyle("/styles.css");
}

CMS.registerPreviewTemplate("home-page", ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
));

CMS.registerPreviewTemplate("about-page", ({ entry }) => (
  <AboutPageTemplate {...entry.toJS().data} />
));

CMS.registerPreviewTemplate("contact-page", ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
));

CMS.registerPreviewTemplate("services-index", ({ entry }) => (
  <ServicesTemplate {...entry.toJS().data} />
));
