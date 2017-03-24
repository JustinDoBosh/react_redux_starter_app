import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory} from 'react-router'
import { Navbar, NavbarLink } from 'reactables'

class App extends React.Component {

  render(){
    const { children, routing } = this.props
    const path = routing.pathname.split('/')
    console.log('path[1]: ', path[1])
    const styles = {
      navbar: {
        base: {
          backgroundColor: '#2c3e50',
          height: 40,
          position: 'relative'
        },
        bar: {
          height: 40
        }
      },
      navLinks: {
        link: {
          active: {
            backgroundColor: '#2c3e50'
          }
        }
      }
    }
    return(
      <div>
        <Navbar style={ styles.navbar }>
          <NavbarLink 
            to='/test'
            isActive={ path[1] === '/test'}
            styles={ styles.navLinks }>
            test 
            </NavbarLink>
        </Navbar>
        <div style={ { marginTop: 10 } }>
          { children }
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    routing: state.routing.locationBeforeTransitions
  }
}

export default connect(mapStateToProps, {

})(App)
