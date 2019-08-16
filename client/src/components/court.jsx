import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import ConfirmEndGame from './confirmEndGame';
import GameCountDown from './gameCountDown';
import GetReady from './getReady';
import Playing from './playing';

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
      .get(`http://localhost:9000/courts/${this.props.court.court_id}`)
      .then(data => {
        // if (data.data.playing.length > 0) {
        this.setState({
          playing: data.data.playing,
        });
        // }
        // if (data.data.getReady.length > 0) {
        this.setState({ getReady: data.data.getReady });
        // }
        if (data.data.playing.length > 0) {
          this.setState({
            game_start: Date.parse(data.data.playing[0].game_start),
          });
        } else {
          this.setState({
            game_start: '',
          });
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
      <Grid container item md={3} alignItems="flex-start">
        <Typography variant="h4">{this.props.court.name}</Typography>

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
              {/* <Button
                className="endGame"
                onClick={() => {
                  //alert(this.props.court.court_id);
                  this.endGame();
                }}>
                End Game
              </Button> */}
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
                  }}
                />
              </Typography>
              {/* <GameCountDown
                timeLeft={this.state.game_start + 1000 * 60 * 30 - Date.now()}
              /> */}
              {/* <LinearProgress
                color="secondary"
                variant="determinate"
                value={12}
              /> */}
            </>
          )}
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5">{this.props.court.capacity}</Typography>
        </Grid>
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
        {/* <Grid item md={12} />
        <Grid item className="playingCourt" md={12}>
         
        </Grid> */}
      </Grid>
    );
  }
}
export default Court;
