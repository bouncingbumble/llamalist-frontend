import React, { useState } from 'react'
import {
    Text,
    Box,
    Flex,
    RadioGroup,
    Radio,
    Button,
    Checkbox,
} from '@chakra-ui/react'
import bell from '../../sounds/bell.mp3'
import ding from '../../sounds/ding.mp3'
import pop from '../../sounds/pop.mp3'
import waterDrop from '../../sounds/waterDrop.mp3'

export default function Customization({ user, submit }) {
    // profile information
    const [completeSound, setCompleteSound] = useState(user.completeSound)
    const [autoSort, setAutoSort] = useState(user.autoSort)

    // custom sounds demo
    const sounds = ['off', 'bell', 'ding', 'pop', 'waterDrop']
    const playSound = async (completeSound) => {
        switch (completeSound) {
            case 'bell':
                await new Audio(bell).play()
                break

            case 'ding':
                await new Audio(ding).play()
                break

            case 'pop':
                await new Audio(pop).play()
                break

            case 'waterDrop':
                await new Audio(waterDrop).play()
                break

            default:
                break
        }
    }

    const submitForm = async () => {
        await submit({
            completeSound,
            autoSort,
        })
    }

    return (
        <>
            <Text variant="profile-title">Completion sound</Text>
            <Box pl="16px" w="100%">
                <RadioGroup value={completeSound} onChange={setCompleteSound}>
                    <Flex direction="column" align="start">
                        {sounds.map((sound) => (
                            <Radio
                                size="lg"
                                mt="8px"
                                mb="8px"
                                value={sound}
                                onClick={() => playSound(sound)}
                            >
                                {sound === 'waterDrop' ? 'water drop' : sound}
                            </Radio>
                        ))}
                    </Flex>
                </RadioGroup>
            </Box>
            <Text variant="profile-title">Checklist settings</Text>
            <Flex justify="space-between" w="100%" pl="16px" mb="8px">
                <Text>Auto sort completed items</Text>
                <Checkbox
                    value={autoSort}
                    isChecked={autoSort}
                    onChange={(e) => setAutoSort(e.target.checked)}
                    size="lg"
                />
            </Flex>
            {/* <Text variant="profile-title">Appearance</Text>
            <ColorModeSwitcher /> */}
            <Button variant="profile-save" onClick={() => submitForm()}>
                Save changes
            </Button>
        </>
    )
}
