import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import Button from "react-bootstrap/Button";
import {collapsAll, expandAll} from "../redux/storeSlice";

const CollapseButtons = () => {
    const dispatch = useDispatch()
    const {data} = useSelector((state: RootState) => {
        return state.store
    })

    return (
        <div className={'main_button-container'}>
            <Button
                variant="secondary"
                onClick={() => {
                    dispatch(expandAll(data))
                }}
            >Expand all</Button>

            <Button
                variant="secondary"
                onClick={() => {
                    dispatch(collapsAll())
                }}>Collapse all</Button>
        </div>
    );
}

export default CollapseButtons
