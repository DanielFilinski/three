import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addItem, closeModal, deleteItem, renameItem, setModalInputValue, setModalTitle } from "../redux/storeSlice";
import { type } from "os";

function isEmptyString(str: string) {
    return str.trim().length === 0;
}
function ModalWindow() {
    const dispatch = useDispatch<AppDispatch>()
    const { currentModalValue: { value, title, placeholder }, treeName, selectedItemId, isModalOpen, currentItem: { typeModal, name } } = useSelector((state: RootState) => {
        return state.store
    })

    const handleTextChange = (event: { target: { value: string } }) => {
        console.log('handleTextChange', event.target.value)
        dispatch(setModalInputValue(event.target.value));
    };

    const handleClose = () => {
        dispatch(closeModal())
    }

    const handleBtnConfirm = () => {
        switch (typeModal) {
            case 'add':
                if (!isEmptyString(value)) {
                    dispatch(addItem({ treeName: treeName, nodeName: value, parentNodeId: selectedItemId }))
                    dispatch(closeModal())
                } else {
                    dispatch(setModalTitle('please enter Node Name'))
                }

                break;
            case 'rename':
                if (!isEmptyString(value)) {
                    dispatch(renameItem({ treeName: treeName, newNodeName: value, nodeId: selectedItemId }))
                    dispatch(closeModal())
                } else {
                    dispatch(setModalTitle('please enter New Node Name'))
                }
                break;
            case 'delete':
                dispatch(deleteItem({ treeName: treeName, nodeId: selectedItemId }))
                dispatch(closeModal())
                break;
            default:
                alert("Нет таких значений");
        }
    }

    return (
        <>
            <Modal show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{typeModal.charAt(0).toUpperCase() + typeModal.slice(1)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(typeModal !== 'delete')
                        ? <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div style={{ display: 'flex', flexDirection: "column" }}>

                                    <Form.Label>{title}</Form.Label>
                                </div>
                                <Form.Control
                                    type="default"
                                    placeholder={placeholder}
                                    autoFocus
                                    value={value}
                                    onChange={handleTextChange}
                                />
                            </Form.Group>
                        </Form>
                        : <span>Do you want to delete {name}?</span>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="primary" onClick={handleBtnConfirm}>
                        {typeModal.toUpperCase()}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalWindow;
