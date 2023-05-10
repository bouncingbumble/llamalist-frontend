import React, { useState, useEffect, useContext } from 'react'
import { AddTaskIcon } from '../ChakraDesign/Icons'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import { Input, Kbd, Flex, Button, Box, Tooltip } from '@chakra-ui/react'
import getCaretCoordinates from 'textarea-caret'

export default function CreateTaskInput({
    urgency,
    msCreateTask,
    disableDropdown,
    setIsTemplatesOpen,
    setWalkthroughDescription,
}) {
    // context
    const { createTask } = useContext(TasksContext)
    const { labels, getUsersLabels } = useContext(LabelsContext)

    // state
    const [description, setDescription] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownCoordinates, setDropdownCoordinates] = useState({})

    const dropdownWidth = 200

    const handleSubmit = () => {
        if (setWalkthroughDescription) {
            setWalkthroughDescription(description)
        } else {
            if (msCreateTask) {
                msCreateTask({ description })
            } else {
                createTask({ description }, urgency)
            }

            if (description.includes('#')) {
                // get existing labels and labels made in task
                const usersLabels = labels.map((l) => '#' + l.name)
                const taskLabels = description
                    .split(' ')
                    .filter((w) => w.includes('#'))

                // test function to check if a label is not part of existing labels
                const isNewLabel = (labelName) =>
                    !usersLabels.includes(labelName)

                // function that checks if some items in an array pass test function
                taskLabels.some(isNewLabel) && getUsersLabels()
            }
            setDescription('')
        }
    }

    const openDropdown = () => {
        const input = document.getElementById('create-task-input')
        let x = 0
        let y = 2
        let h = 27

        if (input) {
            const caret = getCaretCoordinates(input, input.selectionEnd)
            h = caret.height

            if (
                caret.left < input.clientWidth - dropdownWidth &&
                caret.top <= 1
            ) {
                x += caret.left
                y = 1 - caret.height
            }

            setDropdownCoordinates({ x, y, h })
            setDropdownOpen(true)
        }
    }

    const ForwardRefWrapper = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            {children}
        </span>
    ))

    const CustomTooltip = ({ label, children }) => (
        <Tooltip label={label}>
            <ForwardRefWrapper>{children}</ForwardRefWrapper>
        </Tooltip>
    )

    useEffect(() => {
        if (!Boolean(dropdownOpen)) {
            setTimeout(() => {
                let el = document.getElementById('create-task-input')
                if (el !== null) {
                    el.focus()
                }
            }, 250)
        }
    }, [dropdownOpen])

    return (
        <Flex
            width="50%"
            alignItems="center"
            justifyContent="space-between"
            height="32px"
        >
            <Flex alignItems="center" width="100%">
                <CustomTooltip label="Create task from a template">
                    <AddTaskIcon
                        mr="9px"
                        mt="2px"
                        ml="-1px"
                        color="#8f9bb3"
                        cursor="pointer"
                        transition="0.3s ease all"
                        _hover={{ color: '#0a58ce' }}
                        onClick={() =>
                            setIsTemplatesOpen && setIsTemplatesOpen(true)
                        }
                    />
                </CustomTooltip>
                <Box w="100%" h="27px">
                    <Input
                        autoFocus
                        id="create-task-input"
                        placeholder="Type a task here"
                        autoComplete="off"
                        variant="unstyled"
                        name="description"
                        size="lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={(e) => {
                            if (Number(e.keyCode) === 13) {
                                e.preventDefault()
                                e.stopPropagation()
                                handleSubmit()
                            }
                            if (
                                !disableDropdown &&
                                Number(e.keyCode) === 51 &&
                                e.shiftKey
                            ) {
                                e.preventDefault()
                                e.stopPropagation()
                                openDropdown()
                            }
                        }}
                    />
                </Box>
            </Flex>
            {description.length > 0 && (
                <Button
                    colorScheme="blue"
                    variant="solid"
                    size="md"
                    marginLeft="16px"
                    mr={{ base: 'none', md: '32px' }}
                    onClick={handleSubmit}
                    display="flex"
                    minW="120px"
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        submit{' '}
                        <Kbd
                            color="black"
                            marginLeft="4px"
                            borderColor="grey.800"
                        >
                            enter
                        </Kbd>
                    </span>
                </Button>
            )}
        </Flex>
    )
}
