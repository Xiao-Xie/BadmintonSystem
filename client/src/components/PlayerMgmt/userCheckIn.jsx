import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import ConfirmEndGame from '../CourtMgmt/confirmEndGame';
import GameCountDown from '../CourtMgmt/gameCountDown';
import GetReady from '../CourtMgmt/getReady';
import Playing from '../CourtMgmt/playing';

import UserInQueue from './inQueue';
import CheckinForm from './checkinForm';
import SearchUser from './searchUsers';
import SearchResults from './searchResults';
import MySnackbarContentWrapper from './notification';

import { datapoint } from '../../../../connection_config';

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
      info: '',
      variant: 'success',
      open: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeSnack = this.closeSnack.bind(this);

    // this.getCourtInfo = this.getCourtInfo.bind(this);
    // this.startGame = this.startGame.bind(this);
    // this.endGame = this.endGame.bind(this);
  }
  componentDidMount() {
    this.getUserCheckIn();
    this.getUserInQueue();
  }

  closeSnack() {
    this.setState({ open: false });
  }
  handleClick(user_id, user_name) {
    const url = `${datapoint}checkIn/${user_id}`;
    console.log(url);
    axios
      .post(url)
      .then(data => {
        this.setState({
          info: `Player ${user_name} has been added to waiting list!`,
          open: true,
        });
        this.getUserCheckIn();
        this.getUserInQueue();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSearch(keyword) {
    this.setState({ keyword: keyword }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.getUserCheckIn();
      }
    });
  }
  //users have already checked in//
  getUserInQueue() {
    const url = `${datapoint}getQueue`;
    console.log(url);
    axios
      .get(url)
      .then(data => {
        this.setState({
          inQueue: data.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //users can checkin
  getUserCheckIn() {
    const url = `${datapoint}getCheckin/${this.state.keyword}`;
    console.log(url);
    if (this.state.keyword !== '') {
      axios
        .get(url)
        .then(data => {
          this.setState({
            checkIn: data.data,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ checkIn: [] });
    }
  }
  render() {
    return (
      <Grid item lg={4} sm={6} md={4}>
        <SearchUser handleSearch={this.handleSearch} />
        <SearchResults
          info={this.state.info}
          players={this.state.checkIn}
          handleClick={this.handleClick}
        />
        {/* <CheckinForm user={this.state.selected} /> */}
        <UserInQueue players={this.state.inQueue} />
        <MySnackbarContentWrapper
          message={this.state.info}
          variant={this.state.variant}
          open={this.state.open}
          closeSnack={this.closeSnack}
        />
      </Grid>
    );
  }
}
export default UserCheckIn;
