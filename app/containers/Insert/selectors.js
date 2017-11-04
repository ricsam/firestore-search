import { createSelector } from 'reselect';

/**
 * Direct selector to the insert state domain
 */
const selectInsertDomain = (state) => state.get('insert');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Insert
 */

const makeSelectInsert = () => createSelector(
  selectInsertDomain,
  (substate) => substate.toJS()
);

export default makeSelectInsert;
export {
  selectInsertDomain,
};
