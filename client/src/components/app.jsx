import React from 'react';
import CourtList from './CourtMgmt/courtList';
import UserCheckIn from './PlayerMgmt/userCheckIn';
import axios from 'axios';
import { datapoint } from '../../../connection_config';

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
      .get(`${datapoint}courtlist`)
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
