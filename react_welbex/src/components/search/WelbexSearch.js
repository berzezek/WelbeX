import React, {useMemo, useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import useGetApi from '../hooks';
import { capitalize, fields } from '../global';


export default function WelbexSearch() {

    const [selectColumn, setSelectColumn] = useState('');
    const [selectMatching, setSelectMatching] = useState('');
    const [selectInput, setSelectInput] = useState('');

    
    let matching = [];

    if (selectColumn === fields[1]) {
        matching = ['contains', 'equal'];
    } else {
        matching = ['contains', 'equal', 'gte', 'lte'];
    }
    
    const table = useGetApi();

    const searchedTable = useMemo(() => {
        if (selectColumn === fields[0]) {
            // search by title
            if (selectMatching === matching[0]) {
                return table.filter(table => table[selectColumn].toLowerCase().includes(selectInput.toLowerCase()));
            } else {
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

        } else {
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
    }, [selectInput, table])

    return(
        <div className='d-flex justify-content-end'>
            {searchedTable.map((field) => (<p key={field.id} value={field.title}>{capitalize(field.title)}</p>))}
            <Form className='d-flex mx-2'>
                <div className='d-flex'>
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
                <div className='d-flex'>
                    {selectColumn !== null ?
                        <select 
                        name='selectMatching'
                        value={selectMatching}
                        onChange={e => setSelectMatching(e.target.value)}
                        className='mx-2 form-select'
                        >
                            <option disabled value=''>Search option</option>
                            {matching.map((m) => (<option key={m} value={m}>{capitalize(m)}</option>))} 
                        </select>
                    : null}
                </div>
                <div>
                    <input 
                    // type='text'
                    type={selectColumn === 'date' && selectMatching !== 'contains' ? 'date' : 'text'} 
                    className='form-control' 
                    placeholder='Search...'
                    onChange={e => setSelectInput(e.target.value)}
                     />
                </div>
            </Form>
        </div>
    )
}
