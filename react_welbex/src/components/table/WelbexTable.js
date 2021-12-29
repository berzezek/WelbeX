import React, {useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form} from 'react-bootstrap';
import useGetApi from '../hooks';
import { capitalize, fields } from '../global';


export default function WelbexTable() {

    const [selectColumn, setSelectColumn] = useState('');
    const [selectMatching, setSelectMatching] = useState('');
    const [selectInput, setSelectInput] = useState('');

    
    let matching = [];

    if (selectColumn === fields[1]) {
        matching = ['contains', 'equal'];
    } else {
        matching = ['contains', 'equal', 'gte', 'lte'];
    }

    const getTable = useGetApi();
    
    const table = getTable;

    const searchedTable = useMemo(() => {
        if (selectInput === '') {
            return table;
        } else {
            if (selectColumn === fields[0]) {
                // search by title
                if (selectMatching === matching[0]) {
                    return table.filter(table => table[selectColumn].toLowerCase().includes(selectInput.toLowerCase()));
                } else if (selectMatching === matching[1]) {
                    return table.filter(table => table[selectColumn].includes(selectInput));
                }
    
            } else if (selectColumn === fields[1]) {
                // search by date
                if (selectMatching === matching[0]) {
                    return table.filter(table => table[selectColumn].includes(selectInput));
                } else if (selectMatching === matching[1]){
                    return table.filter(table => (table[selectColumn] ? table[selectColumn] === selectInput : null));
                } else if (selectMatching === matching[2]) {
                    return table.filter(table => (table[selectColumn] ? table[selectColumn] >= selectInput : null));
                } else {
                    return table.filter(table => (table[selectColumn] ? table[selectColumn] <= selectInput : null));
                }
    
            } else  {
                // search by quantity & distance 
                if (selectMatching === matching[0]) {
                    return table.filter(table => (table[selectColumn].toString().includes(selectInput)));
                } else if (selectMatching === matching[1]){
                    return table.filter(table => (table[selectColumn] ? table[selectColumn] === parseFloat(selectInput) : null));
                } else if (selectMatching === matching[2]) {
                    return table.filter(table => (table[selectColumn] ? table[selectColumn] >= parseFloat(selectInput) : null));
                } else {
                    return table.filter(table => (table[selectColumn] ? table[selectColumn] <= parseFloat(selectInput) : null));
                }
            }
        }

    }, [selectInput, table, selectColumn, selectMatching, matching])


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

        {searchedTable.length ?
        <>
            <h1 className='text-center my-5'>Welbex Table</h1>
            <p className='text-end me-5 text-muted'>Найдено: {searchedTable.length}</p>
            <Table striped bordered hover variant="dark" className='text-center'>
                <thead>
                    <tr>
                    {fields.map((field) => (<th key={field}>{capitalize(field)}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {searchedTable.map((welbex) => (
                    <tr key={welbex.id}>
                    <td>{welbex.date}</td>
                    <td>{welbex.title}</td>
                    <td>{welbex.quantity}</td>
                    <td>{welbex.distance}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>    
        </>
        :
        <>
            <h1 className='text-center my-5'>Посты не найдены</h1>
        </> }
        </div>
    )
}