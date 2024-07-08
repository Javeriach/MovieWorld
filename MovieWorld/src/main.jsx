import React, { useState } from 'react';
import App from './App.jsx';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      theme="dark"
      transition={Bounce}
      bodyClassName="toastBody"
      closeButton={false}
  />
  </React.StrictMode>
);
