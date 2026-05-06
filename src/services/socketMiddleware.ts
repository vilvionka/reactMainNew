import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './store'; 

export const socketMiddleware = (wsActions: any): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action; // payload будет содержать URL
      const { connect, disconnect, onOpen, setOrders, onError } = wsActions;

      if (type === connect.type) {
        // Берем URL из payload экшена!
        socket = new WebSocket(action.payload); 

        socket.onopen = () => dispatch(onOpen());
        socket.onerror = () => dispatch(onError('WS Error'));
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(setOrders(parsedData));
        };
        socket.onclose = () => { socket = null; };
      }

      if (type === disconnect.type && socket) {
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
};
