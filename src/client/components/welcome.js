import React, { PropTypes } from 'react';

class Welcome extends React.Component {

  static propTypes = {
    phrase: PropTypes.string
  }

  static defaultProps = {
      phrase: 'Hello World'
  }


  render() {
    return (
      <div>{this.props.phrase}</div>
    )
  }
}

export default Welcome