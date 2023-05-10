import React from 'react'
import {
    Container,
    Grid,
    GridItem,
    useBreakpointValue,
    Box,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'

export default function SetupGuideLayout({ header, main }) {
    return (
        <div>
            <ModalContent>
                <Container maxW="container.xl">
                    <ModalBody>
                        <Box>{header}</Box>
                        {main}
                    </ModalBody>
                </Container>
            </ModalContent>
        </div>
    )
}
