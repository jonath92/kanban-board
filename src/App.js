import React from 'react';
// import { Counter } from './components/Counter';
import Test from './components/Test'
import KanbanBoard from './components/KanbanBoard'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard />
      {/* // <Counter /> */}
    </DndProvider>

  );
}

export default App;
