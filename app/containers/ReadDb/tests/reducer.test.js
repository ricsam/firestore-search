
import { fromJS } from 'immutable';
import readDbReducer from '../reducer';

describe('readDbReducer', () => {
  it('returns the initial state', () => {
    expect(readDbReducer(undefined, {})).toEqual(fromJS({}));
  });
});
