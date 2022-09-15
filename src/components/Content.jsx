import React, {Component} from 'react';
import {render} from 'react-dom';


class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="selectText">Select which game you would like to play.</div>
        <ul className="gameList">
          <a href={__dirname + "/snakegame"}><li>Snake Game</li></a>
          <a href={__dirname + "/other"}><li>Other Game</li></a>
        </ul>
      </div>
    )
  }
}

export default Content;