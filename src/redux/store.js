import { configureStore } from '@reduxjs/toolkit'

import slices from './slices'

import { loadState } from '../engine/save'

const reducers = {}
for (const [id, item] of Object.entries(slices))
  reducers[id] = item.default;

export default configureStore({
  reducer: reducers
});

loadState();