import { configureStore } from '@reduxjs/toolkit'

import slices from './slices'

const reducers = {}
for (const [sliceId, slice] of Object.entries(slices))
  reducers[sliceId] = slice.default;

export default configureStore({
  reducer: reducers
});
