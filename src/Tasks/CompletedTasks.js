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
    IconButton,
    VStack,
    Container,
    Grid,
    GridItem,
    InputGroup,
    InputRightElement,
    Input,
} from '@chakra-ui/react'
import {
    useCompletedTasks,
    useSearchTasks,
    useTasks,
    useUpdateSearchTasks,
} from '../Hooks/TasksHooks'
import {
    format,
    eachMonthOfInterval,
    subMonths,
    getMonth,
    getYear,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
import TaskCard from './TaskCard/TaskCard'
import { SearchIcon, CloseIcon } from '../ChakraDesign/Icons'
import LLModal from '../SharedComponents/LLModal'
import { useLabels } from '../Hooks/LabelsHooks'
import { useNavigate } from 'react-router-dom'

const PIXELS_SUBTRACT = 80

export default function CompletedTasks() {
    //state
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)
    const searchTasks = useSearchTasks(searchQuery)
    //grab compeleted tasks
    const completedTasks = useCompletedTasks()
    //tasks and labels being used behind the scenes by react query for optimized updates
    const tasks = useTasks()
    const labels = useLabels()

    const navigate = useNavigate()
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

    const search = async () => {
        setIsSearchActive(true)
    }

    return completedTasks.isLoading ? (
        <>loading...</>
    ) : (
        <LLModal isOpen={true} onClose={() => navigate('/tasks')}>
            <Box maxW="100%" p="0px" flexDir="row" display="flex">
                <Flex
                    minWidth="300px"
                    direction="column"
                    alignItems="start"
                    pl="20px"
                    pr="20px"
                    justifyContent="space-between"
                >
                    <VStack
                        alignItems="flex-start"
                        mt="10px"
                        width="100%"
                        zIndex={1}
                        pr="24px"
                    >
                        <Text
                            pt="2px"
                            pl="8px"
                            mb="8px"
                            fontSize="2xl"
                            fontWeight="extrabold"
                            color="purpleSlideFaded.700"
                        >
                            completed
                        </Text>
                        <InputGroup width="100%" pl="8px">
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        search()
                                    }
                                }}
                                autoComplete="off"
                                focusBorderColor="purple.500"
                            />
                            <InputRightElement
                                children={<SearchIcon color="grey.400" />}
                                onClick={() => search()}
                                _hover={{ cursor: 'pointer' }}
                            />
                        </InputGroup>
                    </VStack>
                </Flex>
                <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(12, 1fr)"
                    width="100%"
                    padding="8px 16px"
                    paddingRight="0px"
                    overflow="hidden"
                    maxHeight="calc(100vh - 80px)"
                >
                    <GridItem colSpan={12}>
                        <Box width="100%" maxWidth="1200px">
                            <Tabs
                                isLazy
                                variant="soft-rounded"
                                colorScheme="purple"
                            >
                                <Flex
                                    flexDir="column"
                                    width="100%"
                                    mb="8px"
                                    mt="12px"
                                >
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
                                            {!isSearchActive ? (
                                                MONTHS.map((month, i) => (
                                                    <Tab>{month}</Tab>
                                                ))
                                            ) : (
                                                <Flex alignItems="center">
                                                    {isSearchActive && (
                                                        <IconButton
                                                            marginRight="16px"
                                                            isRound={true}
                                                            variant="solid"
                                                            colorScheme="gray"
                                                            height="40px"
                                                            onClick={() => {
                                                                setSearchQuery(
                                                                    ''
                                                                )
                                                                setIsSearchActive(
                                                                    false
                                                                )
                                                            }}
                                                            icon={<CloseIcon />}
                                                        ></IconButton>
                                                    )}
                                                    <Tab>Search Results</Tab>
                                                </Flex>
                                            )}
                                        </TabList>
                                    </Flex>
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    mt="22px"
                                    pl="20px"
                                    pr="20px"
                                >
                                    <TabPanels>
                                        {!isSearchActive ? (
                                            MONTHS.map((month, i) => (
                                                <TabPanel
                                                    overflowY="auto"
                                                    marginLeft="-8px"
                                                    paddingLeft="8px"
                                                    paddingRight="8px"
                                                    height={`calc(100vh - ${PIXELS_SUBTRACT}px)`}
                                                >
                                                    {completedTasks.data.map(
                                                        (t, i) =>
                                                            isInTheSameMonth(
                                                                month,
                                                                t.completedDate
                                                            ) && (
                                                                <TaskCard
                                                                    taskData={t}
                                                                    key={t._id}
                                                                />
                                                            )
                                                    )}
                                                </TabPanel>
                                            ))
                                        ) : searchTasks.data?.length === 0 ||
                                          searchTasks.error ? (
                                            <Text fontSize="large">
                                                No tasks found :(
                                            </Text>
                                        ) : (
                                            <Box
                                                overflowY="auto"
                                                marginLeft="-8px"
                                                paddingLeft="8px"
                                                paddingRight="8px"
                                                height={`calc(100vh - ${PIXELS_SUBTRACT}px)`}
                                            >
                                                {searchTasks.data?.map((t) => (
                                                    <TaskCard
                                                        taskData={t}
                                                        key={t._id}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </TabPanels>
                                </Flex>
                            </Tabs>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </LLModal>
    )
}
