import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import reducers from './reducers/index';
import bathroomReducer from './slice.js';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore(
  {
    reducer: {
      bathroom: bathroomReducer
    }
  }
  // composeWithDevTools()
);

export default store;