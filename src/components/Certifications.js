import React from 'react'
import Image from '../components/Image'

const Certifications = ({ title, shortDescription, description, logos }) => {
  return (
    <section className="section Home--CertificationsSection">
      <div className="container ContentBlock">
        <div>
          <h2>{title}</h2>
          <p className="larger">{shortDescription}</p>
          <p>{description}</p>
        </div>
        <div>
          <div>
            {logos &&
              logos.map((src, index) => {
                return (
                  <Image
                    className="logo"
                    src={src}
                    alt={'Logo ' + index}
                    key={'certificationsLogo ' + index}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications
