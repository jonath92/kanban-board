// external dependencies
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// see: https://github.com/kilkelly/redux-localstorage-simple/issues/44#issuecomment-627074618
import { save, load } from "redux-localstorage-simple"

// own modules
import tasksReducer from './slices/tasksSlice';

const LOCAL_STORAGE_NAMESPACE = "todo-board"


export default configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    middleware: [
        ...getDefaultMiddleware(),
        save({
            states: ["tasks"],
            namespace: LOCAL_STORAGE_NAMESPACE
        })
    ],
    preloadedState: load({
        states: ["tasks"],
        namespace: LOCAL_STORAGE_NAMESPACE
    })
});
