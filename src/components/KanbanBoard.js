// external dependencies
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES, LOCAL_STORAGE_NAMESPACE } from '../Constants'
import DraggableItem from './DraggableItem'
import TaskCard from './TaskCard'
import Cell from './Cell'
import CustomDragLayer from './CustomDragLayer'
import AddEditModal from './AddEditModal'

import {
    taskUpdated,
    selectTaskById,
    selectTaskByCategory,
    taskAdded
} from '../slices/tasksSlice'


export default function KanbanBoard() {

    const dispatch = useDispatch()
    const [editingTask, setEditingTask] = useState(null)

    //  The Item shown on the custom layer when dragging
    const DragItem = ({ id }) => {
        const task = useSelector(state => selectTaskById(state, id))
        return (
            <TaskCard {...task} />
        )
    }

    function renderDraggableTaskCard(task) {
        const { id, ...otherProps } = task

        return (
            <DraggableItem
                {...{ id }}
                key={id}
                style={{ width: "90%" }}
                className="py-4 py-md-3"
            >
                <TaskCard
                    {...otherProps}
                    onClick={() => setEditingTask(task)}
                />
            </DraggableItem>
        )
    }

    const DropzoneWithChildren = ({ category }) => {
        const dispatch = useDispatch()
        const filteredTasks = useSelector(state => selectTaskByCategory(state, category))

        return (
            <Dropzone onDrop={(id) =>
                dispatch(taskUpdated({ category, id }))
            }>
                {filteredTasks.map(
                    task => renderDraggableTaskCard(task)
                )}
            </Dropzone>
        )
    }

    function renderCell(category) {
        return (
            <Cell
                {...{ category }}
                key={category}
                onPlusClick={() => setEditingTask({ category })}
            >
                <DropzoneWithChildren
                    {...{ category }}
                />
            </Cell>
        )

    }

    function renderCellGroup() {
        return (
            CATEGORIES.map(category => {
                return (
                    renderCell(category)
                )
            })
        )
    }

    return (
        <>
            <DndProvider options={HTML5toTouch}>
                <Matrix>
                    {renderCellGroup()}
                </Matrix>
                <CustomDragLayer {...{ DragItem }} />
            </DndProvider>
            <AddEditModal
                {...{ editingTask }}
                onSave={(editingTask) => dispatch(taskAdded(editingTask))}
                onClose={() => setEditingTask(null)}
            />
        </>
    )
}
