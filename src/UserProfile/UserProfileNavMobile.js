import React from 'react'
import { VStack, Menu, MenuList } from '@chakra-ui/react'
import MobileNavButton from '../SharedComponents/MobileNavButton'
import MobileNavMenuItem from '../SharedComponents/MobileNavMenuItem'

export default function UserProfileNavMobile({
    sections,
    selectedSection,
    setSelectedSection,
}) {
    // create buttons for mobile navbar
    const buttons = sections.map((section) => ({
        left: section.left,
        text: section.middle,
        right: '',
    }))

    return (
        <VStack justifyItems="center" w="100%">
            <Menu isLazy>
                <MobileNavButton
                    left={buttons[selectedSection].left}
                    text={buttons[selectedSection].text}
                />
                <MenuList>
                    {buttons.map((b, i) => (
                        <MobileNavMenuItem
                            selected={i === selectedSection}
                            handleClick={() => setSelectedSection(i)}
                            left={b.left}
                            text={b.text}
                            key={i}
                        />
                    ))}
                </MenuList>
            </Menu>
        </VStack>
    )
}
