import React from 'react';

//Material UI Components
import { Grid, Typography, Chip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const GetReady = ({ players }) => {
  return (
    <Grid item md={12}>
      <Typography variant="h6" className="getReadyTitle">
        Get Ready
      </Typography>
      {players.map((player, i) => {
        return (
          <Chip
            key={i}
            icon={<FaceIcon />}
            label={player.display_name}
            color="secondary"
            variant="outlined"
          />
        );
      })}
    </Grid>
  );
};

export default GetReady;
