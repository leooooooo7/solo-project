import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import logo from "../assets/logo.png"
import fav from "../favicon.ico";
import {
  //Routes,
  //Route,
  Link
} from "react-router-dom";

import Content from './components/Content';



class App extends React.Component {
  render() {
    return (
      <div>
        <div className="topBar">
          <Link to='/'><img className="logo" src={logo} alt="" /></Link>
          <ul className="topBarTabs">
            <a href={__dirname}><li>Home</li></a>
            <Link to='/snakegame'><li>Snake Game</li></Link>
            <a href={__dirname}><li>Other Things...</li></a>
          </ul>
        </div>
        <Content />
      </div>
    )
  }
}


export default App;