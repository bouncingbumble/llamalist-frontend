import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Box,
    Text,
    VStack,
    Flex,
    Button,
    Tooltip,
    Popover,
    Portal,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Progress,
} from '@chakra-ui/react'
// import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Displays() {
    return (
        <VStack align="flex-start">
            <Text fontSize="3xl">Displays</Text>
            <Box>
                <Text fontSize="sm">Menu</Text>
                <Menu>
                    {/* <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Actions
                    </MenuButton> */}
                    <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                </Menu>
                <Text fontSize="sm">Tooltip</Text>
                <Tooltip label="I am a tooltip">Hover me for tip</Tooltip>
                <Text fontSize="sm">Popover</Text>
                <Popover>
                    <PopoverTrigger>
                        <Button>Trigger</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverBody>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sit, inventore? Nisi voluptate
                                itaque cum nemo.
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                <Text fontSize="sm">Progress bar</Text>
                <Progress value={80} colorScheme="blue" borderRadius="16px" />
            </Box>
        </VStack>
    )
}
