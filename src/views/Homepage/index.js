import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import image from '../../assets/img/background-image.jpg';

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
  render() {
    return (
      <div>
        <div
          className={this.props.classes.pageHeader}
          style={{
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
          }}
        />
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Homepage);
