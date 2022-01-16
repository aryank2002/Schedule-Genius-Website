import React from 'react'
import FixedTask from './FixedTask'

const FixedTasks = (props) => {
    return (
        <>
            {props.tasks.map((task) => (
                <FixedTask key={task.id} task={task} onDelete={props.onDelete}/>
            ))}
        </>
    )
}

export default FixedTasks
