import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import useGetApi from '../hooks';
import { capitalize, fields } from '../../global';
import WelbexSearch from '../search';


export default function WelbexTable() {

    
    return(
        <>
            <h1 className='text-center my-5'>Welbex Table</h1>
            <Table striped bordered hover variant="dark" className='text-center'>
                <thead>
                    <tr>
                    {fields.map((field) => (<th key={field}>{capitalize(field)}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {useGetApi().map((welbex) => (
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
    )
}