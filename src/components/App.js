import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login';
import Navigation from './Navigation';


class App extends Component {

  componentDidMount() {

    this.props.dispatch(handleInitialData())
  }
  render() {

    
    return (
      <Router>
        <div className='App'>
          {this.props.loading === true
          ? (
            <Route render={() => (
            <Login />
          )} 

          />
          ) : (
            <div>
              <Navigation />
              <Route exact path='/' component={Dashboard} />
            </div>
            
            )
          }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: !authedUser
  }
}

export default connect(mapStateToProps)(App)