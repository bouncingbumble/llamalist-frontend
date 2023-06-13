import React, { useState } from 'react'
import { Flex, Button, Box, MenuButton, MenuList, Menu } from '@chakra-ui/react'
import { DotsHorizontalIcon } from '../ChakraDesign/Icons'
import { useLabelsQuery } from '../Hooks/LabelsQueryHooks'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export default function LabelsFilter() {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['user'])
    const [showRemainingLabels, setShowRemainingLabels] = useState(false)

    const labelsQuery = useLabelsQuery({ userId: user._id })

    const toggleSelect = (label) => {}

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

    if (labelsQuery.isLoading) return <p>Loading...</p>
    if (labelsQuery.isError) return <p>Error</p>

    return (
        <Flex
            display={{
                base: 'none',
                md: 'flex',
            }}
            alignItems="center"
        >
            <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => toggleSelect()}
                mr="8px"
                height="24px"
                size="xs"
            >
                All Labels
            </Button>
            <Flex
                display={{
                    base: 'none',
                    md: 'flex',
                }}
                width="100%"
                alignItems="center"
            >
                {labelsQuery.data.map((label) => (
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        size="xs"
                        height="24px"
                        onClick={() => toggleSelect(label)}
                        key={label._id}
                        mr="8px"
                    >
                        {label.name}
                    </Button>
                ))}
                {labelsQuery.data.length > 5 && (
                    <Menu isLazy matchWidth>
                        {({ onClose }) => (
                            <>
                                <MenuButton as={MoreLabelsMenu}></MenuButton>
                                <MenuList
                                    flexDirection="column"
                                    minW="0"
                                    width="fit-content"
                                >
                                    <Flex flexDir="column">
                                        {labelsQuery.data.map(
                                            (label, i) =>
                                                i > 4 && (
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="outline"
                                                        size="xs"
                                                        height="24px"
                                                        width="fit-content"
                                                        onClick={() => {
                                                            toggleSelect(label)
                                                            onClose()
                                                        }}
                                                        key={label._id}
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
        </Flex>
    )
}
