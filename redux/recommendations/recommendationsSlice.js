import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  whoToFollow: [],
};

// Actual Slice
export const recommendationsSlice = createSlice({
  name: 'whoToFollow',
  initialState,
  reducers: {
    // Action to set the authentication status
    getWhoToFollowRequest(state, action) {},
    getWhoToFollowSuccess(state, action) {
      state.whoToFollow = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.whoToFollow,
        };
      },
    },
  },
});

export const recommendationsActions = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
