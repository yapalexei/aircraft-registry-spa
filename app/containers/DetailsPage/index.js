/* eslint-disable react/prop-types */
/*
 * LandingPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Breadcrumbs,
  Typography,
  Hidden,
  Divider,
  Card,
  Button,
} from '@material-ui/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import bgImage from '../../images/blurBg.jpg';
import { makeSelectUser } from '../App/selectors';
import {
  makeSelectDetails,
  makeSelectFetchingDetails,
  makeSelectIsPristine,
  makeSelectFetchingIssue,
} from './selectors';
import { fetchDetailsAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import { useAuth0 } from '../Auth';
import DetailsCard from '../../components/DetailsCard';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'stretch',
  },
  fullBgImage: {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: 40,
  },
}));

const key = 'details';

export function LandingPage({
  routeType,
  getDetails,
  isPristine,
  isFetchingDetails,
  details,
  fetchingIssue,
  privileged,
  user,
  ...props
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { isAuthenticated, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  useEffect(() => {
    getDetails(routeType, props.match.params.uuid, privileged);
  }, []);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <Box display="flex" className={classes.root}>
      <Helmet>
        <title>Airegister - {routeType}</title>
        <meta name="description" content={`An ${routeType} detail page`} />
        <body className={classes.fullBgImage} />
      </Helmet>
      <AppBar style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Box className={classes.headerBar}>
          <Hidden xsDown>
            <Box style={{ width: 40 }} xs="hidden" />
          </Hidden>
          <Breadcrumbs>
            <Button color="inherit" onClick={() => props.history.push('/')}>
              Search Page
            </Button>
            <Typography color="textPrimary">{routeType}</Typography>
            <Typography color="textPrimary" title={props.match.params.uuid}>
              UUID
            </Typography>
          </Breadcrumbs>
          {isAuthenticated && (
            <>
              <Avatar
                alt={`${user.given_name} ${user.family_name}`}
                src={user.picture}
                className={classes.avatar}
                onClick={handleMenu}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => props.history.push('/')}>
                  Search Page
                </MenuItem>
                <MenuItem onClick={() => logout()}>Log out</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </AppBar>
      {isFetchingDetails && (
        <CircularProgress
          style={{
            position: 'fixed',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)',
          }}
        />
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={isPristine ? 'center' : 'flex-start'}
        className={classes.container}
      >
        <Card elevation={4} className={classes.paper}>
          {fetchingIssue && (
            <>
              <Typography color="textSecondary" gutterBottom>
                It appears that access to this data failed
              </Typography>
              <Typography color="textSecondary">
                for the following reason.
              </Typography>
              <Divider variant="fullWidth" style={{ margin: '10px 0' }} />
              <Typography>{fetchingIssue}</Typography>
            </>
          )}
          {details && <DetailsCard {...details} />}
        </Card>
      </Box>
    </Box>
  );
}

LandingPage.propTypes = {
  isFetchingDetails: PropTypes.bool,
  user: PropTypes.shape({}),
  details: PropTypes.shape({ id: PropTypes.string }),
  routeType: PropTypes.string,
  getDetails: PropTypes.func,
  isPristine: PropTypes.bool,
  fetchingIssue: PropTypes.string,
  privileged: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isFetchingDetails: makeSelectFetchingDetails(),
  user: makeSelectUser(),
  isPristine: makeSelectIsPristine(),
  details: makeSelectDetails(),
  fetchingIssue: makeSelectFetchingIssue(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getDetails: (type, uuid, privileged) =>
      dispatch(fetchDetailsAction(type, uuid, privileged)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LandingPage);
