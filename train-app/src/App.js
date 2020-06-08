import React from 'react';
import Home from './components/home/home'
import Train from './components/train/train'
import Navbar from './components/navbar/navbar'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
    <div className="App">
      
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/:id" exact component={Train}/>
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
