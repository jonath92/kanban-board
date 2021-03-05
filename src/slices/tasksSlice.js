import { createSlice, nanoid } from '@reduxjs/toolkit';
import { SAMPLE_TASKS } from '../Constants'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: SAMPLE_TASKS,
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
            const existingTask = state.find(task =>
                task.id === action.payload.id)
            Object.assign(existingTask, action.payload)
        }

    }
})

export const { taskPutted, taskUpdated } = tasksSlice.actions;


export const selectTaskById = (state, taskId) =>
    state.tasks.find(task => task.id === taskId)

export const selectTaskByCategory = (state, category) =>
    state.tasks.filter(task => task.category === category)



export default tasksSlice.reducer;