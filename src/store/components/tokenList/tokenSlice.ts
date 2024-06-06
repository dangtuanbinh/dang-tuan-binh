import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tokenList } from "src/mocks/token";

const initialState = {
  selectedPayToken: tokenList[0],
  selectedReceiveToken: tokenList[1]
};

const token = createSlice({
  name: "token",
  initialState,
  reducers: {
    setSelectedPayToken: (state, action: PayloadAction<any>) => {
      state.selectedPayToken = action.payload.selectedPayToken;
    },
    setSelectedReceiveToken: (state, action: PayloadAction<any>) => {
      state.selectedReceiveToken = action.payload.selectedReceiveToken;
    },
  },
});

const { reducer, actions } = token;
export const { setSelectedPayToken,setSelectedReceiveToken } = actions;
export default reducer;
