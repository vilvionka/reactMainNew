import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TIngredient } from "../utils/types"; 


export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => {
    const responce = await fetch('https://norma.education-services.ru/api/ingredients');
    const data = await responce.json();
    return data.data as TIngredient[];
  }
);

interface IIngredientsState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IIngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
})


export default ingredientsSlice.reducer;