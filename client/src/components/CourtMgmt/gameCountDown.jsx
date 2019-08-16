import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function GameCountDown({ timeLeft }) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(timeLeft / 10 / (60 * 30));

  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        // if (oldCompleted === 100) {
        //   return 0;
        // }
        return (oldCompleted -= 1 / (3 * 6));
        //const diff = Math.random() * 10;
        //return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      {timeLeft / 10 / (60 * 30)}
      <LinearProgress variant="determinate" value={completed} />
      <br />
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={completed}
      />
    </div>
  );
}
