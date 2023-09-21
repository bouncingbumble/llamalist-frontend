import React, { useState } from 'react'
import { Flex, MenuButton, MenuList, Menu } from '@chakra-ui/react'
import { DotsHorizontalIcon } from '../ChakraDesign/Icons'
import { useLabels } from '../Hooks/LabelsHooks'
import { useParams, useNavigate } from 'react-router-dom'
import LlamaChip from '../SharedComponents/LlamaChip'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'

export default function LabelsFilter({ goldenLlama, setGoldenLlama }) {
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
                                    text={label.name}
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
                                                            text={label.name}
                                                            style={{
                                                                marginTop:
                                                                    i !== 5 &&
                                                                    '8px',
                                                                width: 'fit-content',
                                                            }}
                                                        ></LlamaChip>
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
                    handleClick={() => toggleSelect({ name: 'All Labels' })}
                    text={selectedLabel}
                ></LlamaChip>
            )}
        </Flex>
    )
}
