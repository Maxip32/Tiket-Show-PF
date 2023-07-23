import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './components/Shoppingcart/CartContext.jsx'; // Importa el CartProvider aquí

axios.defaults.baseURL = "http://localhost:3001/";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <CartProvider> {/* Agrega el CartProvider aquí */}
              <App />
            </CartProvider>
          </AuthProvider>
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
