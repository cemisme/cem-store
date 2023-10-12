import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import MessPage from './pages/MessPage';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/messenger' element={<MessPage></MessPage>}></Route>

      </Routes>
    </div>
  );
};

export default App;