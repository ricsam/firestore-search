import { takeLatest, call } from 'redux-saga/effects';
import { saveTrie } from 'utils/firestore-search';
import firebase from 'firebase';

const db = firebase.firestore();

function* upload(action) {
  const { tag } = action;
  yield call(saveTrie, db, tag);
  if (action.variants) {
    console.log(action.variants);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest('upload', upload);
}
