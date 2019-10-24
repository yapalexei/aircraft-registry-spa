/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;
const makeSelectFetchFailReason = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.failedToGetCollectionReason,
  );

const makeSelectIsPristine = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.pristine,
  );

const makeSelectToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.token,
  );

const makeSelectCollection = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.collection,
  );

const makeSelectCollectionName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.collectionName,
  );

const makeSelectFetchingCollection = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.fetchingCollection,
  );

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
  makeSelectFetchFailReason,
  makeSelectIsPristine,
  makeSelectToken,
  makeSelectCollection,
  makeSelectCollectionName,
  makeSelectIsAuthenticated,
  makeSelectUser,
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectFetchingCollection,
};
