import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login';
import Navigation from './Navigation';
import QuestionCard from './QuestionCard';
import NewQuestion  from './NewQuestion';
import Leaderboard  from './Leaderboard';
import NotFound from './NotFound'


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
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/questions/bad_id' component={NotFound} />
                <Route path='/questions/:question_id' component={QuestionCard} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route component={NotFound} />
                

              </Switch>
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