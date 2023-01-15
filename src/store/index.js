import { createStore, compose, combineReducers,applyMiddleware } from 'redux'
import { profileReducer } from './profile/reducer'
import { messagesReducer } from './messages/reducer'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
  blackList:[],
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store)