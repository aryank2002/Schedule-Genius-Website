import React from 'react'
import VariableTask from './VariableTask'

const VariableTasks = (props) => {
    return (
        <>
            {props.tasks.map((task) => (
                <VariableTask key={task.id} task={task} onDelete={props.onDelete}/>
            ))}
        </>
    )
}

export default VariableTasks
