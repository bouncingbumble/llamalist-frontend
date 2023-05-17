import React from 'react'
import { Box, Text, Button, Flex } from '@chakra-ui/react'
import theme from './theme'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
export default function Overview() {
    return (
        <Flex flexDirection="column" p="16px">
            <Text fontSize="xl">Colors</Text>
            <Flex>
                white
                <Box
                    height="48px"
                    width="48px"
                    backgroundColor="white"
                    border="1px solid black"
                    borderRadius="50%"
                ></Box>
                black
                <Box
                    height="48px"
                    width="48px"
                    backgroundColor="black"
                    borderRadius="50%"
                ></Box>
                <Flex>
                    Purple
                    <Box>
                        <Box
                            height="48px"
                            width="48px"
                            backgroundColor="purple.500"
                            borderRadius="50%"
                        ></Box>
                        <Box mt="16px">
                            {Object.entries(theme.colors.purple).map(
                                (color) => (
                                    <Box
                                        height="48px"
                                        width="48px"
                                        backgroundColor={color}
                                        borderRadius="50%"
                                    ></Box>
                                )
                            )}
                        </Box>
                    </Box>
                </Flex>
                <Flex>
                    blue
                    <Box>
                        <Box
                            height="48px"
                            width="48px"
                            backgroundColor="blue.500"
                            borderRadius="50%"
                        ></Box>
                        <Box mt="16px">
                            {Object.entries(theme.colors.blue).map((color) => (
                                <Box
                                    height="48px"
                                    width="48px"
                                    backgroundColor={color}
                                    borderRadius="50%"
                                ></Box>
                            ))}
                        </Box>
                    </Box>
                </Flex>
                <Flex>
                    Red
                    <Box>
                        <Box
                            height="48px"
                            width="48px"
                            backgroundColor="red.500"
                            borderRadius="50%"
                        ></Box>
                        <Box mt="16px">
                            {Object.entries(theme.colors.red).map((color) => (
                                <Box
                                    height="48px"
                                    width="48px"
                                    backgroundColor={color}
                                    borderRadius="50%"
                                ></Box>
                            ))}
                        </Box>
                    </Box>
                </Flex>
                {/* <Box>
                {Object.entries(theme.colors.blue).map((color) => (
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor={color}
                        borderRadius="50%"
                    ></Box>
                ))}
            </Box> */}
            </Flex>
            <Text fontSize="xl">Typography</Text>
            <Flex flexDirection="column">
                {SIZES.map((size) => (
                    <Text fontSize={size}>Ubuntu - {size}</Text>
                ))}
            </Flex>
            <Text fontSize="xl">Buttons</Text>
            <Flex flexDirection="column">
                <Box>
                    {SIZES.map((size) => (
                        <Button size={size} colorScheme="purple" mr="8px">
                            Purple - {size}
                        </Button>
                    ))}
                </Box>
                <Box mt="16px">
                    {SIZES.map((size) => (
                        <Button size={size} mr="8px" colorScheme="lightpurple">
                            light purp - {size}
                        </Button>
                    ))}
                </Box>
                <Box mt="16px">
                    {SIZES.map((size) => (
                        <Button
                            size={size}
                            mr="8px"
                            colorScheme="purple"
                            variant="ghost"
                        >
                            ghost purp - {size}
                        </Button>
                    ))}
                </Box>
                <Box mt="16px">
                    {SIZES.map((size) => (
                        <Button
                            size={size}
                            mr="8px"
                            colorScheme="darkgrey"
                            variant="ghost"
                        >
                            ghost grey - {size}
                        </Button>
                    ))}
                </Box>
                <Box mt="16px">
                    {SIZES.map((size) => (
                        <Button size={size} mr="8px" colorScheme="darkgrey">
                            dark grey - {size}
                        </Button>
                    ))}
                </Box>
                <Box mt="16px">
                    {SIZES.map((size) => (
                        <Button size={size} mr="8px" colorScheme="lightgrey">
                            grey - {size}
                        </Button>
                    ))}
                </Box>
            </Flex>
            <Text fontSize="xl">Opinions</Text>
            <Flex flexDirection="column">
                <Text>
                    Collapsed task cards are 1 line for content/lable/checklist
                    etc.
                </Text>
                <Text>
                    Task sections are All, Today (date based and label),
                    Upcoming (date based), Anytime (undated), Inbox (where all
                    incoming tasks go){' '}
                </Text>
                <Text>Each section can be filtered by a label</Text>
                <Text>
                    Views should be highly focused on one area (opened task is
                    only task on screen, creating task is full screen)
                </Text>
                <Text>
                    High level organization can be done through list view of all
                    tasks
                </Text>
                <Text>Buttons have text and icon</Text>
                <Text>No 'hidden' functionality</Text>
                <Text>There is a character limit to a task name</Text>
                <Text>Checklist items are separate schema</Text>
                <Text>Notes is a wysiwyg tiptap box</Text>
                <Text>
                    Design is mobile first to enforce full screen utilization
                    and singular focus
                </Text>
                <Text>Every action gives delight</Text>
                <Text>
                    Calender events are brought into the Upcoming section
                </Text>
                <Text>
                    Recurring events should be handled by the user's calendar
                    and imported
                </Text>
                <Text>
                    Priority is established via drag and drop, not a label
                </Text>
                <Text>
                    You can schedule time to work on something which puts an
                    event on your calendar
                </Text>
                <Text>The entire experience is gamified</Text>
            </Flex>
        </Flex>
    )
}
