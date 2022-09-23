import React, {Component} from 'react';
import {render} from 'react-dom';
import {Routes, Route, Link} from 'react-router-dom';

// import SelectGame from './SelectGame';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="selectText">Select which game you would like to play.</div>
        <Routes>
          <Route path='/' element={<SelectGame />} />

          <Route path='/snakegame' element={<SnakeGame />} />
        </Routes>
      </div>
    )
  }
}

function SelectGame() {
  return (
    <ul className="gameList">
      <Link to='snakegame'><li>Snake Game</li></Link>
      <Link to='other'><li>Other Game</li></Link>
    </ul>
  )
};

function SnakeGame() {
  return (
    <ul className="gameList">
      <Link to='snakegame'><li>Snake Game</li></Link>
      <Link to='other'><li>Other Game</li></Link>
    </ul>
  )
};

export default Content;