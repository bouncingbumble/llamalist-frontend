import React, { memo, useEffect, useState, useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { Text, Image } from '@chakra-ui/react'
import { apiCall } from '../Util/api'
import { startOfDay } from 'date-fns'

function EmptyTaskBoi({ urgency }) {
    const today = new Date()
    const { user } = useContext(UserContext)
    const [prompt, setPrompt] = useState('')
    const [numCompletedToday, setNumCompletedToday] = useState(null)

    const getTasksCompletedToday = async () => {
        const completedToday = await apiCall(
            `GET`,
            `/users/${user._id}/tasks/completed/range?startDate=${startOfDay(
                today
            )}&endDate=${today}`
        )
        setNumCompletedToday(completedToday.length)
    }

    useEffect(() => {
        getTasksCompletedToday()
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '32px',
                cursor: 'default',
            }}
        >
            <Image src={prompt.pic} maxHeight="240px" />
            <Text fontSize="md" color="grey.900" fontWeight="light" mt="16px">
                {prompt.text}
            </Text>
            {numCompletedToday >= 5 && (
                <Text fontSize="16px" color="black" mt="16px">
                    Today you completed{' '}
                    <span style={{ fontWeight: 'bold' }}>
                        {numCompletedToday}
                    </span>{' '}
                    tasks!
                </Text>
            )}
        </div>
    )
}

export default memo(EmptyTaskBoi)
