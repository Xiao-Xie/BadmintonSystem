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
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // this.getCourtInfo = this.getCourtInfo.bind(this);
    // this.startGame = this.startGame.bind(this);
    // this.endGame = this.endGame.bind(this);
  }
  componentDidMount() {
    this.getUserCheckIn();
    this.getUserInQueue();
  }

  handleClick(userID) {
    alert(userID);
    // axios
    //   .post(`http://localhost:9000/checkIn/${userID}`)
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
  //users have already checked in
  getUserInQueue() {
    axios
      .get(`http://localhost:9000/getQueue`)
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
    if (this.state.keyword !== '') {
      axios
        .get(`http://localhost:9000/getCheckin/${this.state.keyword}`)
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
          players={this.state.checkIn}
          handleClick={this.handleClick}
        />
        <CheckinForm user={this.state.selected} />
        <UserInQueue players={this.state.inQueue} />
      </Grid>
    );
  }
}
export default UserCheckIn;
