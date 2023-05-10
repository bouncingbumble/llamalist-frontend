import React from 'react'
import Navbar from '../Navbar/Navbar'
import {
    Container,
    Flex,
    Box,
    Grid,
    GridItem,
    useBreakpointValue,
} from '@chakra-ui/react'

export default function TasksLayout({
    mobileMenu,
    searchInput,
    left,
    main,
    isZenMode,
    setIsZenMode,
    isTemplateModal,
    setIsTemplatesOpen,
    setIsSetupGuideOpen,
}) {
    return (
        <div>
            <Container maxW="container.xl">
                {!isTemplateModal && (
                    <Navbar
                        mobileMenu={mobileMenu}
                        searchInput={searchInput}
                        setIsTemplatesOpen={setIsTemplatesOpen}
                        setIsSetupGuideOpen={setIsSetupGuideOpen}
                    />
                )}
                <Flex>
                    <Flex
                        width={{
                            sm: '56px',
                            lg: isZenMode ? '56px' : '356px',
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
