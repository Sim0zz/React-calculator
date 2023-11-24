import React, { useState } from 'react';
import "./Row.css"


function Row({id, value, operation, disabled, setRows}){
    // States to save the current operation, value and disable check of the row
    const [op, setOp] = useState(operation)
    const [val, setVal] = useState(value)
    const [disable, toggleEnable] = useState(disabled)
    return (
        <>
        <li disabled={disable}>
            <select defaultValue={operation} onChange={(e) => {
                // Set the current operation to the selected one then trigger the parent function to update the rows state
                setOp(e.currentTarget.value)
                setRows(id, Number(val), e.currentTarget.value, disable)
            }}>
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
            <input type="number" disabled={disable} onChange={(e) => {
                // Set the current value in input then trigger the parent function to update the rows state
                setVal(Number(e.currentTarget.value))
                setRows(id, Number(e.currentTarget.value), op, disable)
            }}/>
            <button onClick={() => {
                // Trigger the parent function to delete the current row from the rows state
                setRows(id, Number(val), op, disable, true)
            }}>Delete</button>
            <button defaultValue={disabled} onClick={() => {
                // Toggles the disable check then trigger the parent function to update the rows state
                toggleEnable(!disable)
                setRows(id, Number(val), op, !disable)
            }}>{disable ? "Enable" : "Disable"}</button>
        </li>
        </>
    );
}

export default Row;