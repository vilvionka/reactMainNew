import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IOrderResponse {
  success: boolean;
  name: string;
  order: {
    number: number; 
  };
}


export const postOrder = createAsyncThunk<IOrderResponse, string[]>(
  'order/postOrder',
  async (ingredientIds) => {
    const response = await fetch('https://norma.education-services.ru/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    })
    if (!response.ok) {
      throw new Error('Ошибка при оформлении заказа');
    }
    const data = await response.json();
    return data as IOrderResponse;;
  }
)

interface IOrderState {
  orderNumber: null | number,
  isLoading: boolean,
  hasError: boolean,
  isModalOpen: boolean,
}

const initialState: IOrderState = {
  orderNumber: null,
  isLoading: false,
  hasError: false,
  isModalOpen: false,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.isModalOpen = false;
      state.orderNumber = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.isModalOpen = false;
      })
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<IOrderResponse>) => {
        state.isLoading = false;
        state.orderNumber = action.payload.order.number;
        state.isModalOpen = true;
      })
      .addCase(postOrder.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.isModalOpen = false;
      })
  }
})


export default orderSlice.reducer;
export const { closeOrderModal } = orderSlice.actions;