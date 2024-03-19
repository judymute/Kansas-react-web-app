// Import createSlice and PayloadAction from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface AddState {
  sum: number;
}

// Initial state for the addReducer
const initialState: AddState = {
  sum: 0,
};

// Create the slice
const addSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    // Action to calculate sum
    add: (state, action: PayloadAction<{a: number; b: number}>) => {
      const { a, b } = action.payload;
      state.sum = a + b; // Calculate and update the sum
    },
  },
});

// Export the action and the reducer
export const { add } = addSlice.actions;
export default addSlice.reducer;
