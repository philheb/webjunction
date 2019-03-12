import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import Navbar from './components/Layout/Navbar/Navbar'
import Landing from './components/Layout/Landing/Landing'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Footer from './components/Layout/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard'

import './App.css'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //Decode token and get user info and expiration
  const decoded = jwtDecode(localStorage.jwtToken)
  // Set use and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser())
    //Clear current profile
    store.dispatch(clearCurrentProfile())

    //Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                {/* Cannot access private route if not logged in */}
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
