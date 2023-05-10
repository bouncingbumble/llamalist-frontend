import React, { createContext } from 'react'
import UseTasksState from '../Hooks/UseTasksState'

const defaultTasks = []
export const TasksContext = createContext()

export function TasksProvider(props) {
    const tasksStuff = UseTasksState(defaultTasks)
    return (
        <TasksContext.Provider value={tasksStuff}>
            {props.children}
        </TasksContext.Provider>
    )
}
