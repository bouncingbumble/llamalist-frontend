import React, { useState, useContext } from 'react'
import theme from '../ChakraDesign/theme'
import { Box } from '@chakra-ui/react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { useUpdateTask } from '../Hooks/TasksHooks'
import { useCreateLabel, useLabels } from '../Hooks/LabelsHooks'

export default function LabelInput({
    taskId,
    taskLabels,
    setTaskLabels,
    setShowLabelInput,
}) {
    const updateTask = useUpdateTask()
    const labels = useLabels()
    const createLabel = useCreateLabel()

    // state
    const [typedLabel, setTypedLabel] = useState('')
    const [unselectedLabels, setUnselectedLabels] = useState(
        labels.data.filter(
            (label) => !taskLabels.map((l) => l._id).includes(label._id)
        )
    )

    // handler functions
    const updateTaskLabels = (newLabels) => {
        updateTask.mutate({ _id: taskId, labels: newLabels })
    }

    const handleSelect = (option) => {
        const selectedLabel = labels.data.filter(
            (l) => l.name === option.item.value
        )[0]

        setTaskLabels([...taskLabels, selectedLabel])
        const newLabels = [...taskLabels, selectedLabel].map((l) => l._id)

        updateTask.mutate({ _id: taskId, labels: newLabels })
    }

    const submitLabel = () => {
        if (labels.data.map((l) => l.name).includes(typedLabel)) {
            console.log('you already have this label dawg')
        } else {
            createLabel.mutate({
                name: typedLabel,
            })
        }

        setShowLabelInput(false)
    }

    return (
        <Box>
            <AutoComplete
                openOnFocus
                suggestWhenEmpty
                onSelectOption={handleSelect}
            >
                <AutoCompleteInput
                    h="32px"
                    w="160px"
                    autoFocus
                    border="2px solid #522ED6"
                    backgroundColor="rgba(118, 61, 225, 0.1)"
                    _focus={{
                        border: '2px solid #522ED6',
                        backgroundColor: 'rgba(118, 61, 225, 0.1)',
                    }}
                    onChange={(event) => setTypedLabel(event.target.value)}
                    // onBlur={submitLabel}
                    onKeyDown={(event) => {
                        event.keyCode === 13 && submitLabel()
                    }}
                />
                <AutoCompleteList
                    mr="4px"
                    w="160px"
                    style={{ position: 'sticky' }}
                >
                    {unselectedLabels.map((label) => (
                        <AutoCompleteItem
                            key={label._id}
                            h="32px"
                            value={label.name}
                            alignItems="center"
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
