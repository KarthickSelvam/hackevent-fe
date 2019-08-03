import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  profileContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    width: '100%'
  },
  name: {
    color: '#fff'
  }
});

export default function Profile(props) {
  const classes = useStyles();
  var initials = props.name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return (
    <div className={classes.profileContainer}>
      <Grid container justify="right" alignItems="center">
        <Avatar className={classes.avatar}>{initials}</Avatar>
        <div className={classes.name}>{props.name}</div>
      </Grid>
    </div>
  );
}
