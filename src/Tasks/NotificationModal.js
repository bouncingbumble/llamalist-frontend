import React, { useState } from 'react'
import {
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    Flex,
    Radio,
    Text,
} from '@chakra-ui/react'
import { setMinutes, setHours, format } from 'date-fns'
import { DatePickerWithDayOfWeek } from '../SharedComponents/DatePicker'
import { convertTime12to24 } from '../Util/timeUtils'
import { TrashIcon } from '../ChakraDesign/Icons'
import OOModal from '../SharedComponents/OOModal'

export default function NotificationModal({
    submit,
    usersNotificationType,
    notifications,
    handleDeleteNotification,
    isOpen,
    onClose,
}) {
    const [date, setDate] = useState(new Date())
    const [invalidTime, setInvalidTime] = useState(false)
    const [time, setTime] = useState('10:00AM')
    const [type, setType] = useState(
        usersNotificationType ? usersNotificationType : 'text'
    )

    const handleSubmit = () => {
        const [hours, minutes] = convertTime12to24(time).split(':')
        let timeToSend = setHours(new Date(date), hours)
        timeToSend = setMinutes(timeToSend, minutes)

        submit({ timeToSend, type })
    }

    return (
        <OOModal
            title="Set a notification"
            onSubmit={handleSubmit}
            disableSubmit={invalidTime}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Box>
                <DatePickerWithDayOfWeek
                    time={time}
                    setTime={setTime}
                    invalidTime={invalidTime}
                    setInvalidTime={setInvalidTime}
                    date={new Date(date)}
                    setDate={setDate}
                />
                <RadioGroup value={type} onChange={setType} marginTop="16px">
                    <FormLabel fontSize="sm">Type</FormLabel>
                    <Flex direction="column" align="start">
                        <Radio size="sm" mt="8px" mb="8px" value="desktop">
                            Desktop
                        </Radio>
                        <Radio size="sm" mt="8px" mb="8px" value="text">
                            Text
                        </Radio>
                        <Radio size="sm" mt="8px" mb="8px" value="email">
                            Email
                        </Radio>
                    </Flex>
                </RadioGroup>
                {notifications.filter((n) => !n.sent).length > 0 && (
                    <FormControl id="scheduled" marginTop="16px">
                        <FormLabel fontSize="sm">Scheduled</FormLabel>
                        {notifications.map(
                            (n) =>
                                !n.sent && (
                                    <Flex
                                        alignContent="center"
                                        justifyContent="space-between"
                                    >
                                        <Text>
                                            {' '}
                                            {format(
                                                new Date(n.timeToSend),
                                                'MMM d, h:mma'
                                            )}{' '}
                                        </Text>
                                        <TrashIcon
                                            onClick={() =>
                                                handleDeleteNotification(n._id)
                                            }
                                            color="red.500"
                                            _hover={{ cursor: 'pointer' }}
                                        />
                                    </Flex>
                                )
                        )}
                    </FormControl>
                )}
            </Box>
        </OOModal>
    )
}
