import React from 'react'
import { VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Upcoming, { isTodayOrEarlier } from './Upcoming'
import TaskCard from './TaskCard'
import IntroMessageCard from './IntroMessageCard'
import { useTasks } from '../Hooks/TasksHooks'
import { useUser } from '../Hooks/UserHooks'
import { isToday } from 'date-fns'

const INTRO_CARD_MESSAGE = {
    all: {
        color: 'purpleFaded.500',
        title: 'All',
        lines: [
            'All your tasks come here.',
            'Work tasks, personal tasks, deadline tasks, fun, boring, silly, all of them!',
        ],
    },
    today: {
        color: 'green.500',
        title: 'Today',
        lines: [
            'Tasks scheduled or marked with a deadline for today, overdue tasks, and calendar events occurring today (if linked), appear here.',
            'Come here to know exactly what you need to get done each day.',
        ],
    },
    someday: {
        color: 'blue.500',
        title: 'Someday',
        lines: [
            'Tasks that have not been scheduled or marked with a deadline come here.',
        ],
    },
    upcoming: {
        color: 'yellow.500',
        title: 'Upcoming',
        lines: [
            'Tasks that have been scheduled or marked with a deadline in the future show up here.',
        ],
    },
    inbox: {
        color: 'aqua.500',
        title: 'Inbox',
        lines: [
            'All tasks sent in from external sources (Teams, text, email) come here.',
            'Add a label or a due date to move them into your list.',
        ],
    },
}

const AllTasks = ({ tasks }) =>
    tasks.map((t) => (
        <TaskCard taskData={t} key={t.isNewTask ? '9999' : t._id} />
    ))

const Today = ({ tasks }) =>
    tasks.map(
        (t) =>
            isTodayOrEarlier(t) && (
                <TaskCard taskData={t} key={t.isNewTask ? '9999' : t._id} />
            )
    )
const Someday = ({ tasks }) =>
    tasks.map(
        (t, i) =>
            !t.due &&
            !t.when && (
                <TaskCard taskData={t} key={t.isNewTask ? '9999' : t._id} />
            )
    )

const Inbox = ({ tasks }) =>
    tasks.map(
        (t, i) =>
            !isTodayOrEarlier(t.due) &&
            tasks?.labels?.filter((l) => l.name).includes('inbox') && (
                <TaskCard taskData={t} key={t.isNewTask ? '9999' : t._id} />
            )
    )

export default function TasksList() {
    const user = useUser()

    const { section, selectedLabel } = useParams()
    let taskData = useTasks()
    let tasks =
        selectedLabel === 'All Labels'
            ? taskData.data
            : taskData.data?.filter((t) =>
                  t.labels.map((l) => l.name).includes(selectedLabel)
              )

    const PIXELS_SUBTRACT = !user.data.hideSectionWelcomeMessages[section]
        ? 202 + 72
        : 72
    return (
        taskData.isSuccess && (
            <>
                {!user.data.hideSectionWelcomeMessages[section] && (
                    <IntroMessageCard
                        color={INTRO_CARD_MESSAGE[section].color}
                        title={INTRO_CARD_MESSAGE[section].title}
                        lines={INTRO_CARD_MESSAGE[section].lines}
                    />
                )}
                <VStack
                    id="tasks-list"
                    width="100%"
                    height={`calc(100vh - ${PIXELS_SUBTRACT}px)`}
                    overflowY="scroll"
                    marginLeft="-8px"
                    paddingLeft="8px"
                    paddingRight="8px"
                >
                    {section === 'inbox' && <Inbox tasks={tasks} />}
                    {section === 'all' && <AllTasks tasks={tasks} />}
                    {section === 'today' && <Today tasks={tasks} />}
                    {section === 'upcoming' && <Upcoming tasks={tasks} />}
                    {section === 'someday' && <Someday tasks={tasks} />}
                </VStack>
            </>
        )
    )
}
