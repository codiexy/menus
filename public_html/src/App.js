/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import Routes from './Routes';

import './index.css';
import './pages/menu.css';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </>
  )
}

export default App;













