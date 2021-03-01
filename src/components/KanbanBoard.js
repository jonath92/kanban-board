// external dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES } from '../Constants'
import DraggableTaskCard from './DraggableTaskCard'

import {
    taskUpdated,

} from '../slices/tasksSlice'

export default function KanbanBoard() {

    const dispatch = useDispatch()



    const DropzoneWithChildren = ({ category }) => {
        const filteredTasks = useSelector(state =>
            state.tasks.filter((task => task.category === category))
        )
        return (
            <Dropzone
                handleDrop={(id) => {
                    dispatch(taskUpdated({ category: category, id: id }))

                }}>
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
                    <DropzoneWithChildren
                        key={category}
                        {...{ category }}
                    />
                )
            })}
        </Matrix>
    )
}
