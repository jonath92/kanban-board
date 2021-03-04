import React from 'react'
import Form from 'react-bootstrap/Form'

export default function AddEditTaskForm(params) {

    const {
        title = '',
        onChange
    } = params

    return (
        <Form>
            <Form.Label>Title</Form.Label>
            <Form.Control
                placeholder="Enter a Title"
                defaultValue={title}
                onChange={e => onChange({ title: e.target.value })}
            >
            </Form.Control>
        </Form>
    )
}
