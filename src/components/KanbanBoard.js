// external dependencies
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { useMount } from 'react-use';

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES } from '../Constants'
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

    const [editingTask, setEditingTask] = useState(
        useSelector(state => state.tasks.editing)
    )

    const dispatch = useDispatch()

    function handleDrop({ category, id }) {
        dispatch(taskUpdated(...arguments))
    }

    function handlePlusClick() {
        setEditingTask("hi")
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

    return (
        <>
            <DndProvider options={HTML5toTouch}>
                <Matrix>
                    <CellGroup />
                </Matrix>
                <CustomDragLayer {...{ DragItem }} />
            </DndProvider>
            {editingTask && <AddEditTaskModal show={editingTask} />}
        </>
    )
}
