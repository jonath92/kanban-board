// external dependencies
import React from 'react';
import { createGlobalStyle } from 'styled-components';

// own modules
import KanbanBoard from './components/KanbanBoard'


const GlobalStyle = createGlobalStyle` 
  body {
    font-family: 'PT Sans', sans-serif;
  }`

function App() {
  return (
    <>
      <GlobalStyle />
      <KanbanBoard />
    </>
  );
}

export default App;
