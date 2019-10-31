import React, { Component } from 'react';
import Navbar from './components/layout/NavBar'
import './App.css';

class App extends Component {
  render() {
    return (
    <nav className='navbar bg-primary'>
      <h1>Hello</h1>
      <Navbar title='Github Finder' icon='fab fa-github' />
    </nav>
    );
  }
}

export default App;
