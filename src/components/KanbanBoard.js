// external dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// own modules
import Matrix from './Matrix'
import Dropzone from './Dropzone'
import { CATEGORIES } from '../Constants'
import TaskCard from './TaskCard'


import {
    addDummyTask,
    selectTasksByCategory
} from '../slices/tasksSlice'

export default function KanbanBoard() {


    const DropzoneWithChildren = ({ category }) => {

        const filteredTasks = useSelector(state =>
            selectTasksByCategory(state, category)
        )

        return (
            <Dropzone>
                {filteredTasks.map(task => {
                    return (
                        <TaskCard
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
