import React from 'react';
import CourtList from './CourtMgmt/courtList';
import UserCheckIn from './PlayerMgmt/userCheckIn';
import axios from 'axios';
const DATA_URL =
  process.env.DATA_URL || 'https://new-bee-sports.herokuapp.com/';

import { Grid } from '@material-ui/core';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courtList: [],
    };
  }
  componentDidMount() {
    this.getActiveCourts();
  }
  getActiveCourts() {
    axios
      .get(`${DATA_URL}courtlist`)
      .then(data => {
        this.setState({
          courtList: data.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Grid
        container
        alignContent="flex-start"
        justify="space-around"
        spacing={5}>
        <UserCheckIn />
        <CourtList courts={this.state.courtList} />
      </Grid>
    );
  }
}
export default App;
