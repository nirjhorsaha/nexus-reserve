import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/booking/bookingSlice";
import { baseApi } from "./api/baseApi";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configure object for persisting the auth reducer
const persistConfig = {
    key: "auth",
    storage,
};

// Configure object for persisting the booking reducer
const bookingPersistConfig = {
    key: "booking",
    storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedBookingReducer = persistReducer(bookingPersistConfig, bookingReducer);

// Creating the redux store with persisted reducers
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        booking: persistedBookingReducer,
    },
    // devTools: false, 
    // devTools: process.env.NODE_ENV !== 'production', // Disable redux dev tools in production environment
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Creating a persistor object to enable persistence functionality
export const persistor = persistStore(store);
