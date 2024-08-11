import React from "react";
import Error from "./Error";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Status = () => {
    const { status} = useSelector((state: RootState) => {
        return state.store
    })

    return (
        <div className={'main_loader-container'}>
            <span>status:</span>
            {status === 'resolved' && <span style={{color: 'green'}}> Everything is great...</span>}
            {status === 'pending' && <span style={{color: 'blue'}}> Loading...</span>}
            {status === 'rejected' && <Error/>}
        </div>
    );
}

export default Status
