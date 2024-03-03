import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
  loading: false,
  error: null,
  search: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setField(state, { payload }) {
      const keys = Object.keys(payload);
      const values = Object.values(payload);

      for (let index = 0; index < keys.length; index++) {
        state[keys[index]] = values[index];
      }
    },

    changeSearchField(state, action) {
      const { search } = action.payload;
      state.search = search;
      state.skills = [];
    },
  },
});

export const {
  progressRequest, searchFailure, searchSuccess,
  changeSearchField, setField,
} = searchSlice.actions;
export default searchSlice.reducer;