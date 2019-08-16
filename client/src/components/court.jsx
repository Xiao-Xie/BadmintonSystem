import React from 'react';
import axios from 'axios';
import { now } from 'moment';

class Court extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getReady: [],
      playing: [],
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
        if (data.data.playing.length > 0) {
          this.setState({ playing: data.data.playing });
        }
        if (data.data.getReady.length > 0) {
          this.setState({ getReady: data.data.getReady });
        }
        //this.setState(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  startGame() {
    axios
      .put(`http://localhost:9000/courts/${this.props.court.court_id}/start`)
      .then(data => {
        this.getCourtInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }
  endGame() {
    axios
      .put(`http://localhost:9000/courts/${this.props.court.court_id}/end`)
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
        {this.state.playing.length === 0 ? (
          <button
            className="startGame"
            onClick={() => {
              this.startGame();
            }}>
            Start Game
          </button>
        ) : (
          <button
            className="endGame"
            onClick={() => {
              this.endGame();
            }}>
            End Game
          </button>
        )}

        {this.props.court.name}
        {this.props.court.capacity}

        <div className="playingCourt">
          {this.state.playing.map((player, i) => {
            return (
              <div className="player" key={i}>
                {player.display_name}
              </div>
            );
          })}
        </div>
        <div className="getReady">
          <div className="nextGame">Next game starts in </div>
          <div className="getReadyTitle">Get Ready</div>
          {this.state.getReady.map((player, i) => {
            return (
              <div className="player" key={i}>
                {player.display_name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Court;
