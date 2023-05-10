import React, { useState, useEffect, useContext } from 'react'
import {
    InputGroup,
    InputRightAddon,
    Input,
    Box,
    Button,
    Flex,
    Text,
    Tooltip,
} from '@chakra-ui/react'
import { PencilIcon } from '../ChakraDesign/Icons'
import OOModal from '../SharedComponents/OOModal'
import theme from '../ChakraDesign/theme'
import { LabelsContext } from '../Contexts/LabelsContext'

export default function LabelsMenu({
    cards,
    setCards,
    isOpen,
    onClose,
    selectedLabels,
    setSelectedLabels,
    updateCardLabels,
}) {
    // state variables
    const [editMode, setEditMode] = useState(false)
    const [labelToEdit, setLabelToEdit] = useState(null)
    const [labelExists, setLabelExists] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [unselectedLabels, setUnselectedLabels] = useState([])
    const [newLabel, setNewLabel] = useState({
        name: '',
        color: '',
    })

    // context variables
    const {
        labels,
        createLabel,
        updateLabel,
        deleteLabel,
        selectLabel,
        unselectLabel,
        initNonTaskLabels,
    } = useContext(LabelsContext)

    // label handlers
    const handleSubmit = () => {
        createLabel(
            newLabel.name,
            newLabel.color,
            selectedLabels,
            setSelectedLabels,
            updateCardLabels
        )
        setNewLabel({ name: '', color: '' })
    }

    const handleUpdate = () => {
        updateLabel(
            cards,
            setCards,
            setEditModalOpen,
            labelToEdit,
            setLabelToEdit,
            setLabelExists,
            selectedLabels,
            setSelectedLabels,
            unselectedLabels,
            setUnselectedLabels
        )
    }

    const handleDelete = () => {
        deleteLabel(
            labelToEdit,
            cards,
            setCards,
            setEditModalOpen,
            setLabelToEdit,
            setLabelExists,
            selectedLabels,
            setSelectedLabels,
            unselectedLabels,
            setUnselectedLabels
        )
    }

    const handleSelect = (label) => {
        selectLabel(
            label,
            selectedLabels,
            setSelectedLabels,
            unselectedLabels,
            setUnselectedLabels,
            updateCardLabels
        )
    }

    const handleUnselect = (label) => {
        unselectLabel(
            label,
            selectedLabels,
            setSelectedLabels,
            setUnselectedLabels,
            updateCardLabels
        )
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
        initNonTaskLabels(selectedLabels, setUnselectedLabels)
    }, [])

    return (
        <>
            <OOModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                title="Add or remove a label"
                secondaryButton={{
                    onClick: () => setEditMode(!editMode),
                    text: (
                        <>
                            <span>
                                {editMode ? 'Done Editing' : 'Edit Labels'}
                            </span>
                            <PencilIcon />
                        </>
                    ),
                }}
            >
                <Flex direction="column">
                    <InputGroup mt="8px" mb="8px">
                        <Input
                            autoFocus
                            id="label-input"
                            value={newLabel.name}
                            placeholder="Create a new label..."
                            onKeyDown={(e) =>
                                e.keyCode === 13 && handleSubmit()
                            }
                            autoComplete="off"
                            onChange={(e) =>
                                setNewLabel({
                                    ...newLabel,
                                    name: e.target.value,
                                })
                            }
                        />
                    </InputGroup>
                    <Box maxH="480px" overflow="auto">
                        <Box minH="40px" mt="8px" w="400px">
                            {selectedLabels.map((label) => (
                                <Button
                                    mb="8px"
                                    variant="chip-colored"
                                    background={
                                        label.color === ''
                                            ? 'purple.500'
                                            : label.color
                                    }
                                    onClick={() => handleUnselect(label)}
                                >
                                    {label.name}
                                    {editMode && (
                                        <PencilIcon
                                            style={{ marginRight: -8 }}
                                            _hover={{
                                                color: theme.colors.grey[400],
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                setLabelToEdit(label)
                                                setEditModalOpen(true)
                                            }}
                                        />
                                    )}
                                </Button>
                            ))}
                        </Box>
                        <Box mt="0px" w="400px">
                            {unselectedLabels
                                .filter((l) =>
                                    l.name
                                        .toLowerCase()
                                        .includes(
                                            newLabel.name.toLocaleLowerCase()
                                        )
                                )
                                .map((label) => (
                                    <Button
                                        mb="8px"
                                        variant="chip-grey"
                                        onClick={() => handleSelect(label)}
                                    >
                                        <CustomTooltip label="Change color">
                                            <Box
                                                h="12px"
                                                w="12px"
                                                borderRadius="6px"
                                                bg={
                                                    label.color === ''
                                                        ? 'purple.500'
                                                        : label.color
                                                }
                                                mr="4px"
                                                ml="-4px"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setLabelToEdit(label)
                                                }}
                                            />
                                        </CustomTooltip>
                                        {label.name}
                                        {editMode && (
                                            <PencilIcon
                                                color={theme.colors.grey[900]}
                                                style={{ marginRight: -8 }}
                                                _hover={{
                                                    color: theme.colors.black,
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setLabelToEdit(label)
                                                    setEditModalOpen(true)
                                                }}
                                            />
                                        )}
                                    </Button>
                                ))}
                        </Box>
                    </Box>
                </Flex>
            </OOModal>

            {editModalOpen && (
                <OOModal
                    isOpen={editModalOpen}
                    onClose={() => {
                        setLabelToEdit(null)
                        setEditModalOpen(false)
                    }}
                    onSubmit={handleUpdate}
                    title="Edit Label"
                    secondaryButton={{
                        onClick: (e) => {
                            e.stopPropagation()
                            handleDelete()
                        },
                        text: 'Delete Label',
                        style: {
                            backgroundColor: theme.colors.red[500],
                            color: theme.colors.white,
                        },
                    }}
                >
                    <InputGroup mt="8px" mb="8px">
                        <Input
                            autoFocus
                            autoComplete="off"
                            id="edit-label-input"
                            value={labelToEdit.name}
                            placeholder="Edit label name..."
                            onChange={(e) =>
                                setLabelToEdit({
                                    ...labelToEdit,
                                    name: e.target.value,
                                })
                            }
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleUpdate()
                                }
                            }}
                        />
                    </InputGroup>
                    {labelExists && (
                        <Text
                            ml="8px"
                            fontSize="14px"
                            color={theme.colors.red[500]}
                        >
                            *this label already exists
                        </Text>
                    )}
                </OOModal>
            )}
        </>
    )
}
