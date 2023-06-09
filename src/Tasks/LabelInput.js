import React, { useState, useContext, useEffect } from 'react'
import theme from '../ChakraDesign/theme'
import { Box } from '@chakra-ui/react'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'

export default function LabelInput({
    taskId,
    taskLabels,
    setTaskLabels,
    setShowLabelInput,
}) {
    // context
    const { updateTask } = useContext(TasksContext)
    const { labels, createLabel, selectLabel } = useContext(LabelsContext)

    // state
    const [width, setWidth] = useState('20px')
    const [typedLabel, setTypedLabel] = useState('')
    const [focusedLabel, setFocusedLabel] = useState(null)
    const [unselectedLabels, setUnselectedLabels] = useState(
        labels.filter(
            (label) => !taskLabels.map((l) => l._id).includes(label._id)
        )
    )

    // handler functions
    const updateTaskLabels = (newLabels) => {
        updateTask(taskId, { labels: newLabels })
    }

    const handleSelect = (labelName) => {
        console.log('handle select')
        const selectedLabel = unselectedLabels.filter(
            (l) => l.name === labelName
        )[0]

        selectLabel(
            selectedLabel,
            taskLabels,
            setTaskLabels,
            unselectedLabels,
            setUnselectedLabels,
            updateTaskLabels
        )
        setShowLabelInput(false)
    }

    const submitLabel = () => {
        if (labels.map((l) => l.name).includes(typedLabel)) {
            console.log('you already have this label dawg')
        } else {
            createLabel(
                typedLabel,
                theme.colors.purple[500],
                taskLabels,
                setTaskLabels,
                updateTaskLabels
            )
        }

        setShowLabelInput(false)
    }
    useEffect(() => {
        setWidth('160px')
    }, [])

    return (
        <Box width={width} style={{ transition: '200ms ease all' }}>
            <AutoComplete
                openOnFocus
                suggestWhenEmpty
                onOptionFocus={(option) => setFocusedLabel(option.item)}
                onSelectOption={(option) => handleSelect(option.item.value)}
            >
                <AutoCompleteInput
                    h="32px"
                    mr="4px"
                    width={width}
                    style={{ transition: '200ms ease all' }}
                    autoFocus
                    border="2px solid #522ED6"
                    backgroundColor="rgba(118, 61, 225, 0.1)"
                    _focus={{
                        border: '2px solid #522ED6',
                        backgroundColor: 'rgba(118, 61, 225, 0.1)',
                    }}
                    onBlur={() => {
                        setShowLabelInput(false)
                    }}
                    onChange={(event) => setTypedLabel(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 && !focusedLabel) {
                            console.log(focusedLabel)
                            submitLabel()
                        }
                    }}
                />
                <AutoCompleteList
                    mr="4px"
                    width={width}
                    style={{ position: 'sticky', transition: '200ms ease all' }}
                >
                    {unselectedLabels.map((label) => (
                        <AutoCompleteItem
                            h="32px"
                            key={label._id}
                            value={label.name}
                            alignItems="center"
                            onMouseDown={() => handleSelect(label.name)}
                            _focus={{
                                backgroundColor: 'rgba(118, 61, 225, 0.1)',
                            }}
                        >
                            {label.name}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
        </Box>
    )
}
