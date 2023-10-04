import React, { useState } from 'react'
import {
    Box,
    Flex,
    Text,
    Tab,
    TabPanels,
    TabPanel,
    TabList,
    Tabs,
} from '@chakra-ui/react'
import { useCompletedTasks } from '../Hooks/TasksHooks'
import {
    format,
    eachDayOfInterval,
    eachMonthOfInterval,
    addMonths,
    subMonths,
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
    getYear,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
import TaskCard from './TaskCard/TaskCard'

export default function CompletedTasks() {
    //state
    //grab compeleted tasks
    const completedTasks = useCompletedTasks()
    //list them
    const months = eachMonthOfInterval({
        start: subMonths(new Date(), getMonth(new Date())),
        end: new Date(getYear(new Date()), getMonth(new Date()), 1),
    })

    const MONTHS = months
        .reverse()
        .map((month) => format(month, 'MMMM', { locale: enUS }))

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
        let date = new Date(t)

        const monthNumber = getMonth(new Date(date)) + 1
        return monthNameToValue[month] === monthNumber
    }

    //all edit avail
    //moves to today on checkbox click
    //list previous months of year
    //search completed tasks??
    return completedTasks.isLoading ? (
        <>loading...</>
    ) : (
        <Box width="100%" maxWidth="1200px">
            <Tabs isLazy variant="soft-rounded" colorScheme="purple">
                <Flex flexDir="column" width="100%" mb="8px" mt="12px">
                    <Flex
                        width="100%"
                        alignItems="flex-start"
                        justifyContent={'space-between'}
                        flexDirection={{
                            base: 'column',
                            sm: 'row',
                        }}
                        paddingRight="16px"
                    >
                        <TabList>
                            {MONTHS.map((month, i) => (
                                <Tab>{month}</Tab>
                            ))}
                        </TabList>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" mt="22px" pl="20px" pr="20px">
                    <TabPanels p="2rem">
                        {MONTHS.map((month, i) => (
                            <TabPanel>
                                {completedTasks.data.map(
                                    (t, i) =>
                                        isInTheSameMonth(
                                            month,
                                            t.completedDate
                                        ) && (
                                            <TaskCard
                                                taskData={t}
                                                key={t.key}
                                            />
                                        )
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Flex>
            </Tabs>
        </Box>
    )
}
