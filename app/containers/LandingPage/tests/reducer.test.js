// import produce from 'immer';

// import landingReducer from '../reducer';
// import { changeUsername } from '../actions';

// /* eslint-disable default-case, no-param-reassign */
// describe('landingReducer', () => {
//   let state;
//   beforeEach(() => {
//     state = {
//       username: '',
//     };
//   });

//   it('should return the initial state', () => {
//     const expectedResult = state;
//     expect(landingReducer(undefined, {})).toEqual(expectedResult);
//   });

//   it('should handle the changeUsername action correctly', () => {
//     const fixture = 'mxstbr';
//     const expectedResult = produce(state, draft => {
//       draft.username = fixture;
//     });

//     expect(landingReducer(state, changeUsername(fixture))).toEqual(expectedResult);
//   });
// });
