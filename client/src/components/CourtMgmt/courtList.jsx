import React from 'react';

import CourtPreview from './courtPreview';
import CourtDetails from './courtDetails';
import CourtInventoryDetails from './courtInventoryDetails';

//Material UI Components
import { Grid, Typography } from '@material-ui/core';

const CourtList = ({ activeCourts, inactiveCourts }) => {
  return (
    <Grid item lg={8} sm={6} md={8}>
      <Typography variant="h3">Active Court List</Typography>
      {activeCourts.map(court => {
        return <CourtDetails court={court} key={court.court_id} />;
      })}
      <Typography variant="h3">Inactive Court List</Typography>
      {inactiveCourts.map(court => {
        return <CourtInventoryDetails court={court} key={court.court_id} />;
      })}
    </Grid>
  );
};
export default CourtList;
