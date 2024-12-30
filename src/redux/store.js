import { configureStore } from '@reduxjs/toolkit'
import resReducer from './resSlice'
import wallReducer from './wallSlice'

export default configureStore({
  reducer: {
    res: resReducer,
    wall: wallReducer
  }
});
