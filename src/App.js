import React from 'react';
// import { Counter } from './components/Counter';
import KanbanBoard from './components/KanbanBoard'
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

import Test from './components/Test';

function App() {
  return (
    <DndProvider options={HTML5toTouch}>
      <KanbanBoard />
    </DndProvider>

  );
}

export default App;
