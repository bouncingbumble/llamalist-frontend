import React, { useState, useEffect, useContext } from 'react'
import {
    Box,
    Switch,
    FormControl,
    FormLabel,
    Text,
    useToast,
    Flex,
    Radio,
    RadioGroup,
} from '@chakra-ui/react'
import { setMinutes, setHours, setSeconds, getDate, getMonth } from 'date-fns'
import { covertTimeTo12forMenu, convertTime12to24 } from '../Util/timeUtils'
import { DatePickerWithDayOfWeek } from '../SharedComponents/DatePicker'
import { apiCall } from '../Util/api'
import OOModal from '../SharedComponents/OOModal'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import { CircleCheckIcon } from '../ChakraDesign/Icons'

import { UserContext } from '../Contexts/UserContext'
import { TasksContext } from '../Contexts/TasksContext'

export default function DueDateModal({
    due,
    submit,
    isOpen,
    onClose,
    urgency,
    taskId,
}) {
    const { user } = useContext(UserContext)
    const { updateTask } = useContext(TasksContext)

    const [date, setDate] = useState(
        due ? new Date(due) : new Date(new Date().setHours(10, 0, 0))
    )
    const [invalidTime, setInvalidTime] = useState(false)
    const [time, setTime] = useState(
        due ? covertTimeTo12forMenu(new Date(due)) : '10:00AM'
    )
    const toast = useToast()

    const handleSubmit = async () => {
        submit({ due: date })
    }

    const handleRemove = () => {
        submit({ due: null, urgency })
        onClose()
    }

    const handleSetTime = (time) => {
        const [hours, minutes] = convertTime12to24(time).split(':')
        let fullDate = setHours(new Date(date), hours)
        fullDate = setMinutes(fullDate, minutes)
        fullDate = setSeconds(fullDate, 0)
        setTime(time)
        setDate(fullDate)
    }

    const handleSetDate = (date) => {
        const [hours, minutes] = convertTime12to24(time).split(':')
        let fullDate = setHours(new Date(date), hours)
        fullDate = setMinutes(fullDate, minutes)
        fullDate = setSeconds(fullDate, 0)

        setDate(fullDate)
    }

    return (
        <OOModal
            title="Set a due date"
            onSubmit={handleSubmit}
            disableSubmit={invalidTime}
            secondaryButton={
                due && {
                    onClick: handleRemove,
                    text: 'remove due date',
                }
            }
            isOpen={isOpen}
            onClose={onClose}
        >
            <Flex>
                <DatePickerWithDayOfWeek
                    time={time}
                    setTime={handleSetTime}
                    invalidTime={invalidTime}
                    setInvalidTime={setInvalidTime}
                    date={new Date(date)}
                    setDate={handleSetDate}
                />
            </Flex>
        </OOModal>
    )
}
