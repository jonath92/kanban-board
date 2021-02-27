import React from 'react'
import Matrix from './Matrix'
import Dropzone from './Dropzone'

export default function KanbanBoard() {
    return (
        <Matrix>
            <Dropzone>hi</Dropzone>
            <Dropzone>hi</Dropzone>
            <Dropzone>hi</Dropzone>
            <Dropzone>hi</Dropzone>
        </Matrix>
    )
}
