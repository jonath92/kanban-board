import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    selectAllTasks,
    addDummyTask
} from '../slices/tasksSlice'

export default function Test() {

    const tasks = useSelector(selectAllTasks);
    const dispatch = useDispatch();

    return (
        <>
            <div>
                {JSON.stringify(tasks)}
            </div>
            <button
                onClick={() =>
                    dispatch(addDummyTask())
                }
            >
                AddDummyTask
            </button>
        </>
    )
}
