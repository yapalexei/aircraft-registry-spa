/*
 * LandingConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FETCH_DETAILS = 'airegister/Details/FETCH_DETAILS';
export const FAILED_FETCHING_DETAILS =
  'airegister/Details/FAILED_FETCHING_DETAILS';
export const GOT_DETAILS = 'airegister/Details/GOT_DETAILS';
