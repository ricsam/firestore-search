/**
 *
 * Insert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import DefaultInput from 'components/Input';
import Button from 'components/Button';
import makeSelectInsert from './selectors';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div`
  width: 90%;
  @media (min-width: 600px) {
    width: 50%;
  }
  min-width: 282px;
`;

const Col1 = styled.div`
  display: inline-block;
  min-width: 50px;
  max-width: 50px;
  margin: 0 0.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-left: -0.5rem;
`;

const Input = DefaultInput.extend`
  display: inline;
  align-self: stretch;
  flex: 1;
  min-width: 60px;
`;
const CloseButton = Button.extend`
  width: 50px;
`;

export class Insert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addVariant = this.addVariant.bind(this);
    this.setVariantError = this.setVariantError.bind(this);
    this.changeVariantValue = this.changeVariantValue.bind(this);
    this.removeVariant = this.removeVariant.bind(this);
    this.save = this.save.bind(this);
  }

  state = {
    variants: {},
    tagName: {},
  };


  setVariantError(ev) {
    const { value: error, id } = ev.currentTarget;
    this.setState((prevState) => ({
      variants: {
        ...prevState.variants,
        [id]: { ...prevState.variants[id], error },
      },
    }));
  }
  removeVariant(ev) {
    const { id } = ev.currentTarget;
    this.setState((prevState) => {
      const variants = { ...prevState.variants };
      delete variants[id];
      return {
        variants,
      };
    });
  }
  changeVariantValue(ev) {
    const { value, id } = ev.currentTarget;
    this.setState((prevState) => ({
      variants: {
        ...prevState.variants,
        [id]: { ...prevState.variants[id], value },
      },
    }));
  }
  addVariant() {
    const id = uuid();
    this.setState((prevState) => ({
      variants: {
        ...prevState.variants,
        [id]: { value: '', error: 0 },
      },
    }));
  }
  save() {
    const tag = this.tagInput.value;
    if (!tag) {
      // eslint-disable-next-line no-alert
      alert('you must enter a tag name');
      return;
    }
    const variants = this.state.variants;
    this.props.dispatch({
      type: 'upload',
      tag,
      ...(() => {
        if (Object.keys(this.state.variants).length > 0) {
          return { variants };
        }
        return {};
      })(),
    });
  }
  render() {
    return (
      <Wrapper>
        <h3>Add item to DB</h3>
        <Row>
          <Col1>Tag:</Col1>
          <Input type="text" placeholder="Tag" innerRef={(el) => { this.tagInput = el; }} />
        </Row>
        {Object.keys(this.state.variants).map((id) => (
          <Row key={id}>
            <Col1>Variant:</Col1>
            <Input
              type="text"
              value={this.state.variants[id].value}
              onChange={this.changeVariantValue}
              id={id}
              space="35%"
              flex
            />
            <Col1>Errors:</Col1>
            <Input type="number" placeholder="Levenshtein distance" value={this.state.variants[id].error} onChange={this.setVariantError} id={id} />
            <CloseButton onClick={this.removeVariant} id={id}>✘</CloseButton>
          </Row>
        ))}
        <Button onClick={this.addVariant}>Add variant</Button>
        <Button onClick={this.save}>Save</Button>
      </Wrapper>
    );
  }
}

Insert.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  insert: makeSelectInsert(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'insert', reducer });
const withSaga = injectSaga({ key: 'insert', saga });

export default compose(withReducer, withSaga, withConnect)(Insert);
