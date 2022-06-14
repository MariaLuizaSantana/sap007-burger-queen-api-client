import React, { useState } from 'react'
import Operator from './operator'

function OperatorSub (){
    const [counter, setCounter] = useState(0)
    function decrement(){
        setCounter(counter - 1)
    }
    return(
        <>
            <Operator clickFunction={decrement} calculator='-'/>
        </>
    )
}

export default OperatorSub