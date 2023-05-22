import React, { useContext } from 'react'
import { TasksContext } from '../Contexts/TasksContext'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import TaskCard from './TaskCard/TaskCard'
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
import { LabelsContext } from '../Contexts/LabelsContext'

const today = new Date()
const start = new Date(today)
const end = endOfWeek(today, { weekStartsOn: 1 })

const months = eachMonthOfInterval({
    start: addMonths(new Date(), 1),
    end: addMonths(new Date(), 5),
})

const MONTHS = months.map((month) => format(month, 'MMMM', { locale: enUS }))

const daysOfWeek = eachDayOfInterval({
    start: start,
    end,
})

const weekdays = daysOfWeek.map((day) => format(day, 'EEEE', { locale: enUS }))

const isOnDayOfWeek = (dayOfWeek, date) => {
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

const isNextWeek = (date) => {
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

const isThisWeek = (date) => {
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

const isInTheSameMonth = (month, date) => {
    const monthNumber = getMonth(new Date(date)) + 1
    return monthNameToValue[month] === monthNumber
}

export default function Upcoming() {
    const { tasks, setTasks } = useContext(TasksContext)
    const { selectedLabels } = useContext(LabelsContext)

    const DatedSectionHeader = ({ name }) => (
        <Box
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Flex alignItems="center" marginRight="16px">
                <Text
                    color="purple.500"
                    fontSize="md"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    marginLeft="8px"
                >
                    {name}
                </Text>
            </Flex>
            <hr
                style={{
                    height: 1,
                    backgroundColor: '#E5ECF6',
                    border: '1px solid #E5ECF6',
                    width: '100%',
                    borderRadius: 16,
                }}
            />
        </Box>
    )

    const hasSelectedLabel = (task) => {
        let hasLabel = false
        const taskLabelNames = task.labels.map((t) => t.name)
        const selectedLabelNames = selectedLabels.map((l) => l.name)

        taskLabelNames.map((name) => {
            if (selectedLabelNames.includes(name)) {
                hasLabel = true
            }
        })

        if (selectedLabelNames[0] === 'All Labels') {
            hasLabel = true
        }

        return hasLabel
    }

    return (
        <>
            <Box width="100%">
                <DatedSectionHeader name="Tomorrow" />
                {tasks.map(
                    (t, i) =>
                        t.due &&
                        isTomorrow(new Date(t.due)) &&
                        hasSelectedLabel(t) && (
                            <TaskCard
                                task={t}
                                index={i}
                                key={t._id}
                                cards={tasks}
                                disableDrag={true}
                                setCards={setTasks}
                            />
                        )
                )}
            </Box>
            <Box width="100%">
                {weekdays.map((dayOfWeek, i) => (
                    <Box key={i}>
                        <DatedSectionHeader name={dayOfWeek} />
                        {tasks.map(
                            (t, i) =>
                                t.due &&
                                isThisWeek(t.due) &&
                                isOnDayOfWeek(dayOfWeek, t.due) &&
                                hasSelectedLabel(t) && (
                                    <TaskCard
                                        task={t}
                                        index={i}
                                        key={t._id}
                                        cards={tasks}
                                        disableDrag={true}
                                        setCards={setTasks}
                                    />
                                )
                        )}
                    </Box>
                ))}
            </Box>
            <Box width="100%">
                <DatedSectionHeader name="Next week" />
                {tasks.map(
                    (t, i) =>
                        t.due &&
                        isNextWeek(t.due) &&
                        hasSelectedLabel(t) && (
                            <TaskCard
                                task={t}
                                index={i}
                                key={t._id}
                                cards={tasks}
                                disableDrag={true}
                                setCards={setTasks}
                            />
                        )
                )}
            </Box>
            <Box width="100%">
                {MONTHS.map((month, i) => (
                    <Box key={i}>
                        <DatedSectionHeader name={month} />
                        {tasks.map(
                            (t, i) =>
                                t.due &&
                                !isThisWeek(t.due) &&
                                !isNextWeek(t.due) &&
                                isInTheSameMonth(month, t.due) &&
                                hasSelectedLabel(t) && (
                                    <TaskCard
                                        task={t}
                                        index={i}
                                        key={t._id}
                                        cards={tasks}
                                        disableDrag={true}
                                        setCards={setTasks}
                                    />
                                )
                        )}
                    </Box>
                ))}
            </Box>
        </>
    )
}

export const isTodayOrEarlier = (date) => {
    if (isToday(new Date(new Date(date)))) {
        return true
    }
    if (new Date(new Date(date)) < new Date()) {
        return true
    }
    return false
}
