// external dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES } from '../Constants'
import DraggableTaskCard from './DraggableTaskCard'
import Cell from './Cell'

import {
    taskUpdated,

} from '../slices/tasksSlice'

export default function KanbanBoard() {

    const dispatch = useDispatch()

    function handleDrop({ category, id }) {
        dispatch(taskUpdated({ category, id }))
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
        <Matrix>
            {CATEGORIES.map(category => {
                return (
                    <Cell
                        title={category}
                        MainContent={
                            <DropzoneWithChildren
                                key={category}
                                {...{ category }}
                            />
                        }
                    />

                )
            })}
        </Matrix>
    )
}
