import React, { useState } from 'react'
import Operator from './operator'


function OperatorSum (){
    
    const [counter, setCounter] = useState(0)
    console.log(counter)
    function increment(){
        console.log('aumenta')
        setCounter(counter + 1)
    } 
    return(
        <>
            <Operator clickFunction={increment} calculator='+'/>
        </>
    )
}
export default OperatorSum