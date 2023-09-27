import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import {
    format,
    eachDayOfInterval,
    eachMonthOfInterval,
    addMonths,
    isToday,
    isTomorrow,
    getMonth,
    isMonday,
    isTuesday,
    isWednesday,
    isThursday,
    isFriday,
    isSaturday,
    isSunday,
    startOfWeek,
    endOfWeek,
    addWeeks,
    isWithinInterval,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
import TaskCard from './TaskCard/TaskCard'

const today = new Date()
const start = new Date(today)
const end = new Date(endOfWeek(today, { weekStartsOn: 0 }))
start.setDate(start.getDate() + 2)
const months = eachMonthOfInterval({
    start: addMonths(new Date(), 1),
    end: addMonths(new Date(), 5),
})

const MONTHS = months.map((month) => format(month, 'MMMM', { locale: enUS }))

const daysOfWeek = eachDayOfInterval({
    start: new Date(),
    end: new Date(),
})

const weekdays = daysOfWeek.map((day) => format(day, 'EEEE', { locale: enUS }))

const isDateTomorrow = (t) => {
    let date
    if (t.when && t.due) {
        date = new Date(t.when) < new Date(t.due) ? t.when : t.due
    } else if (t.when) {
        date = t.when
    } else if (t.due) {
        date = t.due
    } else {
        return false
    }

    return isTomorrow(new Date(date))
}

const isOnDayOfWeek = (dayOfWeek, t) => {
    let date
    if (t.when && t.due) {
        date = new Date(t.when) < new Date(t.due) ? t.when : t.due
    } else if (t.when) {
        date = t.when
    } else if (t.due) {
        date = t.due
    } else {
        return false
    }

    switch (dayOfWeek) {
        case 'Monday':
            return isMonday(new Date(date))
        case 'Tuesday':
            return isTuesday(new Date(date))
        case 'Wednesday':
            return isWednesday(new Date(date))
        case 'Thursday':
            return isThursday(new Date(date))
        case 'Friday':
            return isFriday(new Date(date))
        case 'Saturday':
            return isSaturday(new Date(date))
        case 'Sunday':
            return isSunday(new Date(date))
        default:
            break
    }
}

const isNextWeek = (t) => {
    let date
    if (t.when && t.due) {
        date = new Date(t.when) < new Date(t.due) ? t.when : t.due
    } else if (t.when) {
        date = t.when
    } else if (t.due) {
        date = t.due
    } else {
        return false
    }

    const nextWeekStart = startOfWeek(addWeeks(new Date(), 1), {
        weekStartsOn: 1,
    }) // get the start of next week
    const nextWeekEnd = endOfWeek(addWeeks(new Date(nextWeekStart), 1), {
        weekStartsOn: 1,
    }) // get the end of next week

    return isWithinInterval(new Date(date), {
        start: nextWeekStart,
        end: nextWeekEnd,
    })
}

const isThisWeek = (t) => {
    let date
    if (t.when && t.due) {
        date = new Date(t.when) < new Date(t.due) ? t.when : t.due
    } else if (t.when) {
        date = t.when
    } else if (t.due) {
        date = t.due
    } else {
        return false
    }

    const thisWeekStart = startOfWeek(new Date(), {
        weekStartsOn: 1,
    }) // get the start of next week
    const thisWeekEnd = endOfWeek(new Date(thisWeekStart), {
        weekStartsOn: 1,
    }) // get the end of next week

    return isWithinInterval(new Date(date), {
        start: thisWeekStart,
        end: thisWeekEnd,
    })
}

const monthNameToValue = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

const isInTheSameMonth = (month, t) => {
    let date
    if (t.when && t.due) {
        date = new Date(t.when) < new Date(t.due) ? t.when : t.due
    } else if (t.when) {
        date = t.when
    } else if (t.due) {
        date = t.due
    } else {
        return false
    }
    const monthNumber = getMonth(new Date(date)) + 1
    return monthNameToValue[month] === monthNumber
}

export default function Upcoming({ tasks }) {
    const DatedSectionHeader = ({ name }) => (
        <Box
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
            mb="8px"
        >
            <Flex alignItems="center" marginRight="16px">
                <Text
                    color="blue.500"
                    fontSize="md"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    marginLeft="8px"
                >
                    {name}
                </Text>
            </Flex>
        </Box>
    )

    return (
        <Box width="100%">
            <Box width="100%" minHeight="80px" mb="8px" overflow="visible">
                <DatedSectionHeader name="Tomorrow" />
                {tasks.map(
                    (t, i) =>
                        isDateTomorrow(t) && (
                            <Flex pr={i === 0 && '292px'} w="100%" key={t.key}>
                                <TaskCard taskData={t} />{' '}
                            </Flex>
                        )
                )}
            </Box>
            <Box width="100%">
                {weekdays.map((dayOfWeek, i) => (
                    <Box key={i} minHeight="80px" overflow="visible" mb="8px">
                        <DatedSectionHeader name={dayOfWeek} />
                        {tasks.map(
                            (t, i) =>
                                isThisWeek(t) &&
                                isOnDayOfWeek(dayOfWeek, t) && (
                                    <TaskCard taskData={t} key={t.key} />
                                )
                        )}
                    </Box>
                ))}
            </Box>
            <Box width="100%" minHeight="80px" overflow="visible" mb="8px">
                <DatedSectionHeader name="Next week" />
                {tasks.map(
                    (t, i) =>
                        isNextWeek(t) && <TaskCard taskData={t} key={t.key} />
                )}
            </Box>
            <Box width="100%">
                {MONTHS.map((month, i) => (
                    <Box key={i} minHeight="80px" overflow="visible" mb="8px">
                        <DatedSectionHeader name={month} />
                        {tasks.map(
                            (t, i) =>
                                !isThisWeek(t) &&
                                !isNextWeek(t) &&
                                isInTheSameMonth(month, t) && (
                                    <TaskCard taskData={t} key={t.key} />
                                )
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export const isTodayOrEarlier = (t) => {
    let date
    if (t.when && t.due) {
        date = new Date(t.when) < new Date(t.due) ? t.when : t.due
    } else if (t.when) {
        date = t.when
    } else if (t.due) {
        date = t.due
    } else {
        return false
    }
    if (isToday(new Date(new Date(date)))) {
        return true
    }
    if (new Date(new Date(date)) < new Date()) {
        return true
    }
    return false
}
