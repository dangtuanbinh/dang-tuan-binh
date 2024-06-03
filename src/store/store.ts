import {
  configureStore,
  isRejectedWithValue,
  MiddlewareAPI,
  Middleware,
} from "@reduxjs/toolkit";
import modalReducer from "./components/customModal/modalSlice";

const rootReducer = {
  modal: modalReducer,
};

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
    }
    return next(action);
  };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      rtkQueryErrorLogger,
    ]),
});

export default store;
