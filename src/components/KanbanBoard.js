// external dependencies
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use';
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
import AddEditTaskForm from './AddEditTaskForm'
import {
    taskUpdated,
    selectTaskById,
    selectTaskByCategory
} from '../slices/tasksSlice'

// constants
const LOCAL_STORAGE_EDITING_TASK = '_editing_task'

export default function KanbanBoard() {

    const dispatch = useDispatch()

    const [modalCondition, setModalCondition] = useState("")

    // The initial and the current value are saved to the local Storage to ensure that it can be determined whether a Discard Prompt shall be shown when closing or not - even when the browser has been refreshed
    const [
        editingTaskInitial,
        setEditingTaskInitial,
        clearEditingTaskInitial
    ] = useLocalStorage(
        `${LOCAL_STORAGE_NAMESPACE}${LOCAL_STORAGE_EDITING_TASK}_initial`,
        null
    )

    const [
        editingTaskCurrent,
        setEditingTaskCurrent,
        clearEditingTaskCurrent
    ] = useLocalStorage(
        `${LOCAL_STORAGE_NAMESPACE}${LOCAL_STORAGE_EDITING_TASK}_current`,
        null
    )


    function handleDrop({ category, id }) {
        dispatch(taskUpdated(...arguments))
    }

    function handlePlusClick() {

        const editingTask = {
            title: "hi",
        }

        setEditingTaskInitial(editingTask)
        setEditingTaskCurrent(editingTask)
        setModalCondition("NEW")
        // dispatch(editingTaskInitialized())
        // setEditingTask("hi")
    }

    function handleFormChange(change) {
        const modifiedValue = { ...editingTaskCurrent, ...change }
        setEditingTaskCurrent(modifiedValue)
    }

    function handleModalCloseAttempt() {
        setModalCondition("DISCARD")
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

            <AddEditModal
                show={Boolean(editingTaskInitial)}
                condition={modalCondition}
                onCloseAttempt={handleModalCloseAttempt}

            >
                <AddEditTaskForm
                    {...editingTaskInitial}
                    onChange={handleFormChange}
                />

            </AddEditModal>

        </>
    )
}
