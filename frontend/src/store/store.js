// frontend/src/store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';


//all reducers are being combined 
//argument that is passed to the useSelector function
const rootReducer = combineReducers({
  session: sessionReducer, //const initialState = { user: null };
  spots: spotsReducer , //const initialState = {spot: {}, allSpots: {}};
  reviews: reviewsReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;