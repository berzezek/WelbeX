import React, {useState} from 'react';
import WelbexTable from '../table';
import WelbexNavbar from '../navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { testText } from '../global';
import useGetApi from '../hooks';



export default function App() {

    return(
        <Router>
            <WelbexNavbar />
                <Routes>
                    <Route path='/' element={
                        <div className='container'>
                            <pre>
                                {testText}
                            </pre>
                        </div>
                    } 
                    />
                    <Route path='/table' element={
                        <div className='container'>
                            <WelbexTable />
                        </div>
                        } />
                </Routes>
        </Router>
    )
}