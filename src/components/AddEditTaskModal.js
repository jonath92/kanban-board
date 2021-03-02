// external dependencies
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useMount, useLocalStorage } from 'react-use';

export default function AddEditTaskModal(props) {

    const {
        showInitial,
        onChange,
        onSave,
        header
    } = props


    function handleClose() {
        console.log("hi")
    }

    return (
        <Modal
            show={true}
            size="lg"
            centered
            onHide={() => handleClose()}
        >
            hi
        </Modal>
    )
}
