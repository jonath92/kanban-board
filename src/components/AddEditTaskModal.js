// external dependencies
import React, { useState } from 'react'
import BootstrapModal from 'react-bootstrap/Modal'
import { useMount, useLocalStorage } from 'react-use';
import styled from 'styled-components/macro'

const Modal = styled(BootstrapModal).attrs(({ onHide }) => ({
    show: true,
    size: "lg",
    centered: true,
    onHide
}))``


export default function AddEditTaskModal(props) {

    const {
        onChange,
        onSave,
        title
    } = props


    function handleClose() {
        console.log("hi")
    }

    return (
        <Modal
            onHide={() => handleClose()}
        >

            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <input
                type="text"
                onChange={(e) => onChange({ test: e.target.value })}

            />
        </Modal>
    )
}
