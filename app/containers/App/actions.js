/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SET_USER,
  SET_IS_AUTHENTICATED,
  FETCH_COLLECTION,
  GOT_COLLECTION,
  FAILED_FETCH_COLLECTION,
  SET_TOKEN,
  CLEAR_COLLECTION,
} from './constants';

export function setAuthTokenAction(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function failedToGetCollection(reason) {
  return {
    type: FAILED_FETCH_COLLECTION,
    reason,
  };
}

export function gotCollection(data) {
  return {
    type: GOT_COLLECTION,
    data,
  };
}

export function fetchCollection(name, filterString) {
  return {
    type: FETCH_COLLECTION,
    name,
    filterString,
  };
}

export function setUserAction(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setIsAuthenticatedAction(isAuthenticated) {
  return {
    type: SET_IS_AUTHENTICATED,
    isAuthenticated,
  };
}

export function clearCollectionAction() {
  return {
    type: CLEAR_COLLECTION,
  };
}
