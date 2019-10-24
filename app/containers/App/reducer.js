/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  SET_USER,
  SET_IS_AUTHENTICATED,
  FETCH_COLLECTION,
  GOT_COLLECTION,
  FAILED_FETCH_COLLECTION,
  SET_TOKEN,
  CLEAR_COLLECTION,
} from './constants';

// The initial state of the App
export const initialState = {
  userData: null,
  isAuthenticated: false,
  fetchingCollection: false,
  collectionName: 'operators',
  collection: null,
  filterString: null,
  failedToGetCollectionReason: null,
  pristine: true,
};

const filterBy = filterString => item =>
  JSON.stringify(item).indexOf(filterString) > -1;

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER:
        draft.userData = action.user;
        break;
      case SET_IS_AUTHENTICATED:
        draft.isAuthenticated = action.isAuthenticated;
        break;
      case FETCH_COLLECTION:
        draft.collectionName = action.name;
        draft.filterString = action.filterString;
        draft.fetchingCollection = true;
        draft.failedToGetCollectionReason = null;
        break;
      case GOT_COLLECTION:
        draft.pristine = false;
        draft.collection = state.filterString
          ? action.data.filter(filterBy(state.filterString))
          : action.data;
        draft.fetchingCollection = false;
        break;
      case FAILED_FETCH_COLLECTION:
        draft.pristine = false;
        draft.failedToGetCollectionReason = action.reason;
        draft.fetchingCollection = false;
        break;
      case CLEAR_COLLECTION:
        draft.collection = null;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
    }
  });

export default appReducer;
