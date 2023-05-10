import React from 'react'
import { VStack } from '@chakra-ui/react'
import LeftNavButtonUP from '../SharedComponents/LeftNavButtonUP'
import ClearList from './ClearList'

export default function UserProfileNavLeft({
    sections,
    selectedSection,
    setSelectedSection,
}) {
    return (
        <VStack justifyItems="center" w="100%">
            {sections.map((section, index) => (
                <LeftNavButtonUP
                    left={section.left}
                    text={section.middle}
                    right={''}
                    selected={selectedSection === index}
                    handleClick={() => setSelectedSection(index)}
                />
            ))}
            <ClearList />
        </VStack>
    )
}
