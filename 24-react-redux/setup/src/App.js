import React, { Component } from 'react';
import './App.css';

import Posts from './components/Posts';
import PostForm from './components/Postform';

class App extends Component {
  render() {
    return (
        <div className="App">
          <PostForm />
          <hr />
          <Posts />
        </div>
    );
  }
}

export default App;
