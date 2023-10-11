import React from 'react'
import { Flex } from '@chakra-ui/react'

export default function BowTie({ size }) {
    //
    return (
        <>
            <Flex
                align="center"
                justify="center"
                width={`${size}px`}
                height={`${size / 2}px`}
                borderRadius={`${size / 5}px`}
                borderLeft={`${size / 2}px solid`}
                borderRight={`${size / 2}px solid`}
                borderColor="pink.600"
                borderTop={`${size / 4}px solid transparent`}
                borderBottom={`${size / 4}px solid transparent`}
            >
                <Flex
                    bg="pink.400"
                    position="absolute"
                    width={`${size / 3.8}px`}
                    height={`${size / 3.8}px`}
                    borderRadius={`${size / 7.6}px`}
                />
            </Flex>
        </>
    )
}
