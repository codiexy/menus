import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";
import 'font-awesome/css/font-awesome.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <App />
    <ToastContainer />
  </>
  // </React.StrictMode>
  
  
);

