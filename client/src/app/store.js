import { configureStore } from '@reduxjs/toolkit';
import meditationReducer from '../features/meditationSlice';

export const store = configureStore({
  reducer: {
    meditation: meditationReducer,
  },
});
