import { createSelector } from 'reselect';

/**
 * Direct selector to the readDb state domain
 */
const selectReadDbDomain = (state) => state.get('readDb');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReadDb
 */

const makeSelectReadDb = () => createSelector(
  selectReadDbDomain,
  (substate) => substate.toJS()
);

export default makeSelectReadDb;
export {
  selectReadDbDomain,
};
