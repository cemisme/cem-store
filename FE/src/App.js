import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/signin' element={<SigninPage></SigninPage>}></Route>
      </Routes>
    </div>
  );
};

export default App;