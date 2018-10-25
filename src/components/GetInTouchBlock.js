import React from 'react'
import { Link } from 'gatsby'
import './GetInTouchBlock.css'

export default class GetInTouchBlock extends React.Component {
  render() {
    const getInTouchSection = this.props.content
    console.log(getInTouchSection)
    return (
      <div className="GetInTouchBlock">
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
    )
  }
}
