import { createSlice } from "@reduxjs/toolkit";

const receivedConnectionSlice = createSlice({
  name: "receivedConnection",
  initialState: null,
  reducers: {
    setreceivedConnections: (state, action) => {
      return action.payload;
    },
    removereceivedConnections: (state, action) => {
      return null;
    },
    removeConnectionById: (state, action) => {
      if (state && Array.isArray(state)) {
        return state.filter((connection) => connection._id !== action.payload);
      }
      return state;
    },
  },
});

export const {
  setreceivedConnections,
  removereceivedConnections,
  removeConnectionById,
} = receivedConnectionSlice.actions;
export default receivedConnectionSlice.reducer;
