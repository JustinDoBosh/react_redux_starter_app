import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as indexActions from '../actions/index_actions'
import Welcome from '../components/welcome'

class Index extends React.Component {

  componentDidMount = () => {
    this.props.setPhrase('Hello World!!!')
  }

  render(){
    const {phrase} = this.props

    return(
        <Welcome phrase={phrase}/>
    )
  }
}


function mapStateToProps(state){
  return {
    phrase: state.index.phrase
  }
}

export default connect(mapStateToProps, {
  setPhrase: indexActions.setPhrase
})(Index)