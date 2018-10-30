import React from 'react'
import { Link } from 'gatsby'
import Image from './Image'

import './ContentBlock.css'

export const Block = ({
  button = [],
  description,
  image,
  shortDescription,
  title
}) => {
  return (
    <div className="container ContentBlock">
      <div>
        {(() => {
          if (title) return <h2>{title}</h2>
        })()}
        <p className="larger">{shortDescription}</p>
        <p>{description}</p>
        {(() => {
          if (button.length !== 0) {
            return (
              <Link className="Button Secondary" to={button.link}>
                {button.text}
              </Link>
            )
          }
        })()}
      </div>
      <div>
        <Image src={image} alt={title ? title : 'illustration'} />
      </div>
    </div>
  )
}

export default ({ content, multiple = false }) => {
  if (multiple) {
    return (
      <section className="section content">
        {!!content &&
          content.map((item, index) => {
            return <Block key={'contentBlock-' + index} {...item} />
          })}
      </section>
    )
  } else {
    return (
      <section className="section content">
        <Block {...content} />
      </section>
    )
  }
}
