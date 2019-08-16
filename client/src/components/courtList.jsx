import React from 'react';

import CourtPreview from './courtPreview';
import CourtDetails from './courtDetails';

//Material UI Components
import { Grid, Typography } from '@material-ui/core';

const CourtList = ({ courts }) => {
  return (
    <Grid item lg={8} sm={6} md={8}>
      <Typography variant="h3">Court List</Typography>
      {courts.map(court => {
        return <CourtDetails court={court} key={court.court_id} />;
      })}
    </Grid>
  );
};
export default CourtList;
