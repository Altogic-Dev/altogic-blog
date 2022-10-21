import FileService from '@/services/file';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Initial state
export const uploadFile = createAsyncThunk(
  'file/upload',
  async (file, name) => {
    const response = await FileService.uploadFile(file, name);
    return response.data.publicPath;
  }
);
const initialState = {
  isLoading: false,
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
    clearFileLink(state, action) {
      state.fileLink = null;
      if (action.payload && action.payload.name) {
        state.fileLinks = {
          ...state.fileLinks,
          [action.payload.name]: null,
        };
      }
    },
    deleteFileRequest() {},
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.file,
    }),
    [uploadFile.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.fileLink = action.payload;
    },
    [uploadFile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const fileActions = fileSlice.actions;
export default fileSlice.reducer;
