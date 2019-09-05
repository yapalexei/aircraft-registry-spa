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

import { SET_USER, SET_IS_AUTHENTICATED } from './constants';

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
