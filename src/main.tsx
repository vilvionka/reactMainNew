import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './services/store';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd'; // Импортируем провайдер
import { HTML5Backend } from 'react-dnd-html5-backend'; // Импортируем бэкенд
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';


createRoot(document.getElementById('root')as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <App />
        </Router>
      </DndProvider>
    </Provider>
  </StrictMode>,
)
