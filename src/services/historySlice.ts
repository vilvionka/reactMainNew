import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedState } from "./feedSlice";


const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'offline',
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<string>) => { 
      state.status = 'connecting';
    },
    disconnect: (state) => { state.status = 'offline' },
    onOpen: (state) => { state.status = 'online' },
    setOrders: (state, action:PayloadAction<any>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onError: (state) => { state.status = 'error'; },
  }

})

export const { connect, disconnect, onOpen, setOrders, onError } = historySlice.actions;
export default historySlice.reducer;