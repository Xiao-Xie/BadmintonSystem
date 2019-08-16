import React from 'react';

import Court from './court';

//Material UI Components
import { Grid } from '@material-ui/core';

const CourtList = ({ courts }) => {
  return (
    <div className="courtList">
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start">
        {courts.map(court => {
          return <Court court={court} key={court.court_id} />;
        })}
      </Grid>
    </div>
  );
};
export default CourtList;
