// external dependencies
import React, { useState, useEffect, useCallback } from 'react'
import BootstrapModal from 'react-bootstrap/Modal'
import { useMount, useLocalStorage } from 'react-use';
import styled from 'styled-components/macro'
import Form from 'react-bootstrap/Form'
// own modules

// constants
const LOCAL_STORAGE_SUB_NAMESPACE = 'addEditTaskModal'


// styles
const Modal = styled(BootstrapModal).attrs(({
    backdrop: "static",  //Modal doesn't close when clicking outside of it
    centered: true
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
        saveInitialValueToLocalStorage(editingTaskInitial)
        saveCurrentValueToLocalStorage(editingTaskInitial)
    }, [editingTaskInitial])


    function handleChange(change) {
        const modifiedValue = { ...currentValue, ...change }
        saveCurrentValueToLocalStorage(modifiedValue)
    }

    return (
        <Modal
            show={initialValue ? true : false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitleInitial}</Modal.Title>
            </Modal.Header>


            <input
                // This is a Nullish coalescing (??) and an OptionalChaining(?) operator 
                value={currentValue?.title ?? ''}
                onChange={(e) => handleChange({ title: e.target.value })}

            />
        </Modal>
    )
}
