import {useEffect, useState} from "react";
import axios from "axios";




export default function useGetApi(page_size=5, page=1) {

    const [welbexTableResult, setWelbexTableResult] = useState([]);
    const [welbexTableData, setWelbexTableData] = useState([]);

    useEffect( () => {
        axios({
            method: "GET",
            url: `https://welbextest.herokuapp.com/api/v1/table?page_size=${page_size}&page=${page}`,
        }).then(response => {
            setWelbexTableResult(response.data.results);
            setWelbexTableData(response.data);
        })
    }, [page, page_size])
    return [welbexTableResult, welbexTableData];
};
