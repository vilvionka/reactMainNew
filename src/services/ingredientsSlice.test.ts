import { describe, it, expect } from 'vitest';
import { ingredientsSlice, fetchIngredients } from './ingredientsSlice';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

describe('ingredientsSlice reducer', () => {
  it('должен возвращать начальное состояние', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен ставить isLoading: true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });
  it('должен сохранять данные ингредиентов при fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Булка', type: 'bun', price: 100 },
      { _id: '2', name: 'Соус', type: 'sauce', price: 50 }
    ];
  
    const action = { 
      type: fetchIngredients.fulfilled.type, 
      payload: mockIngredients 
    };
  
    const state = ingredientsSlice.reducer(initialState, action);
  
    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(mockIngredients);
    expect(state.error).toBe(null); 
  });
  
});
