import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Typography, Paper, Box, Avatar } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function SearchResults({ players, handleClick, info }) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  return (
    <Box>
      <Typography variant="h4">Search Results</Typography>

      {players.length > 0 ? (
        <Paper className={classes.root}>
          {players.map(data => {
            return (
              <Chip
                key={data.id}
                value={data.user_id}
                icon={<FaceIcon />}
                label={data.first_name + ' ' + data.last_name}
                clickable
                className={classes.chip}
                color="primary"
                deleteIcon={<DoneIcon />}
                variant="outlined"
                onClick={e => {
                  handleClick(data.id, data.first_name);
                }}
                onDelete={handleClick}
              />
            );
          })}
        </Paper>
      ) : (
        <Typography>Not player</Typography>
      )}
    </Box>
  );
}
