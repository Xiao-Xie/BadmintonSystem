import React from 'react';

import CourtPreview from './courtPreview';
import CourtDetails from './courtDetails';

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
          return (
            // <div>
            //   <CourtPreview court={court} key={court.court_id} />
            <CourtDetails court={court} key={court.court_id} />
            // </div>
          );
        })}
      </Grid>
    </div>
  );
};
export default CourtList;
