import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { socketConnect } from 'socket.io-react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import image from '../../assets/img/background-image.jpg';
import Call from '../../components/Agora';
import Profile from '../../components/Profile/profile';
import Timer from '../../components/Timer';
import Highlighter from 'react-highlight-words';

const styles = () => ({
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center'
  },
  card: {
    width: 275,
    margin: 10
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  content: {
    background:
      '-moz-linear-gradient(267deg, rgba(255,255,255,1) 0%, rgba(133,133,133,1) 100%);' /* ff3.6+ */,
    background:
      '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(100%, rgba(133,133,133,1)));' /* safari4+,chrome */,
    background:
      '-webkit-linear-gradient(267deg, rgba(255,255,255,1) 0%, rgba(133,133,133,1) 100%);' /* safari5.1+,chrome10+ */,
    background:
      '-o-linear-gradient(267deg, rgba(255,255,255,1) 0%, rgba(133,133,133,1) 100%);' /* opera 11.10+ */,
    background:
      '-ms-linear-gradient(267deg, rgba(255,255,255,1) 0%, rgba(133,133,133,1) 100%);' /* ie10+ */,
    background:
      'linear-gradient(183deg, rgba(255, 255, 255, 0) 0%, rgba(133,133,133,1) 270%);' /* w3c */,
    width: '100%',
    height: '100px',
    margin: '3px',
    position: 'absolute',
    bottom: '0px'
  }
});

class Play extends Component {
  constructor() {
    super();
    this.getGameUrl = this.getGameUrl.bind(this);
  }

  getGameUrl(gameType) {
    this.props.socket.emit('join', { gameType });
  }

  joinSuccess(data) {
    console.log(data);
  }

  componentDidMount() {
    this.props.socket.on('join-success', this.joinSuccess);
  }

  render() {
    const { classes } = this.props;
    let str = 'Hello morning sam';
    const text = 'Hello Albert Good Morning sam';
    return (
      <div>
        <div className={classes.topContent}>
          <Profile name="Samuvel johnson" />
        </div>
        <Call channel="sam" />
        <div className={classes.content}>
          <div>
            <div style={{ color: 'blue' }}>
              <Highlighter
                highlightStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                  color: 'white'
                }}
                unhighlightStyle={{
                  backgroundColor: 'red',
                  borderRadius: '5px',
                  color: 'white'
                }}
                searchWords={str.split(' ')}
                textToHighlight={text}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Play.propTypes = {
  classes: PropTypes.object,
  socket: PropTypes.object
};

export default compose(
  withStyles(styles),
  socketConnect
)(Play);
