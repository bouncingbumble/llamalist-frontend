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

export default function MostGoldenLlamasFound({ data }) {
    return (
        <>
            <Thead>
                <Tr>
                    <Th>user</Th>
                    <Th isNumeric>score</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.map((d) => (
                    <Tr>
                        <Td>{d.name}</Td>
                        <Td isNumeric>{d.goldenLlamasFound.length}</Td>
                    </Tr>
                ))}
            </Tbody>
        </>
    )
}
