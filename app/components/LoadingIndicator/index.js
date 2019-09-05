import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));
const LoadingIndicator = ({ isLinear }) => {
  const classes = useStyles();
  return isLinear ? (
    <LinearProgress />
  ) : (
    <CircularProgress className={classes.progress} />
  );
};

LoadingIndicator.propTypes = {
  isLinear: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  isLinear: false,
};

export default LoadingIndicator;
