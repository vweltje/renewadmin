import { Component } from 'react'

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.body.scroll(0, 0)
    }
  }

  componentDidMount() {
    document.body.scroll(0, 0)
  }

  render() {
    return this.props.children || null
  }
}

export default ScrollToTop
