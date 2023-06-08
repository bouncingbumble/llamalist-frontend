import React, { useState, useEffect, useContext } from 'react'
import { DatePickerWithDayOfWeek } from '../SharedComponents/DatePicker'
import { UserContext } from '../Contexts/UserContext'
import { TasksContext } from '../Contexts/TasksContext'

export default function DueDateModal({ due, onSubmit }) {
    const { user } = useContext(UserContext)
    const { updateTask } = useContext(TasksContext)

    const [date, setDate] = useState(due ? new Date(due) : new Date())

    const handleSubmit = async () => {
        onSubmit({ due: date })
    }

    const handleRemove = () => {
        onSubmit({ due: null })
    }

    const handleSetDate = (date) => {
        setDate(date)
    }

    return (
        <DatePickerWithDayOfWeek
            date={new Date(date)}
            setDate={handleSetDate}
        />
    )
}
