import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { handleToggle, openModal } from "../redux/storeSlice";
import arrowRight from "../assets/arrowRight.png";
import arrowDown from "../assets/arrowDown.png";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import del from "../assets/del.svg";
import RecursiveComponent from "./RecursiveComponent";

const Item = ({ item }: any) => {

    const dispatch = useDispatch<AppDispatch>()
    const { expandedItems, selectedItemId, treeName } = useSelector((state: RootState) => {
        return state.store
    })


    return (
        <li key={item.id}>

            <div
                onClick={() => {
                    dispatch(handleToggle(item.id))
                }}
                style={{
                    cursor: 'pointer',
                    backgroundColor: (selectedItemId === item.id) ? 'lightgray' : 'white',

                }}
            >
                <div className={'item'}>

                    <div className={"item-expandedIcon-container"}>
                        {(item.children.length > 0)
                            ? (expandedItems.includes(item.id))
                                ? <img src={arrowDown} alt="arrow" style={{ width: 12, height: 12 }} />
                                : <img src={arrowRight} alt="arrow" style={{ width: 12, height: 12 }} />
                            : ""
                        }
                    </div>
                    <div>{item.name}</div>
                    <div style={{
                        display: (selectedItemId === item.id) ? 'flex' : 'none',
                    }}>
                        <button
                            className={"custom-button"}
                            onClick={() => {
                                dispatch(openModal({ typeModal: 'add', name: item.name }))
                            }}>
                            <img src={add} alt="arrow" style={{ width: 25, height: 25 }} />
                        </button>
                        {treeName !== item.name &&
                            <button
                                className={"custom-button"}
                                onClick={() => {
                                    dispatch(openModal({ typeModal: 'rename', name: item.name }))
                                }}>
                                <img src={edit} alt="arrow" style={{ width: 25, height: 25 }} />
                            </button>
                        }

                        {treeName !== item.name &&
                            <button
                                className={"custom-button"}
                                onClick={() => {
                                    dispatch(openModal({ typeModal: 'delete', name: item.name }))
                                }}>
                                <img src={del} alt="arrow" style={{ width: 25, height: 25 }} />
                            </button>
                        }
                    </div>
                </div>
            </div>

            {item.children.length > 0 && expandedItems.includes(item.id) && (
                <RecursiveComponent data={item.children} />
            )}

        </li>
    )
}

export default Item
