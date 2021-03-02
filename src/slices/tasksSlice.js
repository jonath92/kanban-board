import { createSlice } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        persistent: SAMPLE_TASKS,
        editing: null
    },
    reducers: {
        taskUpdated(state, action) {
            const existingTask = state.persistent.find(task =>
                task.id === action.payload.id)
            Object.assign(existingTask, action.payload)
        }
    }
})

export const { dummyTaskAdded, taskUpdated } = tasksSlice.actions;


export const selectTaskById = (state, taskId) =>
    state.tasks.persistent.find(task => task.id === taskId)

export const selectTaskByCategory = (state, category) =>
    state.tasks.persistent.filter(task => task.category === category)


export default tasksSlice.reducer;