import React from 'react'
import { Flex } from '@chakra-ui/react'
import './accessories.css'

export default function Sunglasses({ size }) {
    return (
        <Flex height={`${size / 2.4}px`} width={`${size}px`}>
            <div class="sunglasses">
                <div class="sunglasses-frame-left" />
                <div class="sunglasses-lens-left" />
                <div class="sunglasses-bridge" />
                <div class="sunglasses-bridge-lens" />
                <div class="sunglasses-frame-right" />
                <div class="sunglasses-lens-right" />
            </div>
        </Flex>
    )
}
