import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/NavBar'
import Search from './components/users/Search'
import Users from './components/users/Users'
import User from './components/users/User'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import './App.css';

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, showAlert] = useState(null)

  // Search Github Users
  const searchUsers = async text => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`) 
      .then (res => {
        setUsers(res.data.items);
        setLoading(false);})
      .catch(err => {
        console.log(err.response)
      })
  }

  
  // Get Single Github User
  const getUser = async username => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`) 
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  
  // Get Users Repos
  const getUserRepos = async username => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`) 
      .then(res => {
        setRepos(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  // Clear Users from State
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // Set Alert
  const setAlert = (msg, type) => {
    showAlert({ msg, type });
    
    setTimeout(() => showAlert(null), 1000);
  }

    return (
    <Router>
      <div className="App">
        <Navbar title='Github Finder' icon='fab fa-github' />

        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users 
                  loading={loading} 
                  users={users}
                />
              </Fragment>
            )} />
            
            <Route exact path='/about' component={About} />
            
            <Route exact path='/user/:login' render={props => (
              <User 
                { ...props } 
                getUser={getUser} 
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading} />
            )} />
          </Switch>
          
        </div>
      </div>
    </Router>
    );
  
}

export default App;
