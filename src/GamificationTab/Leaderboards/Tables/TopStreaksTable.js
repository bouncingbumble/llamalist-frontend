import React from 'react'
import {
    Flex,
    IconButton,
    Tooltip,
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

export default function TopStreaksTable({ data }) {
    return (
        <>
            <Thead>
                <Tr>
                    <Th>user</Th>
                    <Th isNumeric>score</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.map((d, i) => (
                    <Tr key={i}>
                        <Td>{d.name}</Td>
                        <Td isNumeric>{d.highestStreakCount}</Td>
                    </Tr>
                ))}
            </Tbody>
        </>
    )
}
