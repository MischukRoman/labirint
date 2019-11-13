import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "../types/actions";
import mazeReducer from "./reducer";

export const rootReducer = combineReducers({
    maze: mazeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export type StoreType = typeof store;