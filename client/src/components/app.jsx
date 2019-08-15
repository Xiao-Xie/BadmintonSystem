import React from 'react';
import CourtList from './courtList';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courtList: [
        {
          courtid: 1,
          courtname: 'court_one',
          getReady: ['apple', 'orange', 'banana', 'grape'],
          playing: ['golden doodle', 'corgi', 'husky', 'alaska'],
          game_start: '',
        },
        {
          courtid: 2,
          courtname: 'court_two',
          getReady: ['snoopy', 'kitty', 'sheep', 'lion'],
          playing: ['doodle', 'cat', 'fish', 'monkey'],
          game_start: '',
        },
        {
          courtid: 3,
          courtname: 'court_three',
          getReady: ['guest2', 'guest1', 'guest5', 'guest9'],
          playing: ['guest8', 'guest4', 'guest0', 'guest3'],
          game_start: '',
        },
      ],
    };
  }
  componentDidMount() {
    this.getActiveCourts();
  }
  getActiveCourts() {}
  render() {
    return (
      <div>
        <CourtList courts={this.state.courtList} />
      </div>
    );
  }
}
export default App;
