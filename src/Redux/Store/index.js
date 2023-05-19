import reducer from "../Reducer/index.js"
import {applyMiddleware, createStore, compose} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['profile', 'theme'] // What we want to persist
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))

let persistor = persistStore(store)

export {store,persistor}