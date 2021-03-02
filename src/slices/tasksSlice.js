import { createSlice } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: SAMPLE_TASKS,
    reducers: {
        taskUpdated(state, action) {
            const existingTask = state.find(task =>
                task.id === action.payload.id)
            Object.assign(existingTask, action.payload)
        }
    }
})

export const { taskUpdated } = tasksSlice.actions;


export const selectTaskById = (state, taskId) =>
    state.tasks.find(task => task.id === taskId)

export const selectTaskByCategory = (state, category) =>
    state.tasks.filter(task => task.category === category)



export default tasksSlice.reducer;