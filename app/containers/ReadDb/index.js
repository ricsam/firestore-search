/**
 *
 * ReadDb
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectReadDb from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ReadDb extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h3>Saved in DB</h3>
      </div>
    );
  }
}

ReadDb.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  readdb: makeSelectReadDb(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'readDb', reducer });
const withSaga = injectSaga({ key: 'readDb', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReadDb);
