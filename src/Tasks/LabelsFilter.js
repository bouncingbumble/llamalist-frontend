import React, { useState } from 'react'
import LlamaChip from '../SharedComponents/LlamaChip'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'
import { DotsHorizontalIcon } from '../ChakraDesign/Icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useLabels, useDeleteLabel } from '../Hooks/LabelsHooks'
import {
    Text,
    Flex,
    Menu,
    Modal,
    Button,
    MenuList,
    ModalBody,
    MenuButton,
    ModalFooter,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'

export default function LabelsFilter({ goldenLlama, setGoldenLlama }) {
    // hooks
    const labels = useLabels()
    const navigate = useNavigate()
    const deleteLabel = useDeleteLabel()
    const { section, selectedLabel } = useParams()

    // state
    const [labelToDelete, setLabelToDelete] = useState(null)

    // functions
    const toggleSelect = (label) => {
        navigate(`/tasks/${section}/${label.name}`)
    }

    const MoreLabelsMenu = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Flex
                justify="center"
                align="center"
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
            <LlamaChip
                variant={'All Labels' === selectedLabel ? 'solid' : 'outline'}
                colorScheme="blue"
                handleClick={() => toggleSelect({ name: 'All Labels' })}
                text="All Labels"
            />
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
                                <LlamaChip
                                    colorScheme="blue"
                                    variant={
                                        label.name === selectedLabel
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    handleClick={() => toggleSelect(label)}
                                    handleRemove={() => setLabelToDelete(label)}
                                    text={label.name}
                                    key={label._id}
                                />
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
                                                        <LlamaChip
                                                            colorScheme="blue"
                                                            variant="outline"
                                                            handleClick={() => {
                                                                toggleSelect(
                                                                    label
                                                                )
                                                                onClose()
                                                            }}
                                                            handleRemove={() =>
                                                                setLabelToDelete(
                                                                    label
                                                                )
                                                            }
                                                            text={label.name}
                                                            style={{
                                                                marginTop:
                                                                    i !== 5 &&
                                                                    '8px',
                                                                width: 'fit-content',
                                                            }}
                                                            key={label._id}
                                                        />
                                                    )
                                            )}
                                            {!goldenLlama.found &&
                                                goldenLlama.index === 8 && (
                                                    <Flex
                                                        pt="8px"
                                                        justify="center"
                                                    >
                                                        <GoldenLlama
                                                            minHeight={56}
                                                            goldenLlama={
                                                                goldenLlama
                                                            }
                                                            setGoldenLlama={
                                                                setGoldenLlama
                                                            }
                                                        />
                                                    </Flex>
                                                )}
                                        </Flex>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    )}
                </Flex>
            ) : (
                <LlamaChip
                    variant="solid"
                    colorScheme="blue"
                    text={selectedLabel}
                    handleClick={() => toggleSelect({ name: 'All Labels' })}
                />
            )}
            {labelToDelete && (
                <Modal
                    size="lg"
                    isOpen={labelToDelete}
                    onClose={() => setLabelToDelete(null)}
                >
                    <ModalOverlay />
                    <ModalContent p="24px">
                        <Flex direction="column" align="center">
                            <LlamaChip
                                variant="solid"
                                colorScheme="blue"
                                text={labelToDelete.name}
                            />
                            <Flex
                                mt="16px"
                                direction="column"
                                justify="center"
                                align="center"
                            >
                                <Text
                                    mr="8px"
                                    fontSize="16px"
                                    fontWeight="bold"
                                >
                                    Are you sure you want to delete this label?
                                </Text>
                                <Text>
                                    It will be removed from all tasks that
                                    currently have it.
                                </Text>
                            </Flex>
                            <Flex
                                pl="8px"
                                pr="8px"
                                pt="24px"
                                width="100%"
                                justify="space-between"
                            >
                                <Button
                                    size="lg"
                                    onClick={() => setLabelToDelete(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="lg"
                                    color="white"
                                    bg="red.300"
                                    _hover={{ backgroundColor: 'red.200' }}
                                    onClick={() => {
                                        deleteLabel.mutate(labelToDelete)
                                        setLabelToDelete(null)
                                    }}
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalContent>
                </Modal>
            )}
        </Flex>
    )
}
