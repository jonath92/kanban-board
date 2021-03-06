// external dependencies
import React, { useState, useEffect, useRef } from 'react'
import BootstrapModal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components/macro'
import { useLocalStorage } from 'react-use';
import { isEqual, pickBy } from 'lodash'

// own modules
import AddEditTaskForm from './AddEditTaskForm'
import { LOCAL_STORAGE_NAMESPACE } from '../Constants'


const Modal = styled(BootstrapModal).attrs(({
    backdrop: "static",  // Modal doesn't close when clicking outside of it
    centered: true,
}))``

export default function AddEditModal(props) {

    const {
        editingTask,
        onSave,
        onClose,
        onDelete
    } = props


    // The initial and the current value are saved to the local Storage to ensure that it can be determined whether a Discard Prompt shall be shown when closing or not - even when the browser has been refreshed
    const [
        editingTaskInitial,
        setEditingTaskInitial,
        clearEditingTaskInitial
    ] = useLocalStorage(
        `${LOCAL_STORAGE_NAMESPACE}_editing_task_initial`,
        null
    )

    const [
        editingTaskCurrent,
        setEditingTaskCurrent,
        clearEditingTaskCurrent
    ] = useLocalStorage(
        `${LOCAL_STORAGE_NAMESPACE}_editing_task_current`,
        null
    )

    const [condition, setCondition] = useState()
    const [formValidated, setFormValidated] = useState(false)

    const formRef = useRef(null)

    useEffect(() => {
        if (!editingTask) return

        setEditingTaskInitial(editingTask)
        setEditingTaskCurrent(editingTask)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTask]) // executed when editing task changed from parent

    useEffect(() => {
        if (!editingTaskInitial) return
        setCondition(getType())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTaskInitial]) // executed when editing task changed from parent or when read from local Storage (i.e on Browser refresh)


    const conditions = new Map([
        ['NEW', {
            title: "New Task",
            showCloseIcon: true,
            renderBodyContent: renderForm,
            footerBtnsRenderer: [renderSaveBtn]

        }],
        ['EDIT', {
            title: "Edit Task",
            showCloseIcon: true,
            renderBodyContent: renderForm,
            footerBtnsRenderer: [renderDeleteBtn, renderSaveBtn]

        }],
        ['DISCARD', {
            title: "Are you sure?",
            showCloseIcon: false,
            renderBodyContent: () => "Discard Changes",
            footerBtnsRenderer: [renderCancelBtn, renderDiscardBtn]
        }],
        ['DELETE', {
            title: "Are you sure?",
            showCloseIcon: false,
            renderBodyContent: () => "Delete Task",
            footerBtnsRenderer: [renderCancelBtn, renderDeleteBtn]
        }]
    ])


    function getType() {
        return editingTaskInitial.id ? 'EDIT' : 'NEW'
    }

    function closeModal() {
        clearEditingTaskCurrent()
        clearEditingTaskInitial()
        setFormValidated(false)
        onClose()
    }

    function handleFormChange(change) {
        const modifiedValue = { ...editingTaskCurrent, ...change }
        const modifiedValueWithoutEmptyString = pickBy(
            modifiedValue, attr => attr !== "")
        setEditingTaskCurrent(modifiedValueWithoutEmptyString)
    }

    function handleCloseAttempt() {

        const hasChanged = !isEqual(
            editingTaskInitial, editingTaskCurrent
        )
        hasChanged ? setCondition('DISCARD') : closeModal()
    }

    function handleSubmit() {
        if (!formRef.current.checkValidity()) {
            setFormValidated(true)
            return
        }

        onSave(editingTaskCurrent)
        closeModal()
    }

    function handleDelete() {
        if (condition !== 'DELETE') {
            setCondition('DELETE')
            return
        }
        onDelete({ id: editingTaskCurrent.id })
        closeModal()
    }

    function renderForm() {
        return (
            <AddEditTaskForm
                ref={formRef}
                {...editingTaskCurrent}
                onChange={handleFormChange}
                validated={formValidated}
            />
        )
    }

    function renderHeader() {
        return (
            <Modal.Header
                closeButton={conditions.get(condition)?.showCloseIcon}
            >
                <Modal.Title>
                    {conditions.get(condition)?.title}
                </Modal.Title>
            </Modal.Header>
        )
    }

    function renderSaveBtn() {
        return (
            <Button
                type="submit"
                key="submit"
                onClick={handleSubmit}
            >
                Save Task
            </Button>
        )
    }

    function renderDeleteBtn() {
        return (
            <Button
                variant="danger"
                key="danger"
                onClick={handleDelete}
            >
                {condition === 'DELETE' ? "Delete" : 'Delete Task'}
            </Button>
        )
    }

    function renderCancelBtn() {
        return (
            <Button
                variant="secondary"
                key="cancel"
                onClick={() => setCondition(getType())}
            >
                Cancel
            </Button>
        )
    }

    function renderDiscardBtn() {
        return (
            <Button
                variant="danger"
                key='discard'
                onClick={() => closeModal()}
            >
                Discard
            </Button>
        )
    }

    function renderBody() {
        return (
            <Modal.Body>
                {conditions.get(condition)?.renderBodyContent()}
            </Modal.Body>
        )
    }

    function renderFooter() {
        return (
            <Modal.Footer>
                {conditions.get(condition)?.footerBtnsRenderer.map(
                    renderer => renderer())
                }
            </Modal.Footer>
        )
    }

    return (
        <Modal
            show={Boolean(editingTaskInitial)}
            onHide={handleCloseAttempt}
        >
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </Modal>
    )
}
