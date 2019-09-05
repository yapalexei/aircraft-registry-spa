/**
 * LandingPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLanding = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectLanding,
    homeState => homeState.username,
  );

export { selectLanding, makeSelectUsername };
