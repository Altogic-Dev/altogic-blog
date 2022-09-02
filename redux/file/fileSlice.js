import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Initial state
const initialState = {
  isLoading: true,
  error: null,
  fileLink: null,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    uploadFileRequest(state) {
      state.isLoading = true;
    },
    uploadFileSuccess(state, action) {
      state.isLoading = false;
      state.fileLink = action.payload;
    },
    uploadFileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload.auth,
      }),
    },
  },
});

export const fileActions = fileSlice.actions;
export default fileSlice.reducer;
