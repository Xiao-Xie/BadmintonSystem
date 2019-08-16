import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import ConfirmEndGame from './confirmEndGame';
import GameCountDown from './gameCountDown';
import GetReady from './getReady';
import Playing from './playing';

import UserInQueue from './inQueue';
import CheckinForm from './checkinForm';
import SearchUser from './searchUsers';
import SearchResults from './searchResults';

//Material UI Components
import {
  Grid,
  Button,
  Typography,
  Chip,
  LinearProgress,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

class UserCheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inQueue: [],
      checkIn: [],
      keyword: '',
    };
    // this.getCourtInfo = this.getCourtInfo.bind(this);
    // this.startGame = this.startGame.bind(this);
    // this.endGame = this.endGame.bind(this);
  }
  componentDidMount() {
    this.getUserCheckIn();
    this.getUserInQueue();
  }
  handleSeach(keyword) {
    getUserCheckIn(keyword);
  }
  //users have already checked in
  getUserInQueue() {
    axios
      .get(`http://localhost:9000/getQueue`)
      .then(data => {
        console.log(data);
        this.setState({
          inQueue: data.data,
        });
      })
      .catch(err => {
        console.err(err);
      });
  }
  //users can checkin
  getUserCheckIn(keyword) {
    axios
      .get(`http://localhost:9000/getCheckin/${this.state.keyword}`)
      .then(data => {
        console.log(data);
        this.setState({
          checkIn: data.data,
        });
      })
      .catch(err => {
        console.err(err);
      });
  }
  render() {
    return (
      <Grid item lg={4} sm={6} md={4}>
        <SearchUser />
        <SearchResults players={this.state.checkIn} />
        <CheckinForm user={this.state.selected} />
        <UserInQueue players={this.state.inQueue} />
      </Grid>
    );
  }
}
export default UserCheckIn;
