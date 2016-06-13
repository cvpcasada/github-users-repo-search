import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'


const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, api),
  window.devToolsExtension ? window.devToolsExtension() : undefined
)(createStore);


export default function configureStore(preloadedState) {
  const store = createStoreWithMiddleware(
    rootReducer,
    preloadedState
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
