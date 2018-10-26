import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { AboutPageTemplate } from '../templates/AboutPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { ServicesTemplate } from '../templates/ServicesIndex'
import { CaseStudiesIndex } from '../templates/CaseStudiesIndex'
import { HowItWorksPage } from '../templates/HowItWorksPage'
import { NewsIndex } from '../templates/NewsIndex'
import { SingleService } from '../templates/SingleService'
import { NewsItem } from '../templates/SingleNewsItem'

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
  <CaseStudiesIndex {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('how-it-works-page', ({ entry }) => (
  <HowItWorksPage {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('news-index', ({ entry }) => (
  <NewsIndex {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('single-service', ({ entry }) => (
  <SingleService {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('news', ({ entry }) => (
  <NewsItem {...entry.toJS().data} />
))
