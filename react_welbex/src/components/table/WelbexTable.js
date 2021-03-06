import React, {useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form} from 'react-bootstrap';
import useGetApi from '../hooks';
import { capitalize, fields } from '../global';


export default function WelbexTable() {

    const [selectColumn, setSelectColumn] = useState('');
    const [selectMatching, setSelectMatching] = useState('');
    const [selectInput, setSelectInput] = useState('');

    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);

    const matching = useMemo(() => {
        if (selectColumn === fields[1]) {
            return ['contains', 'equal'];
        } else {
            return['contains', 'equal', 'gte', 'lte'];
        }
    }, [selectColumn]);

    const allTable = useGetApi(Number.MAX_SAFE_INTEGER, 1)[0];
    const allTableData = useGetApi(Number.MAX_SAFE_INTEGER, 1)[1];
    const pagTable = useGetApi(pageSize, page)[0];

    const getPageCount = Math.ceil(allTable.length / pageSize);

    const pageSizeCount = [5, 10, 50, 100];    
    
    let pageArray = []
    for (let i = 0; i < getPageCount; i++) {
        pageArray.push(i + 1);
    }
    
    const searchedTable = useMemo(() => {
        if (selectInput === '' || selectColumn === '' || selectMatching === '') {
            return pagTable;
        } else {
            if (selectColumn === fields[0]) {
                // search by title
                if (selectMatching === matching[0]) {
                    return allTable.filter(allTable => allTable[selectColumn].toLowerCase().includes(selectInput.toLowerCase()));
                } else if (selectMatching === matching[1]) {
                    return allTable.filter(allTable => allTable[selectColumn].includes(selectInput));
                }
    
            } else if (selectColumn === fields[1]) {
                // search by date
                if (selectMatching === matching[0]) {
                    return allTable.filter(allTable => allTable[selectColumn].includes(selectInput));
                } else if (selectMatching === matching[1]){
                    return allTable.filter(allTable => (allTable[selectColumn] ? allTable[selectColumn] === selectInput : null));
                } else if (selectMatching === matching[2]) {
                    return allTable.filter(allTable => (allTable[selectColumn] ? allTable[selectColumn] >= selectInput : null));
                } else {
                    return allTable.filter(allTable => (allTable[selectColumn] ? allTable[selectColumn] <= selectInput : null));
                }
    
            } else {
                // search by quantity & distance 
                if (selectMatching === matching[0]) {
                    return allTable.filter(allTable => (allTable[selectColumn].toString().includes(selectInput)));
                } else if (selectMatching === matching[1]){
                    return allTable.filter(allTable => (allTable[selectColumn] ? allTable[selectColumn] === parseFloat(selectInput) : null));
                } else if (selectMatching === matching[2]) {
                    return allTable.filter(allTable => (allTable[selectColumn] ? allTable[selectColumn] >= parseFloat(selectInput) : null));
                } else {
                    return allTable.filter(allTable => (allTable[selectColumn] ? allTable[selectColumn] <= parseFloat(selectInput) : null));
                }
            }
        }

    }, [selectInput, selectColumn, selectMatching, pagTable, matching, allTable]);



    const table = (selectInput === '' ? pagTable : searchedTable);

    return(
        <div className=''>
        <Form className='d-flex mx-2'>
            <div className='d-flex me-1'>
                <select
                name='selectColumn'
                value={selectColumn}
                className='form-select' 
                onChange={e => setSelectColumn(e.target.value)}
                >
                    <option disabled value=''>Please select column</option>
                    {fields.map((field) => (<option key={field} value={field}>{capitalize(field)}</option>))}
                </select>
            </div>
            <div className='d-flex '>
                {selectColumn !== '' ?
                    <select 
                    name='selectMatching'
                    value={selectMatching}
                    onChange={e => setSelectMatching(e.target.value)}
                    className='form-select'
                    >
                        <option disabled value=''>Search option</option>
                        {matching.map((m) => (<option key={m} value={m}>{capitalize(m)}</option>))} 
                    </select>
                : null}
            </div>
            <div>
                <input 
                type={selectColumn === 'date' && selectMatching !== 'contains' ? 'date' : 'text'} 
                className='form-control ms-1' 
                placeholder='Search...'
                onChange={e => setSelectInput(e.target.value)}
                 />
            </div>
        </Form>

        {searchedTable.length || selectMatching !== '' ?
        <>
            <h1 className='text-center my-5'>Welbex Table</h1>
            <p className='text-end me-2 text-muted'>?????????????? ?? ??????????????: {allTableData.count}, ????????????????: {searchedTable.length}.</p>
            <Table striped bordered hover variant="dark" className='text-center'>
                <thead>
                    <tr>
                    {fields.map((field) => (<th key={field}>{capitalize(field)}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {table.map((welbex) => (
                    <tr key={welbex.id}>
                    <td>{welbex.date}</td>
                    <td>{welbex.title}</td>
                    <td>{welbex.quantity}</td>
                    <td>{welbex.distance}</td>
                    </tr>
                    ))}
                </tbody>
            </Table> 
            <div className='d-flex justify-content-center'>
                {pageArray.map(p =>  
                    <span 
                    onClick={() => setPage(p)}
                    key={p} 
                    className={page === p 
                        ? 'btn btn-primary me-1' 
                        : 'btn btn-secondary me-1' }>
                            {p}
                    </span>    
                )}
                <select 
                name='pageSize'
                value={pageSize}
                onChange={e => setPageSize(e.target.value)}
                className='form-select w-25'
                >
                    <option disabled value=''>Search option</option>
                    {pageSizeCount.map((p) => (<option key={p} value={p}>{p}</option>))} 
                </select>
            </div> 
        </>
        :
        <>
            <h1 className='text-center my-5'>?????????? ???? ??????????????</h1>
        </>}

        </div>
    )
}