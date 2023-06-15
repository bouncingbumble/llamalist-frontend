import { apiCall } from '../Util/api'
import { useState } from 'react'
import { useUser } from './UserHooks'
import { useTasks } from './TasksHooks'
import { useQueryClient } from '@tanstack/react-query'

export default (initialLabels) => {
    // context variables
    const user = useUser()
    const tasks = useTasks()
    const queryClient = useQueryClient()
    // state variables
    const [labels, setLabels] = useState(initialLabels)
    const [selectedLabels, setSelectedLabels] = useState([])
    const [unselectedLabels, setUnselectedLabels] = useState([])

    // functions
    const getUsersLabels = async () => {
        const ls = await apiCall('GET', `/users/${user._id}/labels`)

        setLabels(ls.map((l) => ({ ...l, filterSelected: false })))

        setSelectedLabels([{ name: 'All Labels', color: 'purple.500' }])
        setUnselectedLabels([...ls])
    }

    const createLabel = async (
        labelName,
        labelColor,
        taskLabels,
        setTaskLabels,
        updateCardLabels
    ) => {
        // create new label
        const newLabel = await apiCall(`POST`, `/users/${user._id}/labels`, {
            name: labelName,
            color: labelColor,
        })

        // update task state
        const newTaskLabels = [...taskLabels]
        newTaskLabels.push({ ...newLabel })
        console.log(newTaskLabels)
        setTaskLabels(newTaskLabels)

        // copy current labels array
        const newUserLabels = [...labels]

        // add the new label and alphabetize
        let labelNames = newUserLabels.map((label) => label.name.toLowerCase())
        labelNames.push(labelName.toLowerCase())
        labelNames.sort()

        // grab the index of the new label
        const index = labelNames.indexOf(labelName)

        // add it to the copied array and update state
        newUserLabels.splice(index, 0, newLabel)
        // setLabels(newUserLabels)

        updateCardLabels(newTaskLabels)
        // addUnselectedLabel(newLabel)
    }

    const updateLabel = async (
        cards,
        setCards,
        setOpen,
        labelToEdit,
        setLabelToEdit,
        setLabelExists,
        taskLabels,
        setTaskLabels,
        nonTaskLabels,
        setNonTaskLabels
    ) => {
        try {
            let labelNameChanged = false
            const labelsToCheck = [...labels].filter((l) => {
                if (l._id === labelToEdit._id) {
                    if (l.name !== labelToEdit.name) {
                        labelNameChanged = true
                    }
                    return false
                }
                return true
            })

            if (!labelsToCheck.map((l) => l.name).includes(labelToEdit.name)) {
                const updates = { color: labelToEdit.color }
                labelNameChanged && (updates.name = labelToEdit.name)

                setLabels(
                    [...labels].map((l) => {
                        if (l._id === labelToEdit._id) {
                            return labelToEdit
                        } else {
                            return l
                        }
                    })
                )

                setTaskLabels(
                    [...taskLabels].map((l) => {
                        if (l._id === labelToEdit._id) {
                            return labelToEdit
                        } else {
                            return l
                        }
                    })
                )

                setNonTaskLabels(
                    [...nonTaskLabels].map((l) => {
                        if (l._id === labelToEdit._id) {
                            return labelToEdit
                        } else {
                            return l
                        }
                    })
                )
                updateAllCardLabels('update', cards, setCards, labelToEdit)

                await apiCall(
                    `PUT`,
                    `/users/${user._id}/labels/${labelToEdit._id}`,
                    updates
                )

                setOpen(false)
                setLabelToEdit(null)
                setLabelExists(false)
            } else {
                setLabelExists(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteLabel = (
        label,
        cards,
        setCards,
        setOpen,
        setLabelToEdit,
        setLabelExists,
        taskLabels,
        setTaskLabels,
        nonTaskLabels,
        setNonTaskLabels
    ) => {
        setLabels([...labels].filter((l) => l._id !== label._id))

        setNonTaskLabels([...nonTaskLabels].filter((l) => l._id !== label._id))

        setTaskLabels([...taskLabels].filter((l) => l._id !== label._id))

        updateAllCardLabels('delete', cards, setCards, label)

        setOpen(false)
        setLabelToEdit(null)
        setLabelExists(false)

        apiCall(`DELETE`, `/users/${user._id}/labels/${label._id}`)
    }

    const selectLabel = (
        label,
        taskLabels,
        setTaskLabels,
        nonTaskLabels,
        setNonTaskLabels,
        updateCardLabels
    ) => {
        // mutate arrays
        const newTaskLabels = [...taskLabels]
        newTaskLabels.push({ ...label })
        const newNonTaskLabels = nonTaskLabels.filter(
            (l) => l._id !== label._id
        )

        // update state
        setTaskLabels(newTaskLabels)
        setNonTaskLabels(newNonTaskLabels)

        // update db
        updateCardLabels(newTaskLabels)
    }

    const unselectLabel = (
        label,
        taskLabels,
        setTaskLabels,
        setNonTaskLabels,
        updateCardLabels
    ) => {
        // mutate arrays
        const newTaskLabels = taskLabels.filter((l) => l._id !== label._id)
        const taskLabelIds = newTaskLabels.map((l) => l._id)

        labels.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )

        const newNonTaskLabels = labels.filter(
            (l) => !taskLabelIds.includes(l._id)
        )

        // update state
        setTaskLabels(newTaskLabels)
        setNonTaskLabels(newNonTaskLabels)

        // update db
        updateCardLabels(newTaskLabels)
    }

    const selectFilterLabel = (label) => {
        let newSelected = []
        let newUnselected = []
        if (label.name === 'All Labels') {
            newSelected.push({ ...label })
            newUnselected = [...labels]
        } else if (selectedLabels[0].name === 'All Labels') {
            newSelected = [...selectedLabels].filter(
                (l) => l.name !== 'All Labels'
            )
            newSelected.push({ ...label })
            newUnselected = [...unselectedLabels].filter(
                (l) => l._id !== label._id
            )
            newUnselected.unshift({ name: 'All Labels', color: 'purple.500' })
        } else {
            // mutate arrays
            newSelected = [...selectedLabels]

            newSelected.push({ ...label })
            newUnselected = unselectedLabels.filter((l) => l._id !== label._id)
        }

        // update state
        setSelectedLabels(newSelected)
        setUnselectedLabels(newUnselected)
    }

    const unselectFilterLabel = (label) => {
        // mutate arrays
        let newSelected = selectedLabels.filter((l) => l._id !== label._id)
        let selectedLabelIds = newSelected.map((l) => l._id)
        let newUnselected = labels.filter(
            (l) => !selectedLabelIds.includes(l._id)
        )
        newUnselected.unshift({ name: 'All Labels', color: 'purple.500' })
        if (newSelected.length === 0) {
            newSelected.push({ name: 'All Labels', color: 'purple.500' })
            newUnselected = newUnselected.filter((l) => l.name !== 'All Labels')
        }

        // update state
        setSelectedLabels(newSelected)
        setUnselectedLabels(newUnselected)
    }

    const updateAllCardLabels = (method, cards, setCards, updatedLabel) => {
        let newTasks = [...tasks]
        let newCards = cards && [...cards]

        if (method === 'delete') {
            const newSelectedLabels = [...selectedLabels].filter(
                (label) => label._id !== updatedLabel._id
            )
            setSelectedLabels(newSelectedLabels)

            const newUnselectedLabels = [...unselectedLabels].filter(
                (label) => label._id !== updatedLabel._id
            )
            setUnselectedLabels(newUnselectedLabels)

            // do the same for recurrence, templates, or completed sections
            newTasks = newTasks.map((task) => {
                const newTask = { ...task }
                const updatedLabels = task.labels.filter(
                    (label) => label._id !== updatedLabel._id
                )
                newTask.labels = updatedLabels
                return newTask
            })

            queryClient.setQueryData(['tasks'], newTasks)

            if (cards && setCards) {
                // update state for each task that had that label
                newCards = newCards.map((card) => {
                    const newCard = { ...card }
                    const updatedLabels = card.labels.filter(
                        (label) => label._id !== updatedLabel._id
                    )
                    newCard.labels = updatedLabels
                    return newCard
                })
                setCards(newCards)
            }
        } else if (method === 'update') {
            const newSelectedLabels = [...selectedLabels].map((label) => {
                if (label._id === updatedLabel._id) {
                    return updatedLabel
                } else {
                    return label
                }
            })
            setSelectedLabels(newSelectedLabels)

            const newUnselectedLabels = [...unselectedLabels].map((label) => {
                if (label._id === updatedLabel._id) {
                    return updatedLabel
                } else {
                    return label
                }
            })
            setUnselectedLabels(newUnselectedLabels)

            // update state for each task that had that label
            newTasks = newTasks.map((task) => {
                const newTask = { ...task }
                const updatedLabels = task.labels.map((label) => {
                    if (label._id === updatedLabel._id) {
                        return updatedLabel
                    } else {
                        return label
                    }
                })
                newTask.labels = updatedLabels
                return newTask
            })
            queryClient.setQueryData(['tasks'], newTasks)

            if (cards && setCards) {
                // do the same for recurrence, templates, or completed sections
                newCards = newCards.map((card) => {
                    const newCard = { ...card }
                    const updatedLabels = card.labels.map((label) => {
                        if (label._id === updatedLabel._id) {
                            return updatedLabel
                        } else {
                            return label
                        }
                    })
                    newCard.labels = updatedLabels
                    return newCard
                })
                setCards(newCards)
            }
        } else {
            console.log('unrecognized method to update label')
        }
    }

    const addUnselectedLabel = (newLabel) => {
        // make a copy of the current array
        const newUnselectedLabels = [...unselectedLabels]

        // get the label names, add the new label, and alphabetize
        let labelNames = newUnselectedLabels.map((label) => label.name)
        labelNames.push(newLabel.name)
        labelNames.sort()

        // grab the index of the new label
        const index = labelNames.indexOf(newLabel.name)

        // add it to the copied array and update state
        newUnselectedLabels.splice(index, 0, newLabel)
        setUnselectedLabels(newUnselectedLabels)
    }

    const initNonTaskLabels = (taskLabels, setNonTaskLabels) => {
        const taskLabelIds = taskLabels.map((label) => label._id)
        setNonTaskLabels(
            labels.filter((label) => !taskLabelIds.includes(label._id))
        )
    }

    return {
        labels,
        setLabels,
        createLabel,
        updateLabel,
        deleteLabel,
        selectLabel,
        unselectLabel,
        getUsersLabels,
        selectedLabels,
        setSelectedLabels,
        selectFilterLabel,
        unselectFilterLabel,
        unselectedLabels,
        initNonTaskLabels,
        setUnselectedLabels,
    }
}
