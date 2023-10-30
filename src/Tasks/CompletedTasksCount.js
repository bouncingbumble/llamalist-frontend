import React from 'react'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function CompletedTasksCount({ numCompletedTasks }) {
    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate('/completed')}
            _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
            {numCompletedTasks}
        </Box>
    )
}
