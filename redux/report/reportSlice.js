import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  isReported: false,
};

// Actual Slice
export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    // Action to set the authentication status
    reportStoryRequest(state, action) {},
    reportStorySuccess(state, action) {
      state.isReported = true;
    },

    getReportedStoryByUserRequest(state, action) {},
    getReportedStoryByUserSuccess(state, action) {
      state.isReported = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.story,
        };
      },
    },
  },
});

export const reportActions = reportSlice.actions;

export default reportSlice.reducer;
