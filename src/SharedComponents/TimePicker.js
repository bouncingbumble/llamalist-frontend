import React, { useState } from 'react'
import { Box, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { times, validateTime } from '../Util/timeUtils'
import theme from '../ChakraDesign/theme'
import { ClockIcon } from '../ChakraDesign/Icons'

export default function TimePicker({
    time,
    setTime,
    invalidTime,
    setInvalidTime,
}) {
    const [scopedTime, setScopedTime] = useState(time)

    const updateTime = (updatedTime) => {
        setScopedTime(updatedTime)

        const validatedTime = validateTime(updatedTime)

        if (validatedTime) {
            setTime(validatedTime)
            setInvalidTime(false)
        } else {
            setInvalidTime(true)
        }
    }

    return (
        <Box cursor="pointer">
            {invalidTime && (
                <span
                    style={{
                        position: 'absolute',
                        top: -24,
                        color: theme.colors.red[500],
                    }}
                >
                    *Invalid time
                </span>
            )}
        </Box>
    )
}
