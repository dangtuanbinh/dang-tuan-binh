import {
  configureStore,
} from "@reduxjs/toolkit";
import modalReducer from "./components/customModal/modalSlice";
import tokenReducer from "./components/tokenList/tokenSlice"

const rootReducer = {
  modal: modalReducer,
  token: tokenReducer
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
    ]),
});

export default store;
