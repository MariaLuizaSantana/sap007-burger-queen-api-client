function Operator (props){
    return(
        <button id='operatorSumMenu' onClick={props.clickFunction}>{props.calculator}</button>
    )
}

export default Operator