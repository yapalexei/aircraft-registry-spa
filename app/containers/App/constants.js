/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const SET_USER = 'airegister/App/SET_USER';
export const SET_IS_AUTHENTICATED = 'airegister/App/SET_IS_AUTHENTICATED';
export const FETCH_COLLECTION = 'airegister/App/FETCH_COLLECTION';
export const GOT_COLLECTION = 'airegister/App/GOT_COLLECTION';
export const FAILED_FETCH_COLLECTION = 'airegister/App/FAILED_FETCH_COLLECTION';
export const SET_TOKEN = 'airegister/App/TOKEN_SET';
export const CLEAR_COLLECTION = 'airegister/App/CLEAR_COLLECTION';
