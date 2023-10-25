import React, { useState } from 'react'
import LLModal from '../../SharedComponents/LLModal'
import LocationsTab from './Locations/LocationsTab'
import AccessoriesTab from './Accessories/AccessoriesTab'
import { Flex, Text } from '@chakra-ui/react'
import LlamasTab from './Llamas/LlamasTab'

export default function LlamaStore({ isOpen, onClose }) {
    // state
    const [tab, setTab] = useState(0)

    return (
        <LLModal
            isOpen={isOpen}
            onClose={onClose}
            backgroundColor="purpleFaded.100"
        >
            <Flex mt="16px" width="100%" justify="center">
                <Text fontSize="48px" fontWeight="bold">
                    Apple Orchard Emporium
                </Text>
            </Flex>
            <Flex
                h="2px"
                top="198px"
                bg="purple.400"
                position="absolute"
                transition="0.4s ease all"
                width="calc((100vw - 48px) / 3)"
                ml={`calc((100vw - 48px) / 3 * ${tab})`}
            />
            <Flex
                mt="32px"
                h="56px"
                borderBottom="2px solid"
                borderBottomColor="purpleFaded.300"
            >
                <Flex
                    width="33%"
                    align="center"
                    justify="center"
                    cursor="pointer"
                    borderTopRadius="8px"
                    onClick={() => setTab(0)}
                    transition="0.3s ease all"
                    _hover={{ backgroundColor: 'purpleFaded.200' }}
                >
                    <Text
                        fontSize="24px"
                        color={tab === 0 ? 'purple.400' : 'purpleFaded.500'}
                    >
                        Accessories
                    </Text>
                </Flex>
                <Flex
                    width="33%"
                    align="center"
                    justify="center"
                    cursor="pointer"
                    borderTopRadius="8px"
                    onClick={() => setTab(1)}
                    transition="0.3s ease all"
                    _hover={{ backgroundColor: 'purpleFaded.200' }}
                >
                    <Text
                        fontSize="24px"
                        color={tab === 1 ? 'purple.400' : 'purpleFaded.500'}
                    >
                        Locations
                    </Text>
                </Flex>
                <Flex
                    width="33%"
                    align="center"
                    justify="center"
                    cursor="pointer"
                    borderTopRadius="8px"
                    onClick={() => setTab(2)}
                    transition="0.3s ease all"
                    _hover={{ backgroundColor: 'purpleFaded.200' }}
                >
                    <Text
                        fontSize="24px"
                        color={tab === 2 ? 'purple.400' : 'purpleFaded.500'}
                    >
                        Llamas
                    </Text>
                </Flex>
            </Flex>
            <Flex>
                {tab === 0 && <AccessoriesTab />}
                {tab === 1 && <LocationsTab />}
                {tab === 2 && <LlamasTab />}
            </Flex>
        </LLModal>
    )
}
