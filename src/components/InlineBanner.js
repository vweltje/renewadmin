import React from 'react'
import { Link } from 'gatsby'
import Image from './Image'

import './InlineBanner.css'

export default ({ background, button = [], description, title, className }) => {
  return (
    <section className="section">
      <div className={`container InlineBanner ${className}`}>
        <Image
          background
          src={background}
          alt="InlineBanner background"
          className="BackgroundOverlay soft"
        />
        <div className="BannerContent">
          <h2 className="taCenter">{title}</h2>
          <p className="taCenter larger">{description}</p>
          <Link to={button.link} className="Button Quaternary">
            {button.text}
          </Link>
        </div>
      </div>
    </section>
  )
}
