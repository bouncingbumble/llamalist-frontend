import React, { useState, useContext } from 'react'
import { Flex, Button, Box, MenuButton, MenuList, Menu } from '@chakra-ui/react'
import { LabelsContext } from '../Contexts/LabelsContext'
import { DotsHorizontalIcon } from '../ChakraDesign/Icons'

export default function LabelsFilter() {
    const [showRemainingLabels, setShowRemainingLabels] = useState(false)

    const {
        labels,
        getUsersLabels,
        selectedLabels,
        unselectedLabels,
        selectFilterLabel,
        unselectFilterLabel,
    } = useContext(LabelsContext)

    const handleSelect = (label) => {
        selectFilterLabel(label)
    }

    const handleUnselect = (label) => {
        if (label.name !== 'All Labels') {
            unselectFilterLabel(label)
        } else {
            return
        }
    }
    const MoreLabelsMenu = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Button
                mb="8px"
                variant={'chip-grey'}
                onClick={() => setShowRemainingLabels(true)}
            >
                <DotsHorizontalIcon />
            </Button>
        </span>
    ))

    return (
        <Flex
            ml="-20px"
            mb="20px"
            display={{
                base: 'none',
                md: 'flex',
            }}
        >
            <Button
                mb="8px"
                variant={
                    selectedLabels[0]?.name === 'All Labels'
                        ? 'chip-colored'
                        : 'chip-grey'
                }
                onClick={() =>
                    handleSelect({
                        name: 'All Labels',
                    })
                }
                background={
                    selectedLabels[0]?.name === 'All Labels'
                        ? 'purple.500'
                        : 'gray.100'
                }
                minWidth="104px"
            >
                {selectedLabels[0]?.name !== `All Labels` && (
                    <Box
                        h="12px"
                        w="12px"
                        borderRadius="6px"
                        bg={'purple.500'}
                        mr="4px"
                        ml="-4px"
                    ></Box>
                )}
                All Labels
            </Button>
            <Flex
                display={{
                    base: 'none',
                    md: 'flex',
                }}
                width="100%"
            >
                {selectedLabels.map(
                    (label) =>
                        label.name !== 'All Labels' && (
                            <Button
                                mb="8px"
                                variant="chip-colored"
                                background={
                                    label.color === ''
                                        ? 'purple.500'
                                        : label.color
                                }
                                onClick={() => handleUnselect(label)}
                                key={label._id}
                            >
                                {label.name}
                            </Button>
                        )
                )}
                {selectedLabels[0]?.name === 'All Labels' &&
                    unselectedLabels.map(
                        (label, i) =>
                            label.name !== 'All Labels' &&
                            i < 5 && (
                                <Button
                                    mb="8px"
                                    variant="chip-grey"
                                    onClick={() => handleSelect(label)}
                                    key={label._id}
                                >
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
                                    ></Box>
                                    {label.name}
                                </Button>
                            )
                    )}
                {labels.length > 5 &&
                    unselectedLabels[0]?.name !== 'All Labels' && (
                        <Menu isLazy matchWidth>
                            {({ onClose }) => (
                                <>
                                    <MenuButton
                                        as={MoreLabelsMenu}
                                    ></MenuButton>
                                    <MenuList
                                        flexDirection="column"
                                        minW="0"
                                        width="fit-content"
                                    >
                                        <Flex flexDir="column">
                                            {unselectedLabels.map(
                                                (label, i) =>
                                                    i > 4 && (
                                                        <Button
                                                            mb="8px"
                                                            variant={
                                                                'chip-grey'
                                                            }
                                                            width="fit-content"
                                                            onClick={() => {
                                                                handleSelect(
                                                                    label
                                                                )
                                                                onClose()
                                                            }}
                                                            key={label._id}
                                                        >
                                                            <Box
                                                                h="12px"
                                                                w="12px"
                                                                borderRadius="6px"
                                                                bg={
                                                                    label.color ===
                                                                    ''
                                                                        ? 'purple.500'
                                                                        : label.color
                                                                }
                                                                mr="4px"
                                                                ml="-4px"
                                                            ></Box>
                                                            {label.name}
                                                        </Button>
                                                    )
                                            )}
                                        </Flex>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    )}
            </Flex>
        </Flex>
    )
}
