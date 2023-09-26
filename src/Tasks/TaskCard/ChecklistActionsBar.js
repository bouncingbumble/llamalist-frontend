import React from 'react'
import {
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Button,
    Tooltip,
} from '@chakra-ui/react'
import { TrashIcon, MeatballIcon, AddTaskIcon } from '../../ChakraDesign/Icons'

export default function ChecklistActionsBar({
    updateItem,
    item,
    items,
    setItems,
    handleChecklistToTask,
    deleteChecklistItem,
    user,
}) {
    const ForwardRefWrapper = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            {children}
        </span>
    ))

    const CustomTooltip = ({ label, children }) => (
        <Tooltip label={label}>
            <ForwardRefWrapper>{children}</ForwardRefWrapper>
        </Tooltip>
    )

    const MoreActionsButton = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Button variant="icon-button">{children}</Button>
        </span>
    ))

    return (
        <Box className={'hidden-child'} marginLeft="auto">
            <Flex alignItems="center">
                <Menu isLazy>
                    <CustomTooltip label="More actions">
                        <MenuButton as={MoreActionsButton}>
                            <MeatballIcon />
                        </MenuButton>
                    </CustomTooltip>
                    <MenuList>
                        <MenuItem
                            icon={<AddTaskIcon />}
                            onClick={() => handleChecklistToTask(item)}
                        >
                            Convert to Task
                        </MenuItem>
                        <MenuItem
                            icon={<TrashIcon />}
                            onClick={() => deleteChecklistItem(item._id)}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    )
}
