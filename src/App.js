import React  from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import SingleMovie from './SingleMovie';
import Error from './Error';
import './App.css'

function App() {
  return (  
    <>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/movie/:id' element={<SingleMovie />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
    </>
      
  );
}

export default App;
