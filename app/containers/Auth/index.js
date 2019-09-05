import React, { useState, useEffect, useContext, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import createAuth0Client from '@auth0/auth0-spa-js';
import { createStructuredSelector } from 'reselect';
import { setUserAction, setIsAuthenticatedAction } from '../App/actions';
import { makeSelectIsAuthenticated } from '../App/selectors';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});
const mapDispatchToProps = dispatch => ({
  setStoreUser: user => dispatch(setUserAction(user)),
  setIsAuthenticated: auth => dispatch(setIsAuthenticatedAction(auth)),
});

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  setStoreUser,
  setIsAuthenticated,
  isAuthenticated,
  ...initOptions
}) => {
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);
      if (window.location.search.includes('code=')) {
        const authRes = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(authRes.appState);
      }

      const isAuthenticatedState = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticatedState);

      if (isAuthenticatedState) {
        const curUser = await auth0FromHook.getUser();
        setUser(curUser);
        setStoreUser(curUser);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const curUser = await auth0Client.getUser();
    setUser(curUser);
    setStoreUser(curUser);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const curUser = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(curUser);
    setStoreUser(curUser);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  children: PropTypes.any,
  onRedirectCallback: PropTypes.func,
  setStoreUser: PropTypes.func,
  setIsAuthenticated: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

Auth0Provider.defaultProps = {
  children: null,
  onRedirectCallback: null,
  setStoreUser: () => {},
  setIsAuthenticated: () => {},
  isAuthenticated: false,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Auth0Provider);
