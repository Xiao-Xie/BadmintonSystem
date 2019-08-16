import React from 'react';
import CourtList from './courtList';
import UserCheckIn from './userCheckIn';
import axios from 'axios';

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
      .get('http://localhost:9000/courtlist')
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
