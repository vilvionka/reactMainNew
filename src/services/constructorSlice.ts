import { createSlice, nanoid } from "@reduxjs/toolkit";
import { postOrder } from "./orderSlice";
import { TIngredient } from "../utils/types"; 
import { PayloadAction } from "@reduxjs/toolkit";


export type TConstructorIngredient = TIngredient & { key: string }; 

interface IConstructorState{
  bun: TIngredient | null,
  ingredients: TConstructorIngredient[],
}


const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
}


export const constructorSlice = createSlice({
  name: 'BurgerConstructor',
  initialState,
  reducers: {
    // Экшен для добавления
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        // Генерируем уникальный ключ для каждого элемента списка
        const key = nanoid();
        return { payload: { ...ingredient, key } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          // Если это булка, она просто заменяет предыдущую
          state.bun = action.payload;
        } else {
          // Если начинка — добавляем в массив
          state.ingredients.push(action.payload);
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.key !== action.payload)
    },
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.ingredients];

      const draggedItem = ingredients.splice(dragIndex, 1)[0];
      ingredients.splice(hoverIndex, 0, draggedItem);
      state.ingredients = ingredients;
    },
  }, 
  extraReducers: (builder) =>{
    builder.addCase(postOrder.fulfilled, (state)=>{
      state.bun = null;
      state.ingredients = [];
    })
  }
})

export const { addIngredient, removeIngredient, moveIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;