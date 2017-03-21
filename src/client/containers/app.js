import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory} from 'react-router'

class App extends React.Component {

  render(){

    const { children } = this.props

    return(
      <div>
        { children }
      </div>
    )
  }
}


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, {

})(App)
