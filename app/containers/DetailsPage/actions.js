/*
 * Landing Actions
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
  FETCH_DETAILS,
  FAILED_FETCHING_DETAILS,
  GOT_DETAILS,
} from './constants';

export function fetchDetailsAction(detailsType, id, privilaged) {
  return {
    type: FETCH_DETAILS,
    detailsType,
    id,
    privilaged,
  };
}

export function failedFetchingDetailsAction(reason) {
  return {
    type: FAILED_FETCHING_DETAILS,
    reason,
  };
}

export function gotDetailsAction(data) {
  return {
    type: GOT_DETAILS,
    data,
  };
}
