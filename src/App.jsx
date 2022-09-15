import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
// import name from "./filepathAndExtension"
//<img src={name}>



class App extends React.Component {
    render() {
        return (
            <div>
                <div className="topBar">
                    <img className="logo" src="" alt="" /> 
                    <ul className="topBarTabs">
                        <li>Home</li>
                        <li>Snake Game</li>
                        <li>Other Things...</li>
                    </ul>
                </div>
            </div>
        )
    }
}


render(<App />, document.querySelector('#root'));