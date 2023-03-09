import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import seat from "./slices/seatSlice";

const store = configureStore({
  reducer: {
    auth,
    seat,
  },
});

export default store;
