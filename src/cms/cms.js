import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { AboutPageTemplate } from '../templates/AboutPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { ServicesTemplate } from '../templates/ServicesIndex'
import { CaseStudiesTemplate } from '../templates/CaseStudiesIndex'
import { HowItWorksPageTemplate } from '../templates/HowItWorksPage'
import { NewsTemplate } from '../templates/NewsIndex'
import { SingleServiceTemplate } from '../templates/SingleService'
import { SingleCaseStudieTemplate } from '../templates/SingleCaseStudie'
import { SingleNewsItemTemplate } from '../templates/SingleNewsItem'

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('about-page', ({ entry }) => (
  <AboutPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('services-index', ({ entry }) => (
  <ServicesTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('case-studies-index', ({ entry }) => (
  <CaseStudiesTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('case-studie-page', ({ entry }) => (
  <CaseStudiesTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('how-it-works-page', ({ entry }) => (
  <HowItWorksPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('news-index', ({ entry }) => (
  <NewsTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('single-service-page', ({ entry }) => (
  <CaseStudiesTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('service', ({ entry }) => (
  <SingleServiceTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('case-studie', ({ entry }) => (
  <SingleCaseStudieTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('news', ({ entry }) => (
  <SingleNewsItemTemplate {...entry.toJS().data} />
))
