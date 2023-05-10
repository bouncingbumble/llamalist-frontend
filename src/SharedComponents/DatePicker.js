import React from 'react'
import { format } from 'date-fns'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import TimePicker from '../SharedComponents/TimePicker'

import { CalendarIcon } from '../ChakraDesign/Icons'
import {
    InputGroup,
    InputRightElement,
    InputLeftElement,
} from '@chakra-ui/react'

export default function DatePicker({ date, setDate, isDisabled }) {
    return (
        <>
            <SingleDatepicker
                name="date"
                date={date}
                onDateChange={setDate}
                propsConfigs={{
                    dateNavBtnProps: {
                        colorScheme: 'blue',
                        color: 'black',
                    },
                    dayOfMonthBtnProps: {
                        colorScheme: 'blue',
                        color: 'black',
                        selectedBg: 'blue.200',
                        _hover: {
                            bg: 'purple.500',
                            color: 'white',
                        },
                        padding: 0,
                    },
                    inputProps: {
                        size: 'md',
                        value: format(date, 'MM-dd-yyyy'),
                        onChange: setDate,
                        className: 'hover',
                        isDisabled,
                        onKeyDown: (e) => {
                            e.preventDefault()
                            return false
                        },
                        width: '130px',
                    },
                }}
                className="hover"
                placeholder="hello"
            />
        </>
    )
}

export function DatePickerWithDayOfWeek({
    date,
    setDate,
    isDisabled,
    time,
    setTime,
    invalidTime,
    setInvalidTime,
}) {
    return (
        <InputGroup>
            <InputLeftElement w="32px" pl="8px">
                <CalendarIcon color="grey.500" />
            </InputLeftElement>
            <SingleDatepicker
                name="date"
                date={date}
                onDateChange={setDate}
                propsConfigs={{
                    dateNavBtnProps: {
                        colorScheme: 'blue',
                        color: 'black',
                    },
                    dayOfMonthBtnProps: {
                        colorScheme: 'blue',
                        color: 'black',
                        selectedBg: 'blue.200',
                        _hover: {
                            bg: 'purple.500',
                            color: 'white',
                        },
                        padding: 0,
                    },
                    inputProps: {
                        size: 'md',
                        value: format(date, 'EEEE, MM-dd-yyyy'),
                        paddingLeft: '40px',
                        onChange: setDate,
                        className: 'hover',
                        isDisabled,
                        onKeyDown: (e) => {
                            e.preventDefault()
                            return false
                        },
                    },
                }}
                className="hover"
                placeholder="hello"
            />
            <InputRightElement width="120px">
                <TimePicker
                    time={time}
                    setTime={setTime}
                    invalidTime={invalidTime}
                    setInvalidTime={setInvalidTime}
                />
            </InputRightElement>
        </InputGroup>
    )
}
