import React from 'react';
import {
  BrowserRouter, Routes, Route, 
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Landing } from './pages/Landing';
import { Edit } from './pages/Edit';
import { Show } from './pages/Show';

import './App.css';

function App() {

  const theme = {
    maxWidth: '1320px',
    headerBgColor: 'black',
    cardWidth: '350px',
    cardHeight: '180px',
    cardScale: '0.7'
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={ <Landing />}></Route>
          <Route path = '/edit' element={ <Edit />}></Route>
          <Route path = '/show' element={ <Show />}></Route>
          {/* <Route path = '*' element = { <Navigate to='*'></Navigate> }></Route> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
