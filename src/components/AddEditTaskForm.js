// external dependencies
import React, { forwardRef } from 'react'
import Form from 'react-bootstrap/Form'

// own modules
import { CATEGORIES } from '../Constants'


const AddEditTaskForm = forwardRef((props, ref) => {
    const {
        title = '',
        onChange,
        validated,
        category,
        description = ''
    } = props





    return (
        <Form {...{ validated }} {...{ ref }} >
            <Form.Group>

                <Form.Label>Title</Form.Label>
                <Form.Control
                    placeholder="Enter a Title"
                    defaultValue={title}
                    onChange={e => onChange({ title: e.target.value })}
                    required
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please provide a title
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    as="select"
                    defaultValue={category}
                    onChange={e => onChange({ category: e.target.value })}
                >
                    {CATEGORIES.map(category => {
                        return (
                            <option key={category}>{category}</option>
                        )
                    })}

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="Enter a Description (optional)"
                    as="textarea"
                    rows={3}
                    defaultValue={description}
                    onChange={e => onChange({ description: e.target.value })}
                />

            </Form.Group>


        </Form>
    )
})

export default AddEditTaskForm