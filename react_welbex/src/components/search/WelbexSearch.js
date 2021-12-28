import React, {useMemo, useState} from 'react';
import {Form, Button, FormControl, ModalTitle} from 'react-bootstrap';
import useGetApi from '../hooks';
import { capitalize, fields } from '../../global';

function createSearchQuery(column, matchVariant, inputText){
    const createSearchQuery = {column, matchVariant, inputText};
    return createSearchQuery;
}

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
    
    const searchWelbexQuery = createSearchQuery(selectColumn, selectMatching, selectInput); 
    
    const title = useGetApi();

    const searchedTable = useMemo(() => {
        if (selectColumn === 'title') {
            if (selectMatching === 'contains') {
                return title.filter(table => table.title.toLocaleLowerCase().includes(selectInput.toLocaleLowerCase()));
            } else {
                return title.filter(table => table.title.includes(selectInput));
            }

        } else {
            if (selectMatching === 'contains') {
                return title.filter(table => (
                    // console.log(table[selectColumn], selectInput)
                    table[selectColumn].includes(selectInput)
                ));
            } else if (selectMatching === 'equal') {
                return title.filter(table => (table[selectColumn] ? table[selectColumn] === parseFloat(selectInput) : null));
            } else if (selectMatching === 'gte') {
                return title.filter(table => (table[selectColumn] ? table[selectColumn] >= parseFloat(selectInput) : null));
            } else {
                return title.filter(table => (table[selectColumn] ? table[selectColumn] <= parseFloat(selectInput) : null));
            }
        }
    }, [selectColumn, selectMatching, selectInput])

    console.log(searchedTable);


    return(
        <div className='d-flex justify-content-end'>

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
                    type='text' 
                    className='form-control' 
                    placeholder='Search...'
                    onChange={e => setSelectInput(e.target.value)}
                     />
                </div>
                <div className='d-flex'>
                    <Button 
                    className='ms-2'
                    // onClick={searchQuery}
                    >
                        Search
                    </Button>
                </div>
            </Form>
        </div>
    )
}
