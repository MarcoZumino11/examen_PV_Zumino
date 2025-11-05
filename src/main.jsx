import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tema.css'; 

// Solo borra localStorage si se cerró completamente la app
if (import.meta.env.MODE === "development" && performance.navigation.type === 1) {
  localStorage.clear();
}

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
