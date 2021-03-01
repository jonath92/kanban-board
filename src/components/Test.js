import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    dummyTaskAdded
} from '../slices/tasksSlice'

export default function Test() {

    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    return (
        <>
            <div>
                {JSON.stringify(tasks)}
            </div>
            <button
                onClick={() =>
                    dispatch(dummyTaskAdded())
                }
            >
                AddDummyTask
            </button>
        </>
    )
}
