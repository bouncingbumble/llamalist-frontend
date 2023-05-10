import React, { useState, useEffect, useContext } from 'react'
import { apiCall } from '../Util/api'
import { SearchIcon } from '../ChakraDesign/Icons'
import { UserContext } from '../Contexts/UserContext'
import { TasksContext } from '../Contexts/TasksContext'
import { PaidPopUpContext } from '../Contexts/PaidPopupContext'
import { Input, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react'

export default function SearchInput({ setIsSearching }) {
    // state
    const [searchQuery, setSearchQuery] = useState('')

    // context
    const { user } = useContext(UserContext)
    const { setPaidPopup } = useContext(PaidPopUpContext)
    const { isSearchActive, setIsSearchActive, setSearchResults } =
        useContext(TasksContext)

    const reason =
        'Oops! It looks like you hit a limit on your free plan 😢. You can continue using your free account. 🎉 Upgrade to search all your tasks!'

    useEffect(() => {
        if (!isSearchActive) {
            setSearchQuery('')
        }
    }, [isSearchActive])

    useEffect(() => {
        if (searchQuery === '') {
            setIsSearchActive(false)
        }
    }, [searchQuery])

    const searchTasks = async (searchQuery) => {
        if (user.stripeProductId === '') {
            setPaidPopup({ show: true, reason, hideButtons: false })
        } else if (
            process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.split(' ').includes(
                user.stripeProductId
            )
        ) {
            setIsSearching(true)
            try {
                const tasks = await apiCall(
                    'get',
                    `/users/${user._id}/tasks/search?q=${searchQuery}`
                )

                setSearchResults(tasks)
                setIsSearchActive(true)
            } catch (error) {
                alert(error)
            }
            setIsSearching(false)
        } else if (
            process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.split(
                ' '
            ).includes(user.stripeProductId)
        ) {
            console.log('hello')
            setIsSearching(true)
            try {
                const tasks = await apiCall(
                    'get',
                    `/users/${user._id}/tasks/search?q=${searchQuery}`
                )

                setSearchResults(tasks)
                setIsSearchActive(true)
            } catch (error) {
                alert(error)
            }
            setIsSearching(false)
        } else {
        }
    }

    return (
        <>
            <InputGroup width="160px" marginLeft={{ base: '12px', lg: '30px' }}>
                <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            e.stopPropagation()
                            searchTasks(searchQuery)
                        }
                    }}
                    autoComplete="off"
                />{' '}
                <Tooltip label="press enter to search">
                    <InputRightElement
                        children={<SearchIcon color="grey.400" />}
                        onClick={() => searchTasks(searchQuery)}
                    />
                </Tooltip>
            </InputGroup>
        </>
    )
}
