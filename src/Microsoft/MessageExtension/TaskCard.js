import LabelModal from '../../Tasks/LabelModal'
import { TasksContext } from '../../Contexts/TasksContext'
import { useContext, useState } from 'react'
import { apiCall, setTokenHeader } from '../../Util/api'
import { VStack, Input, Button, Text, Textarea } from '@chakra-ui/react'

export default function TaskCard({ link, userId, message, setUserId }) {
    // context
    const { tasks, setTasks } = useContext(TasksContext)

    // state
    const [notes, setNotes] = useState(link)
    const [taskLabels, setTaskLabels] = useState([])
    const [description, setDescription] = useState(message)
    const [labelModalOpen, setLabelModalOpen] = useState(false)

    const signOut = async () => {
        const response = await apiCall(`POST`, `/msteams/signout/${userId}`)
        if (response.message === 'success') {
            setUserId(null)
            setTokenHeader(null)
            localStorage.removeItem('msllamaListJwtToken')
        }
    }

    return (
        <VStack p="16px">
            <Button colorScheme="purple" onClick={signOut} alignSelf="end">
                Sign Out
            </Button>
            <Input
                mt="8px"
                size="lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Textarea
                mt="8px"
                size="lg"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={() => setLabelModalOpen(true)}>Labels</Button>
            <VStack>
                {taskLabels.map((label) => (
                    <Text>{label.name}</Text>
                ))}
            </VStack>
            {labelModalOpen && (
                <LabelModal
                    cards={tasks}
                    setCards={setTasks}
                    isOpen={labelModalOpen}
                    selectedLabels={taskLabels}
                    setSelectedLabels={setTaskLabels}
                    onClose={() => setLabelModalOpen(false)}
                    updateCardLabels={() => {}}
                />
            )}
        </VStack>
    )
}
