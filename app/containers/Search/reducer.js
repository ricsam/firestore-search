/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  value: '',
  results: [],
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'search': return state.set('value', action.value);
    case 'fuzzysearch': return state.set('value', action.value);
    case 'set results': return state.set('results', action.results);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default searchReducer;
