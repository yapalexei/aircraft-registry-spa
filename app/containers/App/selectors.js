/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isAuthenticated,
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  makeSelectIsAuthenticated,
  makeSelectUser,
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
