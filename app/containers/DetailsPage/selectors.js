/**
 * LandingPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDetails = state => state.details || initialState;

const makeSelectDetails = () =>
  createSelector(
    selectDetails,
    details => details.data,
  );

const makeSelectFetchingDetails = () =>
  createSelector(
    selectDetails,
    details => details.isFetching,
  );

const makeSelectIsPristine = () =>
  createSelector(
    selectDetails,
    details => details.isPristine,
  );

const makeSelectDetailsType = () =>
  createSelector(
    selectDetails,
    details => details.detailsType,
  );

const makeSelectDetailsId = () =>
  createSelector(
    selectDetails,
    details => details.id,
  );

const makeSelectFetchingIssue = () =>
  createSelector(
    selectDetails,
    details => details.reason,
  );

export {
  makeSelectDetails,
  makeSelectFetchingDetails,
  makeSelectIsPristine,
  makeSelectDetailsType,
  makeSelectDetailsId,
  makeSelectFetchingIssue,
};
