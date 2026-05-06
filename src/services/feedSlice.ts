import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: 'done' | 'pending' | 'created'; 
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface IFeedState {
  orders: IOrder[];
  total: number;
  totalToday: number;
  status: string;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'offline',
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<string>) => { // Теперь принимает строку (url)
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

export const { connect, disconnect, onOpen, setOrders, onError } = feedSlice.actions;
export default feedSlice.reducer;