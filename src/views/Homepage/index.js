import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Grid, Typography, withStyles } from '@material-ui/core';
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
  },
  card: {
    width: 275,
    margin: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Homepage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            display: 'flex',
          }}
        >
          <Grid container justify="center">
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" component="p" gutterBottom variant="body2">
                  Pronunciation Checker
                </Typography>
                <Typography component="p" variant="body2">
                  A two player game where you will be spelling out the sentence that is displayed. A score will be given to you on the basis of your pronunciation accuracy.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Play Now</Button>
              </CardActions>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" component="p" gutterBottom variant="body2">
                  Word War
                </Typography>
                <Typography component="p" variant="body2">
                  A two player game where you will be given with a word and you should find the synonym and your partner should find the antonym of the word. A score will be given on the basis of correct answer.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Play Now</Button>
              </CardActions>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Homepage);
