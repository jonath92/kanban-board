// external dependencies
import React, { useState, useEffect, useCallback } from 'react'
import BootstrapModal from 'react-bootstrap/Modal'
import { useMount, useLocalStorage } from 'react-use';
import styled from 'styled-components/macro'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// own modules

// constants
const LOCAL_STORAGE_SUB_NAMESPACE = 'addEditTaskModal'


// styles
const Modal = styled(BootstrapModal).attrs(({
    backdrop: "static",  //Modal doesn't close when clicking outside of it
    centered: true,
}))`

`

export default function AddEditTaskModal(props) {

    const {
        editingTaskInitial,
        LOCAL_STORAGE_NAMESPACE,
        modalTitleInitial
    } = props


    // The initial and the current value are saved to the local Storage to ensure that it can be determined whether a Discard Prompt shall be shown when closing or not - even when the browser has been refreshed
    const [
        initialValue,
        saveInitialValueToLocalStorage,
        removeInitialValueFromLocalStorage
    ] = useLocalStorage(
        `${LOCAL_STORAGE_NAMESPACE}_${LOCAL_STORAGE_SUB_NAMESPACE}_initial`,
        editingTaskInitial
    )

    const [
        currentValue,
        saveCurrentValueToLocalStorage,
        removeCurrentValueFromLocalStorage
    ] = useLocalStorage(
        `${LOCAL_STORAGE_NAMESPACE}_${LOCAL_STORAGE_SUB_NAMESPACE}_currrent`,
        editingTaskInitial
    )

    useEffect(() => {
        // this ensures that the storage value is updated when the inital Value is set .
        if (editingTaskInitial) {
            saveInitialValueToLocalStorage(editingTaskInitial)
            saveCurrentValueToLocalStorage(editingTaskInitial)
        }
    }, [editingTaskInitial])


    function handleChange(change) {
        const modifiedValue = { ...currentValue, ...change }
        saveCurrentValueToLocalStorage(modifiedValue)
    }

    function handleClose() {
        removeInitialValueFromLocalStorage()
        removeCurrentValueFromLocalStorage()
    }

    function handleSubmit() {
        console.log("hier weiter machen")
    }

    return (
        <Modal
            show={initialValue ? true : false}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{currentValue?.type ?? ''}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="Enter a Title"
                        // This is a Nullish coalescing (??) and an OptionalChaining(?) operator 
                        defaultValue={currentValue?.title ?? ''}
                        onChange={(e) => handleChange({ title: e.target.value })}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title
                        </Form.Control.Feedback>
                </Form.Group>

            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                >Save Task</Button>

            </Modal.Footer>

        </Modal>
    )
}
