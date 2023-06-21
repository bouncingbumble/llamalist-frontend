import React, { useState } from 'react'
import { Flex, Button, Box, MenuButton, MenuList, Menu } from '@chakra-ui/react'
import { DotsHorizontalIcon } from '../ChakraDesign/Icons'
import { useLabels } from '../Hooks/LabelsHooks'
import { useParams, useNavigate } from 'react-router-dom'

export default function LabelsFilter() {
    const [showRemainingLabels, setShowRemainingLabels] = useState(false)
    const { section, selectedLabel } = useParams()
    const navigate = useNavigate()
    const labels = useLabels()

    const toggleSelect = (label) => {
        navigate(`/tasks/${section}/${label.name}`)
    }

    const MoreLabelsMenu = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Flex
                justify="center"
                align="center"
                onClick={() => setShowRemainingLabels(true)}
                _hover={{ cursor: 'pointer' }}
                color="blue.500"
            >
                <DotsHorizontalIcon />
            </Flex>
        </span>
    ))

    if (labels.isLoading) return <p>Loading...</p>
    if (labels.isError) return <p>Error</p>

    return (
        <Flex
            display={{
                base: 'none',
                md: 'flex',
            }}
            alignItems="center"
        >
            <Button
                variant={'All Labels' === selectedLabel ? 'solid' : 'outline'}
                colorScheme="blue"
                onClick={() => toggleSelect({ name: 'All Labels' })}
                mr="8px"
                height="24px"
                size="xs"
            >
                All Labels
            </Button>
            {selectedLabel === 'All Labels' ? (
                <Flex
                    display={{
                        base: 'none',
                        md: 'flex',
                    }}
                    width="100%"
                    alignItems="center"
                >
                    {labels.data.map(
                        (label, i) =>
                            i < 5 && (
                                <Button
                                    colorScheme="blue"
                                    variant={
                                        label.name === selectedLabel
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    size="xs"
                                    height="24px"
                                    onClick={() => toggleSelect(label)}
                                    key={label._id}
                                    mr="8px"
                                >
                                    {label.name}
                                </Button>
                            )
                    )}
                    {labels.data.length > 5 && (
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
                                            {labels.data.map(
                                                (label, i) =>
                                                    i > 4 && (
                                                        <Button
                                                            colorScheme="blue"
                                                            variant="outline"
                                                            size="xs"
                                                            height="24px"
                                                            width="fit-content"
                                                            onClick={() => {
                                                                toggleSelect(
                                                                    label
                                                                )
                                                                onClose()
                                                            }}
                                                            key={label._id}
                                                            mt={
                                                                i !== 5 && '8px'
                                                            }
                                                        >
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
            ) : (
                <Button
                    variant={'solid'}
                    colorScheme="blue"
                    onClick={() => toggleSelect({ name: 'All Labels' })}
                    mr="8px"
                    height="24px"
                    size="xs"
                >
                    {selectedLabel}
                </Button>
            )}
        </Flex>
    )
}
