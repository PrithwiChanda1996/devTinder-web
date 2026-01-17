import { createSlice } from "@reduxjs/toolkit";

const blockedConnectionSlice = createSlice({
  name: "blockedConnection",
  initialState: null,
  reducers: {
    setBlockedConnections: (state, action) => {
      return action.payload;
    },
    removeBlockedConnections: (state, action) => {
      return null;
    },
    removeBlockedConnectionById: (state, action) => {
      if (state && Array.isArray(state)) {
        return state.filter((connection) => connection._id !== action.payload);
      }
      return state;
    },
  },
});

export const {
  setBlockedConnections,
  removeBlockedConnections,
  removeBlockedConnectionById,
} = blockedConnectionSlice.actions;
export default blockedConnectionSlice.reducer;
