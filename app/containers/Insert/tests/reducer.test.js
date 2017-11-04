
import { fromJS } from 'immutable';
import insertReducer from '../reducer';

describe('insertReducer', () => {
  it('returns the initial state', () => {
    expect(insertReducer(undefined, {})).toEqual(fromJS({}));
  });
});
