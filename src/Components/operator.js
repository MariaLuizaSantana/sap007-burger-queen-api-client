import './operator.css'

function Operator (props){
    return(
        <button
            className = 'operatorSumMenu'
            onClick={props.clickFunction}>{props.calculator}

         </button>
    )
}

export default Operator