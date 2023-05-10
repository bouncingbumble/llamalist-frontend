import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { Text, Input, Box, Button } from '@chakra-ui/react'
import { apiCall } from './api'

export default function LabelReplace() {
    const [value, setValue] = React.useState('')
    const [value1, setValue1] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const handleChange1 = (event) => setValue1(event.target.value)
    const { user } = useContext(UserContext)

    const handleSubmit = async () => {
        try {
            const res = await apiCall(
                'POST',
                `/users/${user._id}/labels/swap`,
                {
                    replace: value,
                    replacer: value1,
                }
            )
            alert(res)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Box maxWidth="480px">
            <Text mb="8px">Label replacer</Text>
            <Input
                value={value}
                onChange={handleChange}
                placeholder="Label to replace"
                size="md"
            />
            <Input
                value={value1}
                onChange={handleChange1}
                placeholder="Label desired"
                size="md"
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
                submit
            </Button>
        </Box>
    )
}
