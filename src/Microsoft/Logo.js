import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

export default function Logo({ taskCard }) {
    return (
        <Flex direction="column">
            <Flex>
                <img
                    src="/otter.png"
                    style={{
                        maxWidth: '100%',
                        height: '35px',
                        alignSelf: 'start',
                        marginTop: '0px',
                    }}
                />
                <Box
                    color="#061935"
                    fontSize="24px"
                    alignSelf="start"
                    fontWeight="700"
                    marginLeft="8px"
                >
                    llama list
                </Box>
            </Flex>
            <Box
                alignSelf={taskCard ? 'start' : 'center'}
                fontSize="14px"
                color="#a0aec0"
            >
                for Microsoft Teams, Outlook, and Office
            </Box>
        </Flex>
    )
}
