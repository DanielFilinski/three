import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Error = (): React.JSX.Element => {
    const [isShow, setIsShow] = useState(true);

    const {error} = useSelector((state: RootState) => {
        return state.store
    })

    setTimeout(() => {
        setIsShow((prev: boolean) => !prev)
    }, 3500)

    return (
        <span style={{display: (isShow) ? 'flex' : 'none', color: 'red'}}>
            Error... {error}
        </span>
    )
}

export default Error
