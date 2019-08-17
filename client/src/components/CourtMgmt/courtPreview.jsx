import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import ConfirmEndGame from './confirmEndGame';
import GameCountDown from './gameCountDown';
import GetReady from './getReady';
import Playing from './playing';
import moment from 'moment';

import { Route, Link } from 'react-router';
import DATA_URL from '../../env';

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
      getReady: 0,
      playing: 0,
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
        // if (data.data.playing.length > 0) {
        this.setState({
          playing: data.data.playing.length,
        });
        // }
        // if (data.data.getReady.length > 0) {
        this.setState({ getReady: data.data.getReady.length });
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
        console.log(data);
        this.getCourtInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Grid container item alignItems="flex-start">
        {/* <Route path={`court/:id`} component={Court}  render={props => <Court {...props} extra={someVariable} />}/> */}

        {/* <Link to={`court/${this.props.court.court_id}`}> */}
        <Typography variant="h4">{this.props.court.name}</Typography>
        {/* </Link> */}
        <Typography variant="h5">
          Court Capacity: {this.props.court.capacity}
        </Typography>

        <Typography variant="h5">
          Current Playing: {this.state.playing}
        </Typography>
        <Typography variant="h5">
          Waiting List: {this.state.getReady}
        </Typography>

        <Grid item md={12}>
          {this.state.playing === 0 ? (
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
              <Typography variant="h6" className="nextGame">
                Game Started On: {moment(this.state.game_start).format('LT')}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default Court;
