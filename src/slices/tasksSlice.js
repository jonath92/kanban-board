import { createSlice, nanoid } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: SAMPLE_TASKS,
    reducers: {
        taskAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(newTask) {
                return {
                    payload: {
                        id: nanoid(),
                        ...newTask
                    }
                }
            }
        },
        taskUpdated(state, action) {
            const existingTask = state.find(task =>
                task.id === action.payload.id)
            Object.assign(existingTask, action.payload)
        }
    }
})

export const { taskUpdated, taskAdded } = tasksSlice.actions;


export const selectTaskById = (state, taskId) =>
    state.tasks.find(task => task.id === taskId)

export const selectTaskByCategory = (state, category) =>
    state.tasks.filter(task => task.category === category)



export default tasksSlice.reducer;