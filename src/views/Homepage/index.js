import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import image from '../../assets/img/background-image.jpg';
import ChannelForm from "./../../components/ChannelForm";
import Call from "./../../components/Call";
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
  }
});

class Homepage extends Component {
  electChannel = channel => {
    this.setState({ channel });
  };
  selectChannel = channel => {
    this.setState({ channel });
  };
  constructor(props) {
    super(props);
    this.state = {
      channel: ''
    }
  }
  render() {
    return (
      <div className="App">
        <ChannelForm selectChannel={this.selectChannel}/>
        <Call channel={this.state.channel}/>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Homepage);
