import React from 'react'
import Navbar from './Navbar/Navbar'
import {
    Container,
    Flex,
    Box,
    Grid,
    GridItem,
    useBreakpointValue,
} from '@chakra-ui/react'

export default function MainLayout({
    mobileMenu,
    searchInput,
    left,
    main,
    setIsSetupGuideOpen,
}) {
    return (
        <div>
            <Container maxW="container.xl">
                <Navbar
                    mobileMenu={mobileMenu}
                    searchInput={searchInput}
                    setIsSetupGuideOpen={setIsSetupGuideOpen}
                />
                <Flex>
                    <Flex
                        width={{
                            sm: '256px',
                            lg: '356px',
                        }}
                        display={{ sm: 'none', md: 'flex' }}
                    >
                        {left}
                    </Flex>
                    <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(12, 1fr)"
                        width="100%"
                    >
                        <GridItem colSpan={12}>
                            <Flex flexDir="column" width="100%">
                                <Box pl={{ base: 'none', md: '16px' }}>
                                    {main}
                                </Box>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
            </Container>
        </div>
    )
}
