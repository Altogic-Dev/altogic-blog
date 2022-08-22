import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
};

// Actual Slice
export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {

    // Action to set the authentication status
    reportStoryRequest(state, action) {},
    reportStorySuccess(state, action) {},

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