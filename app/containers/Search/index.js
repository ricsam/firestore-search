/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import Button from 'components/Button';
import Input from 'components/Input';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearch from './selectors';
import reducer from './reducer';
import saga from './saga';


const SearchButton = Button.extend``;
const CheckButton = Button.extend``;

const ButtonContainer = styled.div`
  display: flex;
`;

export class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleFuzzy = this.toggleFuzzy.bind(this);
  }
  state = {
    value: '',
    fuzzy: false,
  };
  onChange(ev) {
    const value = ev.currentTarget.value;
    this.setState({
      value,
    });
    this.props.dispatch({
      type: 'fuzzysearch',
      value,
    });
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.dispatch({
      type: 'search',
      value: this.state.value,
    });
  }
  toggleFuzzy() {
    this.setState((prevState) => ({
      fuzzy: !prevState.fuzzy,
    }));
  }
  render() {
    return (
      <div>
        <div>
          <Input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <ButtonContainer>
          {!this.state.fuzzy && (
            <SearchButton onClick={this.search}>Seach</SearchButton>
          )}
          <CheckButton onClick={this.toggleFuzzy}>
            Fuzzy search {this.state.fuzzy ? '✔' : '✘'}
          </CheckButton>
        </ButtonContainer>
        <ul>
          {this.props.search.results.map((item) => (
            <li>
              Val: {item.value}, error: {item.distance}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(withReducer, withSaga, withConnect)(Search);
