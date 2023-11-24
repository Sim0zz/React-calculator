import React, { useState } from 'react';
import Row from './Row/Row';
import "./Calculator.css"

function Calculator() {
    // Rows state (id to identify the single row, numeric value, operation to execute and a disabled check)
    const [rows, setRows] = useState([{id: 0, value: 0, operation: "+", disabled: false}])
    const [total, setTotal] = useState(0)

    // Rendering of the rows 
    function RenderRows(){
        const rowResult = []
        // Push in an array the component Row and the necessary props to do operations when updated
        rows.forEach(row => {
            rowResult.push(<Row key={row.id} id={row.id} value={row.value} operation={row.operation} disabled={row.disabled} setRows={SetRows}/>)
        })
        return rowResult
    }
    // Update state of rows whenever a change occurs
    function SetRows(id, value, operation, disabled, canc=false){
        // Get the current rows setup
        let rowsResult = rows
        // Deletes record if canc set to 'true' (false by default)
        if(canc){
            rowsResult = rowsResult.filter(row => row.id !== id)
        }
        // Update the row with the same id as the one passed in the function
        else{
            rowsResult = rowsResult.map(row => {
                if(row.id === id){
                    row.value = value
                    row.operation = operation
                    row.disabled = disabled
                }
                return row
            })
        }
        // Calculate the total result of each row value
        let result = 0
        rowsResult.forEach(row =>  {
            // Ignore row if disabled
            if(!row.disabled)
            {
                // Adds or subtracts the value saved in the row based on the operation attribute of the row
                result = row.operation === "+" ? result + Number(row.value) : row.operation === "-" ? result - Number(row.value) : result
            }
        })
        // Save the results in the respective state
        setTotal(result)
        setRows(rowsResult)
    }
    return (
        <div className='container'>
            <h1>React Calculator</h1>
            <button onClick={() => setRows(rows.concat([{
                // Generate a new row with default values and concatenate it in the rows state
                id: rows.length,
                value: 0,
                operation: "+"
            }]))}>Add new row</button>
            <ul>
            {
                RenderRows()
            }
            </ul>
            <p><strong>Result: </strong> <span>{total}</span></p>
        </div>
    );
}

export default Calculator;