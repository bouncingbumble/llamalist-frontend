import React, { useState } from 'react'
import { Box, Text, VStack, Flex, Input } from '@chakra-ui/react'
import DatePicker from '../SharedComponents/DatePicker'
export default function Inputs() {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <VStack align="flex-start">
            <Text fontSize="3xl">Inputs</Text>
            <VStack alignItems="flex-start">
                <Text fontSize="sm">Text field</Text>
                <Input placeholder="Unstyled input" variant="unstyled" />
                <Input placeholder="Outline input" variant="outline" />
                <Text fontSize="sm">Calender</Text>
                <DatePicker date={new Date()} />
                <Text fontSize="sm">TODO: Time picker</Text>
            </VStack>
        </VStack>
    )
}
