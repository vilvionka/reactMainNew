import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import orderReducer from "./orderSlice";
import useReducer from "./userSlice";
import feedReducer, * as feedActions from './feedSlice';
import historyReducer, * as historyActions from './historySlice';
import { socketMiddleware } from "./socketMiddleware";



const feedMiddleware = socketMiddleware(feedActions); 
const historyMiddleware = socketMiddleware(historyActions); 

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderStore: orderReducer,
    userStore: useReducer,
    feedStore: feedReducer,
    historyStore: historyReducer,
  },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware, historyMiddleware),
});




export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;
