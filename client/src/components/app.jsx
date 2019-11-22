import React from 'react';
import CourtList from './CourtMgmt/courtList';
import UserCheckIn from './PlayerMgmt/userCheckIn';
import axios from 'axios';

import url from '../../../connection_config';
const datapoint = url.API_URL;

import { Grid } from '@material-ui/core';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inActiveCourtList: [],
      activeCourtList: [],
    };
  }
  componentDidMount() {
    this.getActiveCourts();
    this.getInActiveCourts();
  }
  getActiveCourts() {
    axios
      .get(`${datapoint}/courts/active`)
      .then(data => {
        this.setState({
          activeCourtList: data.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getInActiveCourts() {
    axios
      .get(`${datapoint}/courts/inventory`)
      .then(data => {
        this.setState({
          inActiveCourtList: data.data,
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
        <CourtList activeCourts={this.state.activeCourtList} inactiveCourts={this.state.inActiveCourtList} />
      </Grid>
    );
  }
}
export default App;
