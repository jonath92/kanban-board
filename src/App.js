import React from 'react';
// import { Counter } from './components/Counter';
import KanbanBoard from './components/KanbanBoard'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard />
    </DndProvider>

  );
}

export default App;
