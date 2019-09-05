/*
 * LandingPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  // CardContent,
  CardMedia,
  Box,
  IconButton,
  // MoreVertIcon,
} from '@material-ui/core';
import WidgetsIcon from '@material-ui/icons/Widgets';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectIsAuthenticated, makeSelectUser } from '../App/selectors';
// import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useAuth0 } from '../Auth';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'stretch',
  },
  menuButton: {
    // marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  container: {
    marginTop: 64,
  },
}));

const key = 'landing';

export function LandingPage() {
  const { isAuthenticated, loginWithPopup, logout, user = {} } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <Box display="flex" className={classes.root}>
      <Helmet>
        <title>Airegister Landing</title>
        <meta
          name="description"
          content="An Airegister Boilerplate application landing page"
        />
      </Helmet>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <WidgetsIcon color="inherit" fontSize="large" />
          </Typography>
          <div>
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={() => logout()}>Log out</MenuItem>
                </Menu>
              </>
            )}
            {!isAuthenticated && (
              <Button
                edge="start"
                color="inherit"
                type="button"
                onClick={() => loginWithPopup({})}
              >
                Log in
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={classes.container}
      >
        {!isAuthenticated ? (
          <h1>Not logged in</h1>
        ) : (
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user.name}
              subheader={user.email}
            />
            <CardMedia
              className={classes.media}
              image={user.picture}
              title={user.name}
            />
          </Card>
        )}
      </Box>
    </Box>
  );
}

LandingPage.propTypes = {
  // isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({}),
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  user: makeSelectUser(),
});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LandingPage);
