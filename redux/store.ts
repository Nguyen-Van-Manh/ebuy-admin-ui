import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./slice";
import { fetchAPIMe } from "./slice/user.slice";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReduce = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReduce,
    middleware: (getDefaultMiddleware) => process.env.NODE_ENV !== "production" ?
        getDefaultMiddleware({ serializableCheck: false }).concat(logger):
        getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production'
})

store.dispatch(fetchAPIMe())
export const persistor = persistStore(store);
export default store