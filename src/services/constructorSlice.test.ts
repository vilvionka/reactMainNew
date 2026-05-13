import { describe, it, expect } from 'vitest';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
} from './constructorSlice';
import { postOrder } from './orderSlice';
import { TIngredient } from '../utils/types';

// Мокаем базовый ингредиент для тестов
const mockBun: TIngredient = {
  _id: '1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1250,
  image: 'yandex.net',
  image_mobile: 'yandex.net',
  image_large: 'yandex.net',
};

const mockSauce: TIngredient = {
  _id: '2',
  name: 'Соус Spicy',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 90,
  price: 90,
  image: 'yandex.net',
  image_mobile: 'yandex.net',
  image_large: 'yandex.net',
};

const mockMain: TIngredient = {
  _id: '3',
  name: 'Филе Люминесцентного марлина',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 3000,
  image: 'yandex.net',
  image_mobile: 'yandex.net',
  image_large: 'yandex.net',
};

const initialState = {
  bun: null,
  ingredients: [],
};

describe('constructorSlice reducer', () => {
  it('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен добавлять булку в поле bun и генерировать key', () => {
    // Вызываем экшен-креатор addIngredient. Он сам запустит prepare и добавит key
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).not.toBeNull();
    expect(state.bun?._id).toBe('1');
    expect(state.bun?.type).toBe('bun');
    // Проверяем, что nanoid сгенерировал строку в поле key
    expect(typeof (state.bun as any).key).toBe('string');
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен добавлять начинку в массив ingredients', () => {
    const action = addIngredient(mockSauce);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('2');
    expect(typeof state.ingredients[0].key).toBe('string');
    expect(state.bun).toBeNull();
  });

  it('должен удалять ингредиент из массива по полю key', () => {
    // Задаем состояние, где уже лежит один ингредиент с конкретным key
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockSauce, key: 'test-key-123' }],
    };

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient('test-key-123')
    );

    expect(state.ingredients).toHaveLength(0);
  });

  it('должен менять порядок ингредиентов (moveIngredient)', () => {
    const ingredient1 = { ...mockSauce, key: 'key-1' };
    const ingredient2 = { ...mockMain, key: 'key-2' };

    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2],
    };

    // Перемещаем элемент с индекса 0 на индекс 1
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );

    // Теперь марлин (key-2) должен быть первым, а соус (key-1) вторым
    expect(state.ingredients[0].key).toBe('key-2');
    expect(state.ingredients[1].key).toBe('key-1');
  });

  it('должен очищать конструктор при postOrder.fulfilled', () => {
    const filledState = {
      bun: mockBun,
      ingredients: [{ ...mockSauce, key: 'key-1' }],
    };

    // Создаем экшен, который имитирует успешное выполнение асинхронного postOrder
    const action = { type: postOrder.fulfilled.type };
    const state = constructorReducer(filledState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
