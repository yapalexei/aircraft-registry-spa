/*
 * landingReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  FETCH_DETAILS,
  FAILED_FETCHING_DETAILS,
  GOT_DETAILS,
} from './constants';

// The initial state of the App
export const initialState = {
  isFetching: true,
  reason: null,
  data: null,
  privileged: false,
};

/* eslint-disable default-case, no-param-reassign */
const landingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_DETAILS:
        draft.isFetching = true;
        draft.detailsType = action.detailsType;
        draft.privileged = action.privileged;
        draft.detailsId = action.id;
        draft.reason = null;
        draft.data = null;
        break;
      case FAILED_FETCHING_DETAILS:
        draft.isFetching = false;
        draft.reason = action.reason;
        break;
      case GOT_DETAILS:
        draft.isFetching = false;
        draft.data = action.data;
        break;
    }
  });

export default landingReducer;
