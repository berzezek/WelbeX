import {useEffect, useState} from "react";
import axios from "axios";


export default function useGetApi() {

    const [welbexTable, setWelbexTable] = useState([]);

    
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/v1/table/",
        }).then(response => {
            setWelbexTable(response.data);
        })
    }, [])

    return welbexTable;
};
