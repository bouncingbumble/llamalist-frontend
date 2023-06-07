import { useState, useContext, useEffect, useRef } from 'react'
import { apiCall } from '../Util/api'
import { UserContext } from '../Contexts/UserContext'
import bell from '../sounds/bell.mp3'
import ding from '../sounds/ding.mp3'
import pop from '../sounds/pop.mp3'
import waterDrop from '../sounds/waterDrop.mp3'
import { CircleCheckIcon } from '../ChakraDesign/Icons'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import { useToast } from '@chakra-ui/react'
import { PaidPopUpContext } from '../Contexts/PaidPopupContext'

export default (initialTasks) => {
    const [tasks, setTasks] = useState(initialTasks)
    const [numCompletedTasks, setNumCompletedTasks] = useState(0)
    const { user, setUser } = useContext(UserContext)
    const { setPaidPopup } = useContext(PaidPopUpContext)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const toast = useToast()
    const tasksRef = useRef([...tasks])

    // update refs to reflect current state
    useEffect(() => {
        tasksRef.current = tasks
    }, [tasks])

    return {
        tasks,
        setTasks,
        numCompletedTasks,
        setNumCompletedTasks,
        isSearchActive,
        setIsSearchActive,
        searchResults,
        setSearchResults,
        tasksRef,
        createTask: (taskData) => {
            apiCall('POST', `/users/${user._id}/tasks`, {
                ...taskData,
            })

            return
        },
        //updates task and updates section state to have updated task
        updateTask: (id, taskData) => {
            let tasksCopy = [...tasksRef.current]

            try {
                //update task
                apiCall('PUT', `/users/${user._id}/tasks/${id}`, taskData)

                let newTasks = tasksCopy.map((task) => {
                    if (task.id === id) {
                        return { ...task, ...taskData, isNew: false }
                    } else {
                        return task
                    }
                })

                if (isSearchActive) {
                    // const updatedSearchResults = [...searchResults].map(
                    //     (task) => {
                    //         if (task._id === taskId) {
                    //             return newTask
                    //         } else {
                    //             return task
                    //         }
                    //     }
                    // )
                    // setSearchResults(updatedSearchResults)
                }
            } catch (error) {
                console.log(error)
                alert(
                    'Unable to update task. Error message: ' +
                        JSON.stringify(error.data.error.message)
                )
            }
            return
        },
        deleteTask: async (taskId) => {
            await apiCall(`DELETE`, `/users/${user._id}/tasks/${taskId}`)

            setTasks(tasks.filter((task) => task._id !== taskId))
        },
        //marks task as complete, moves out of current section and into completed section
        completeTask: async (taskId) => {
            switch (user.completeSound) {
                case 'bell':
                    await new Audio(bell).play()
                    break

                case 'ding':
                    await new Audio(ding).play()
                    break

                case 'pop':
                    await new Audio(pop).play()
                    break

                case 'waterDrop':
                    await new Audio(waterDrop).play()
                    break

                default:
                    break
            }

            try {
                //update task
                const updatedTask = await apiCall(
                    'PUT',
                    `/users/${user._id}/tasks/${taskId}`,
                    {
                        isCompleted: true,
                        completionDate: Date.now(),
                        urgency: 4,
                    }
                )

                setTasks([...tasks].filter((t) => t._id !== taskId))

                setNumCompletedTasks(numCompletedTasks + 1)

                toast({
                    duration: 3000,
                    render: () => (
                        <ToastyBoi
                            message={'success'}
                            icon={<CircleCheckIcon fill="white" />}
                            backgroundColor="purple.500"
                        ></ToastyBoi>
                    ),
                })

                return true
            } catch (error) {
                if (error.data.error.message === 'Subscription error') {
                    setPaidPopup({
                        show: true,
                        reason: 'Oops! It looks like you hit a limit on your free plan 😢. You can continue using your free account. 🎉 Upgrade to complete more than 10 items.',
                    })
                } else {
                    alert(JSON.stringify(error))
                }
                return error
            }
        },
        //changes the urgency of the task and puts it in new section, updates old section
        changeTasksUrgency: async (taskId, oldUrgency, newUrgency) => {
            if (oldUrgency != newUrgency) {
                try {
                    //update task
                    const updatedTask = await apiCall(
                        'PUT',
                        `/users/${user._id}/tasks/${taskId}`,
                        {
                            urgency: newUrgency,
                            isCompleted: newUrgency === 4 ? true : false,
                            due: null,
                        }
                    )

                    let newTasks = []
                    //if not moving out of completed section we filter bc task is already in array
                    if (oldUrgency !== 4) {
                        newTasks = tasks.map((task) => {
                            if (task._id !== updatedTask._id) {
                                return task
                            } else {
                                return updatedTask
                            }
                        })
                    } else {
                        //if moving out of completed section we push bc task is not already in array
                        newTasks = [...tasks]
                        newTasks.push(updatedTask)
                    }

                    setTasks(newTasks)
                    if (isSearchActive) {
                        const updatedSearchResults = [...searchResults].map(
                            (task) => {
                                if (task._id === taskId) {
                                    return updatedTask
                                } else {
                                    return task
                                }
                            }
                        )
                        setSearchResults(updatedSearchResults)
                    }
                } catch (error) {
                    if (error.data.error.message === 'Subscription error') {
                        setPaidPopup({
                            show: true,
                            reason: 'Oops! It looks like you hit a limit on your free plan 😢. You can continue using your free account. 🎉 Upgrade to keep more than 25 tasks in the same urgency.',
                            hideButtons: false,
                        })
                    } else {
                        alert(JSON.stringify(error))
                    }
                    return error
                }
            }
        },
    }
}
