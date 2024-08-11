import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { getData } from "./redux/storeSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWindow from "./components/ModalWindow";

import RecursiveComponent from "./components/RecursiveComponent";
import Status from "./components/Status";
import CollapseButtons from "./components/CollapseButtons";

function App() {

    const dispatch = useDispatch<AppDispatch>()
    const { data, status } = useSelector((state: RootState) => {
        return state.store
    })

    useEffect(() => {
        if (status === 'firstStart' || status === 'added') {
            dispatch(getData())
        }
    }, [status])

    return (
        <div className={'main'}>
            <ModalWindow />
            <Status />
            <CollapseButtons />
            <RecursiveComponent data={[data]} />
        </div>
    )
}

export default App;

