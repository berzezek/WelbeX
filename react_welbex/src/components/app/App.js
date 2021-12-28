import React from 'react';
import WelbexTable from '../table';
import WelbexNavbar from '../navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



export default function App() {
    return(
        <div>
            <Router>
                <WelbexNavbar />

            </Router>
            <Router>
                    <Routes>
                        <Route path="/table" element={
                            <WelbexTable />
                            } />
                    </Routes>
            </Router>
        </div>
    )
}