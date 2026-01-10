import { createSlice } from "@reduxjs/toolkit";

const mutualConnectionSlice = createSlice({
  name: "mutualConnection",
  initialState: null,
  reducers: {
    setMutualConnections: (state, action) => {
      return action.payload;
    },
    removeMutualConnections: (state, action) => {
      return null;
    },
    addMutualConnection: (state, action) => {
      if (!state) {
        return [action.payload];
      }
      if (Array.isArray(state)) {
        return [...state, action.payload];
      }
      return state;
    },
    removeMutualConnectionById: (state, action) => {
      if (state && Array.isArray(state)) {
        return state.filter((connection) => connection._id !== action.payload);
      }
      return state;
    },
  },
});

export const {
  setMutualConnections,
  removeMutualConnections,
  addMutualConnection,
  removeMutualConnectionById,
} = mutualConnectionSlice.actions;
export default mutualConnectionSlice.reducer;
