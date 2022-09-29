import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Initial state
const initialState = {
  isLoading: true,
  error: null,
  fileLink: null,
  fileLinks: {},
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
    uploadFilesSuccess(state, action) {
      state.isLoading = false;
      state.fileLinks = {
        ...state.fileLinks,
        [action.payload.name]: action.payload.data,
      };
    },
    uploadFileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUploadedFiles(state, action) {
      state.fileLinks = action.payload;
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
