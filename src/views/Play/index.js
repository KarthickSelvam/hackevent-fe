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
import Icon from '@material-ui/core/Icon';
import image from '../../assets/img/background-image.jpg';
import Call from '../../components/Agora';
import Profile from '../../components/Profile/profile';
import Highlighter from 'react-highlight-words';
import Timer from '../../components/Timer';
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
  speachData: {
    flex: 1,
    paddingRight: '160px',
    fontSize: 'larger',
    fontFamily: 'Comic Sans MS'
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
    height: '200px',
    margin: '3px',
    position: 'absolute',
    bottom: '0px'
  },
  gameHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  gameTitle: {
    flex: 2,
    fontSize: 'larger',
    fontFamily: 'Comic Sans MS'
  },
  gameTimer: {
    flex: 1,
    margin: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
    background: '#d62a1975',
    borderRadius: '26px',
    color: '#fff',
    alignItems: 'center'
  },
  margin: {
    margin: '5px'
  },
  activeButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Play extends Component {
  state = {
    speachData: '',
    showActionButton: false
  };
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

    const body = document.querySelector('body');
    body.addEventListener('recoginizer:rocognized', (e, data) => {
      console.log(e.detail.text());
      if (e.detail.text()) {
        this.setState({
          speachData: e.detail.text()
        });
      }
    });
  }
  getTextData = value => {
    this.setState({
      speachData: value
    });
  };
  onEnd = () => {
    this.setState({
      activeButtons: true
    });
  };
  render() {
    const { classes } = this.props;
    let str = this.state.speachData;
    console.log(str);
    const text = 'Hello Albert Good Morning sam';
    return (
      <div>
        <div className={classes.topContent}>
          <Profile name="Samuvel johnson" />
        </div>
        <Call channel="sam" />
        <div className={classes.content}>
          {this.state.activeButtons && (
            <div className={classes.activeButtons}>
              <Button
                variant="contained"
                size="small"
                className={classes.margin}>
                Retry
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.margin}>
                Done
              </Button>
            </div>
          )}
          <div className={classes.gameHeader}>
            <div className={classes.gameTitle}>
              <h3>Role play game. </h3>
            </div>
            <div className={classes.gameTimer}>
              <label>Time rem. </label>
              {(' ', <Timer secs={10} onEnd={this.onEnd} />)}
            </div>
          </div>
          <div className={classes.speachData}>
            <div style={{ color: 'blue' }}>
              <Highlighter
                highlightStyle={{
                  backgroundColor: 'green',
                  borderRadius: '5px',
                  color: 'white'
                }}
                // unhighlightStyle={{
                //   backgroundColor: 'red',
                //   borderRadius: '5px',
                //   color: 'white'
                // }}
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
