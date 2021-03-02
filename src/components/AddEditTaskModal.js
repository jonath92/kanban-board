// external dependencies
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useMount, useLocalStorage } from 'react-use';

export default function AddEditTaskModal(props) {

    const {
        showInitial
    } = props

    const [show, setShow] = useState(true)


    return (
        <Modal
            show={show}
        >
            hi
        </Modal>
    )
}
