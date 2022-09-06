import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  storyConnectInfo: null,
};

// Actual Slice
export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // Action to set the authentication status
    getConnectInformationStoryRequest() {},
    getConnectInformationStorySuccess(state, action) {
      state.storyConnectInfo = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.general,
        };
      },
    },
  },
});

export const generalActions = generalSlice.actions;

export default generalSlice.reducer;
