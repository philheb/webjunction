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
import CreateProfile from './components/CreateProfile/CreateProfile'
import EditProfile from './components/EditProfile/EditProfile'
import AddExperience from './components/AddExperience/AddExperience'
import AddEducation from './components/AddEducation/AddEducation'
import Profiles from './components/Profiles/Profiles'
import Profile from './components/Profile/Profile'
import NotFound from './components/NotFound/NotFound'
import Posts from './components/Posts/Posts'

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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              {/* Cannot access private route if not logged in */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Route exact path="/notfound" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
