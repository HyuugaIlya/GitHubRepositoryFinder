import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { repositoriesApi } from "./api"

const rootReducer = combineReducers({
    [repositoriesApi.reducerPath]: repositoriesApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(repositoriesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>