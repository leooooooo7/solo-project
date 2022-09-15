import React, { Component } from 'react';
import { render } from 'react-dom';
import '../App.css';
import logo from "../../assets/logo.png"

import Content from './Content';



class App extends React.Component {
  render() {
    return (
      <div>
        <div className="topBar">
          <a href={__dirname}><img className="logo" src={logo} alt="" /></a>
          <ul className="topBarTabs">
            <a href={__dirname}><li>Home</li></a>
            <a href={__dirname + "/snakegame"}><li>Snake Game</li></a>
            <a href={__dirname}><li>Other Things...</li></a>
          </ul>
        </div>
        <Content />
      </div>
    )
  }
}


render(<App />, document.querySelector('#root'));