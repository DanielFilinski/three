import {dataInt} from "../redux/storeSlice";

 const getAllIds = (arr: dataInt[], idsArr: number[]) => {

    arr.forEach((item:dataInt) => {
        if (item.id)
            idsArr.push(item.id);
        if (item.children && item.children.length > 0)
            getAllIds(item.children, idsArr);
    })
}

export default getAllIds
