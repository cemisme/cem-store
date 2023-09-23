import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
      </Routes>
    </div>
  );
};

export default App;