// external dependencies
import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { useMount, useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES, LOCAL_STORAGE_NAMESPACE } from '../Constants'
import DraggableItem from './DraggableItem'
import TaskCard from './TaskCard'
import Cell from './Cell'
import CustomDragLayer from './CustomDragLayer'
import AddEditTaskModal from './AddEditTaskModal'


import {
    taskUpdated,
    selectTaskById,
    selectTaskByCategory
} from '../slices/tasksSlice'

export default function KanbanBoard() {

    // it is true in the beginning as we don't know if the content of the modal has been saved to the localStorage in the previous session (Modal has to handle that case byitself)
    const [editingTask, setEditingTask] = useState(null)

    const dispatch = useDispatch()

    function handleDrop({ category, id }) {
        dispatch(taskUpdated(...arguments))
    }

    function handlePlusClick() {
        setEditingTask({ title: "hi" })

        // dispatch(editingTaskInitialized())
        // setEditingTask("hi")
    }



    //  The Item shown on the custom layer when dragging
    function DragItem({ id }) {
        const task = useSelector(state => selectTaskById(state, id))
        return (
            <TaskCard {...task} />
        )
    }

    function DraggableTaskCard(props) {
        const { id, ...otherProps } = props

        return (
            <DraggableItem
                {...{ id }}
                style={{ width: "90%" }}
                className="py-4 py-md-3"
            >
                <TaskCard {...otherProps} />
            </DraggableItem>
        )
    }

    const DropzoneWithChildren = ({ category }) => {

        const filteredTasks = useSelector(state => selectTaskByCategory(state, category))

        return (
            <Dropzone onDrop={
                (id) => handleDrop({ category, id })
            }>
                {filteredTasks.map(task => {
                    return (
                        <DraggableTaskCard
                            {...task}
                            key={task.id}
                        />
                    )
                })}
            </Dropzone>
        )
    }

    const CellGroup = () => {
        return (
            <>
                {CATEGORIES.map(category => {
                    return (
                        <Cell
                            title={category}
                            key={category}
                            onPlusClick={handlePlusClick}
                            MainContent={
                                <DropzoneWithChildren
                                    {...{ category }}
                                />
                            }
                        />

                    )
                })}
            </>
        )
    }


    function renderModal() {
        // const { type, id, ...otherProps } = editingTask
        return (

            <AddEditTaskModal
                modalTitleInitial="New Task"
                {...{ LOCAL_STORAGE_NAMESPACE }}
                editingTaskInitial={editingTask}
            />
        )
    }

    return (
        <>
            <DndProvider options={HTML5toTouch}>
                <Matrix>
                    <CellGroup />
                </Matrix>
                <CustomDragLayer {...{ DragItem }} />
            </DndProvider>

            {renderModal()}
        </>
    )
}
