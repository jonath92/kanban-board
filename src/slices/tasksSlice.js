import { createSlice } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: SAMPLE_TASKS,
    reducers: {
        addDummyTask: state => {
            state.push({ category: "DO TODAY", title: "created by reducer" })
        }
    }
})

export const { addDummyTask } = tasksSlice.actions;

export const selectAllTasks = state => state.tasks
export default tasksSlice.reducer;