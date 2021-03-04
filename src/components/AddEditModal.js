// external dependencies
import React, { useState, useEffect, useRef } from 'react'
import BootstrapModal from 'react-bootstrap/Modal'
import styled from 'styled-components/macro'
import Button from 'react-bootstrap/Button'
// own modules

// constants
const LOCAL_STORAGE_SUB_NAMESPACE = 'addEditTaskModal'

// styles
const Modal = styled(BootstrapModal).attrs(({
    backdrop: "static",  //Modal doesn't close when clicking outside of it
    centered: true,
}))``

export default function AddEditModal(props) {

    // type is one of: "NEW, EDIT, DELETE, DISCARD"
    // the type must be set in the parent
    const {
        children, // the Form
        show,
        condition,
        onCloseAttempt
    } = props



    // const [validated, setValidated] = useState(false);
    // const formRef = useRef(null)


    // function handleCloseAttempt() {
    //     removeInitialValueFromLocalStorage()
    //     removeCurrentValueFromLocalStorage()
    // }

    function handleSubmit() {
        console.log("hi")

        // if (formRef.current.checkValidity() === false) {
        //     setValidated(true)
        //     return
        // }
    }



    return (
        <Modal
            show={show}
            onHide={onCloseAttempt}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {condition === "NEW" ? "New Task" : "Iwas"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {children}

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
