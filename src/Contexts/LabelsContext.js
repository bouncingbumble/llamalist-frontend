import React, { createContext } from 'react'
import UseLabelsState from '../Hooks/UseLabelsState'

const defaultLabels = []
export const LabelsContext = createContext()

export function LabelsProvider(props) {
    const labelsStuff = UseLabelsState(defaultLabels)
    return (
        <LabelsContext.Provider value={labelsStuff}>
            {props.children}
        </LabelsContext.Provider>
    )
}
