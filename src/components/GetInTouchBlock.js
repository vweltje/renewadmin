import React from 'react'
import { Link } from 'gatsby'
import './GetInTouchBlock.css'

export const GetInTouchBlockTemplate = ({
  title,
  subtitle,
  button1 = {},
  button2 = {}
}) => {
  return (
    <div className="GetInTouchBlock">
      <div>
        <h3>{subtitle}</h3>
        <h2>{title}</h2>
      </div>
      <div>
        {button1 && (
          <Link to={button1.link} className="Button">
            {button1.text}
          </Link>
        )}
        {button2 && (
          <Link to={button2.link} className="Button Secondary">
            {button2.text}
          </Link>
        )}
      </div>
    </div>
  )
}

export default class GetInTouchBlock extends React.Component {
  render() {
    if (this.props.content && Object.keys(this.props.content).length) {
      return <GetInTouchBlockTemplate {...this.props.content} />
    }
    return ''
  }
}
