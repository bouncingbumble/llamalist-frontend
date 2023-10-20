import React from 'react'
import Llama from '../animations/java-llama-react/Llama'
import { Flex } from '@chakra-ui/react'

export default function LoadingLlama() {
    const size = window.innerHeight * 0.2
    return (
        <Flex
            height="100%"
            width="100%"
            align="center"
            justify="center"
            bg="purpleFaded.100"
        >
            <Flex className="loading-llama" direction="column" align="center">
                <Llama
                    id={69}
                    noAccessories
                    minHeight={size}
                    progress={[0, 5]}
                />
            </Flex>
        </Flex>
    )
}
