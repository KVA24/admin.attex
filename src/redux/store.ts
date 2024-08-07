import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// reducers
import Layout from './layout/reducers'
import AuthReducer from "@/redux/auth/reducers.ts";
// import AccountReducer from "@/redux/account/reducers.ts";

// saga
import rootSaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// mount it on the store
export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    // Account: AccountReducer,
    Layout: Layout,
  } as any,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

// run the saga
sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
