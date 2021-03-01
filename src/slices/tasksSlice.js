import { createSlice } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: SAMPLE_TASKS,
    reducers: {
        dummyTaskAdded: state => {
            state.push({ category: "DO TODAY", title: "created by reducer" })
        },
        taskUpdated(state, action) {
            const existingTask = state.find(task =>
                task.id === action.payload.id)
            Object.assign(existingTask, action.payload)
        }
    }
})

export const { dummyTaskAdded, taskUpdated } = tasksSlice.actions;


export const selectTaskById = (state, taskId) => state.tasks.find(task => task.id === taskId)


export default tasksSlice.reducer;