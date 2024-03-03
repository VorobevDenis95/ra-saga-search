import { 
  call, put, takeLatest, spawn,
  debounce,
} from 'redux-saga/effects';
import searchSkills from './api';
import { setField } from './reducers/searchSlice';

function* handleSearchSkillsSaga(acton) {
  try {
    const data = yield call(searchSkills, acton.payload.search);
    yield put(setField({ loading: false, error: null, skills: data}));
  } catch (error) {
    yield put(setField({ loading: false, error: error.message }));
  }
}

function filterSearchSkillsSaga({ type, payload }) {
  return type === 'search/setField' && payload.loading === true;
}

function* watchSearchSkillsSaga() {
  yield takeLatest(filterSearchSkillsSaga, handleSearchSkillsSaga);
}

function filterChangeSearchAction({ type, payload }) {
  return type === 'search/changeSearchField' && payload.search.trim() !== '';
}

function* handleChangeSearchSaga({ payload }) {
  yield put(setField({ loading: true, error: null, search: payload.search }));
}

function* watchChangeSearchSaga() {
  yield debounce(600, filterChangeSearchAction, handleChangeSearchSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}