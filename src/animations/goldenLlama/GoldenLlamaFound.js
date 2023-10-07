import React from 'react'
import GoldenLlama from './GoldenLlama'
import { Flex } from '@chakra-ui/react'

export default function GoldenLlamaFound() {
    const rays = new Array(8).fill(0)
    return (
        <Flex id="golden-llama-container">
            <Flex className="grow-sun">
                <Flex className="spinning-sun" justify="center">
                    {rays.map((ray, index) => (
                        <>
                            {index % 2 === 0 && (
                                <Flex
                                    className="sun-ray"
                                    borderTopColor="#fad102d9"
                                    borderBottomColor="#fad102d9"
                                    transform={`rotate(${index * 22.5}deg)`}
                                    key={index}
                                />
                            )}
                        </>
                    ))}
                </Flex>
            </Flex>
            <Flex className="golden-llama-found">
                <GoldenLlama disabled />
            </Flex>
        </Flex>
    )
}
