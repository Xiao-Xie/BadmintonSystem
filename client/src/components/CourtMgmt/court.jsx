import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import ConfirmEndGame from './confirmEndGame';
import GameCountDown from './gameCountDown';
import GetReady from './getReady';
import Playing from './playing';
const DATA_URL =
  process.env.DATA_URL || 'https://new-bee-sports.herokuapp.com/';

//Material UI Components
import {
  Grid,
  Button,
  Typography,
  Chip,
  LinearProgress,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

class Court extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getReady: [],
      playing: [],
      game_start: '',
      init: true,
    };
    this.getCourtInfo = this.getCourtInfo.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }
  componentDidMount() {
    this.getCourtInfo();
  }
  getCourtInfo() {
    axios
      .get(`${DATA_URL}courts/${this.props.court.court_id}`)
      .then(data => {
        this.setState({
          playing: data.data.playing,
        });
        this.setState({ getReady: data.data.getReady });
        if (data.data.playing.length > 0) {
          this.setState({
            game_start: Date.parse(data.data.playing[0].game_start),
          });
        } else {
          this.setState({
            game_start: '',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  startGame() {
    axios
      .put(`${DATA_URL}courts/${this.props.court.court_id}/start`)
      .then(data => {
        this.getCourtInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }
  endGame() {
    axios
      .put(`${DATA_URL}courts/${this.props.court.court_id}/end`)
      .then(data => {
        this.getCourtInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Grid container item alignItems="flex-start" justify="flex-start">
        {/* <Typography variant="h4">{this.props.court.name}</Typography> */}

        <Grid item md={12}>
          {this.state.playing.length === 0 ? (
            <Button
              className="startGame"
              variant="outlined"
              color="primary"
              onClick={() => {
                this.startGame();
              }}>
              Start Game
            </Button>
          ) : (
            <>
              <ConfirmEndGame
                endGame={this.endGame}
                timeLeft={this.state.game_start + 1000 * 60 * 30}
              />
              <Typography variant="h6" className="nextGame">
                Next game starts in
                <Countdown
                  date={this.state.game_start + 1000 * 60 * 30}
                  onComplete={() => {
                    this.endGame();
                    if (this.getReady.length === this.props.court.capacity) {
                      this.startGame();
                    }
                  }}
                />
              </Typography>
            </>
          )}
        </Grid>
        {/* <Grid item md={12}>
          <Typography variant="h5">{this.props.court.capacity}</Typography>
        </Grid> */}
        {this.state.getReady.length > 0 ? (
          <GetReady players={this.state.getReady} />
        ) : (
          <></>
        )}
        {this.state.playing.length > 0 ? (
          <Playing players={this.state.playing} />
        ) : (
          <></>
        )}
      </Grid>
    );
  }
}
export default Court;
