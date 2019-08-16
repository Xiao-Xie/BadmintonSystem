import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Typography, Paper, Box } from '@material-ui/core';

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

export default function SearchResults({ players }) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = chipToDelete => () => {
    if (chipToDelete.label === 'React') {
      alert('Why would you want to delete React?! :)');
      return;
    }

    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <Box>
      <Typography varbriant="h5">Search Results</Typography>

      <Paper className={classes.root}>
        {players.map(data => {
          let icon;

          if (data.display_name === 'React') {
            icon = <TagFacesIcon />;
          }

          return (
            <Chip
              key={data.id}
              icon={icon}
              label={data.first_name + ' ' + data.last_name}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    </Box>
  );
}
