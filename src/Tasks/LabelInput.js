import React, { useState, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
} from '@choc-ui/chakra-autocomplete'
import { useUpdateTask } from '../Hooks/TasksHooks'
import { useCreateLabel, useLabels } from '../Hooks/LabelsHooks'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'

export default function LabelInput({ task, setShowLabelInput, goldenLlama }) {
    // query
    const labels = useLabels()
    const updateTask = useUpdateTask()
    const createLabel = useCreateLabel()

    const unselectedLabels = labels.data.filter(
        (label) => !task.labels.map((l) => l._id).includes(label._id)
    )

    // state
    const [typedLabel, setTypedLabel] = useState('')

    // dynamic styles
    const [width, setWidth] = useState('0px')
    const [padding, setPadding] = useState('0px')

    // handlers
    const handleClose = () => {
        setWidth('0px')
        setPadding('0px')
        setTimeout(() => {
            setShowLabelInput(false)
        }, 200)
    }

    const handleSelect = (option) => {
        handleClose()

        if (labels.data.map((l) => l.name).includes(option.item.value)) {
            const selectedLabel = labels.data.filter(
                (l) => l.name === option.item.value
            )[0]

            const newLabels = [...task.labels, selectedLabel]

            updateTask.mutate({ ...task, labels: newLabels })
        } else {
            createLabel.mutate({
                labelName: option.item.value,
                task,
            })
        }
    }

    useEffect(() => {
        setWidth('160px')
        setPadding('16px')
    }, [])

    return (
        <Box
            mr="4px"
            h="32px"
            w={width}
            style={{ transition: '200ms ease all' }}
        >
            <AutoComplete
                openOnFocus
                suggestWhenEmpty
                onSelectOption={handleSelect}
            >
                <AutoCompleteInput
                    h="32px"
                    autoFocus
                    w={width}
                    pl={padding}
                    pr={padding}
                    value={typedLabel}
                    onBlur={handleClose}
                    borderWidth="2px"
                    borderColor="purple.500"
                    backgroundColor="rgba(118, 61, 225, 0.1)"
                    _focus={{ borderColor: 'purple.500' }}
                    onChange={(event) => {
                        setTypedLabel(event.target.value.substring(0, 20))
                    }}
                    style={{ transition: '200ms ease all', boxShadow: 'none' }}
                />
                <AutoCompleteList w="160px" style={{ position: 'sticky' }}>
                    {typedLabel &&
                        !labels.data
                            .map((l) => l.name)
                            .includes(typedLabel) && (
                            <AutoCompleteItem
                                key={0}
                                h="32px"
                                fixed
                                value={typedLabel}
                                alignItems="center"
                                _focus={{
                                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                                }}
                            >
                                {typedLabel}
                            </AutoCompleteItem>
                        )}

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
                    {!goldenLlama.found && goldenLlama.index === 16 && (
                        <Flex pt="8px" justify="center">
                            <GoldenLlama minHeight={54} />
                        </Flex>
                    )}
                </AutoCompleteList>
            </AutoComplete>
        </Box>
    )
}
