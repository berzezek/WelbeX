import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {capitalize, fields} from "../hooks";


export default function WelbexSearch() {

    const [selectColumn, setSelectColumn] = useState();

    let matching = [];

    if (selectColumn === fields[0] || selectColumn === fields[1]) {
        matching = ['contains', 'equal'];
    } else if (selectColumn  === fields[2] || selectColumn === fields[3]) {
        matching = ['contains', 'equal', 'gte', 'lte'];
    }
    
    const [selectMatching, setSelectMatching] = useState();
    console.log(selectMatching, selectColumn);
    
    return(
        <div className='d-flex justify-content-center'>
            <Form className="d-flex mx-2">
                <div className="d-flex">
                    <Form.Select
                    name="selectColumn"
                    value="selectColumn" 
                    onChange={(e) => setSelectColumn(e.target.value)}
                    >
                        {/* <option value="">Please select column</option> */}
                        {fields.map((field) => (<option key={field} value={field}>{capitalize(field)}</option>))}
                    </Form.Select>
                </div>
                <div className="d-flex">
                    {selectColumn !== null ?
                        <Form.Select 
                        name="selectMatching"
                        value="selectMatching"
                        onChange={(e) => setSelectMatching(e.target.value)}
                        className="mx-2"
                        >
                            {/* <option value="">Search option</option> */}
                            {matching.map((m) => (<option key={m} value={m}>{capitalize(m)}</option>))} 
                        </Form.Select>
                    : null}
                </div>
                <div className="d-flex">
                    <Button className="ms-2">Search</Button>
                </div>
            </Form>
        </div>
    )
}
