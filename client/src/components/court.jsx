import React from 'react';
import axios from 'axios';
import { now } from 'moment';

class Court extends React.Component {
  constructor(props) {
    super(props);
    this.stats = {
      getReady: ["there's no player waiting"],
      playing: ["there's not player playing"],
      game_start: '',
    };
    this.getCourtInfo = this.getCourtInfo.bind(this);
  }
  componentDidMount() {
    this.getCourtInfo();
  }
  getCourtInfo() {
    axios
      .get(`http://localhost:9000/courts/${this.props.court.court_id}`)
      .then(data => {
        console.log(data);
        this.setState(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  startGame() {
    axios
      .get(`http://localhost:9000/courts/${this.props.court.court_id}/start`)
      .then(data => {
        console.log(data);
        this.getCourtInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }
  endGame() {
    axios
      .get(`http://localhost:9000/courts/${this.props.court.court_id}/end`)
      .then(data => {
        console.log(data);
        this.getCourtInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="courtContainer">
        court
        {/* <div className="playingCourt">
          {court.playing.map((player, i) => {
            return (
              <div className="player" key={i}>
                {player}
              </div>
            );
          })}
        </div>
        <div className="getReady">
          <div className="nextGame">Next game starts in {court.game_start}</div>
          <div className="getReadyTitle">Get Ready</div>
          {court.getReady.map((player, i) => {
            return <div key={i}>{player}</div>;
          })}
        </div> */}
      </div>
    );
  }
}
export default Court;
