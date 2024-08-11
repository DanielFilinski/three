import React from "react";
import {dataInt} from "../redux/storeSlice";
import Item from "./Item";

const RecursiveComponent = ({data}: {data: dataInt[] }) => {
    return (
        <>
            {data.map((item: dataInt) => (
                <ul key={item.id}>
                    <Item item={item}/>
                </ul>
            ))}
        </>

    );
}

export default RecursiveComponent
