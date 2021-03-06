import { createSlice, nanoid } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

const initalTasksWithID = SAMPLE_TASKS.map(task => {
    return { ...task, id: nanoid() }
})

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initalTasksWithID,
    reducers: {
        // put like in HTTP - updates or create new
        taskPutted: {
            reducer(state, action) {
                if (action.payload.type === 'Add') {
                    state.push(action.payload.task)
                } else {
                    tasksSlice.caseReducers.taskUpdated(
                        state,
                        { payload: action.payload.task }
                    )
                }
            },

            prepare(newUpdatedTask) {
                let payload
                if (newUpdatedTask.id) {
                    payload = { type: 'Update', task: newUpdatedTask }
                } else {
                    payload = {
                        type: 'Add',
                        task: { id: nanoid(), ...newUpdatedTask }
                    }
                }
                return { ...{ payload } }
            }
        },
        taskUpdated(state, action) {

            const updatedTask = action.payload

            const index = state.findIndex(task => task.id === updatedTask.id)
            const existingTask = state[index]

            const categoryChanged = (existingTask.category !== updatedTask.category)
            Object.assign(existingTask, updatedTask)

            // moving element to end if category has changed
            if (categoryChanged) {
                return void (state.push(state.splice(index, 1)[0]))
            }


        },
        taskDeleted(state, action) {
            return state.filter(task => task.id !== action.payload.id)
        }
    }
})

export const { taskPutted, taskUpdated, taskDeleted } = tasksSlice.actions;


export const selectTaskById = (state, taskId) =>
    state.tasks.find(task => task.id === taskId)

export const selectTaskByCategory = (state, category) =>
    state.tasks.filter(task => task.category === category)



export default tasksSlice.reducer;