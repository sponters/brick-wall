import { configureStore } from '@reduxjs/toolkit'

import slices from './slices'

const reducers = {}
for (const [id, item] of Object.entries(slices))
  reducers[id] = item.default;

export default configureStore({
  reducer: reducers
});
