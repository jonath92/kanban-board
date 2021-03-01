// external dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES } from '../Constants'
// TODO DraggableTask more generic machen
import DraggableTaskCard from './DraggableTaskCard'
import TaskCard from './TaskCard'
import Cell from './Cell'
import CustomDragLayer from './CustomDragLayer'

import {
    taskUpdated,
    selectTaskById,
} from '../slices/tasksSlice'



export default function KanbanBoard() {

    const dispatch = useDispatch()

    function handleDrop({ category, id }) {
        dispatch(taskUpdated(...arguments))
    }



    function DragItem({ id }) {
        const task = useSelector(state => selectTaskById(state, id))
        return (
            <TaskCard {...task} />
        )
    }

    const DropzoneWithChildren = ({ category }) => {
        const filteredTasks = useSelector(state =>
            state.tasks.filter((task => task.category === category))
        )
        return (
            <Dropzone
                onDrop={(id) => handleDrop({ category, id })
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




    return (
        <>
            <Matrix>
                {CATEGORIES.map(category => {
                    return (
                        <Cell
                            title={category}
                            key={category}
                            MainContent={
                                <DropzoneWithChildren
                                    {...{ category }}
                                />
                            }
                        />

                    )
                })}
            </Matrix>
            <CustomDragLayer
                {...{ DragItem }}
            />
        </>
    )
}
