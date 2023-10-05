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
    useSearchCompletedTasks,
    useTasks,
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

export default function CompletedTasks() {
    //state
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)
    const searchResults = useSearchCompletedTasks()
    //grab compeleted tasks
    const completedTasks = useCompletedTasks()
    const tasks = useTasks()
    const labels = useLabels()
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

    const searchTasks = async () => {
        searchResults.mutate(searchQuery)
        setIsSearchActive(true)
    }

    return completedTasks.isLoading ? (
        <>loading...</>
    ) : (
        <LLModal isOpen={true} onClose={() => {}}>
            <Container maxW="100%" p="0px" flexDir="row" display="flex">
                <Flex
                    minWidth="300px"
                    direction="column"
                    height="100vh"
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
                                        searchTasks()
                                    }
                                }}
                                autoComplete="off"
                                focusBorderColor="purple.500"
                            />
                            <InputRightElement
                                children={<SearchIcon color="grey.400" />}
                                onClick={() => searchTasks()}
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
                                                            onClick={() =>
                                                                setIsSearchActive(
                                                                    false
                                                                )
                                                            }
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
                                    <TabPanels p="2rem">
                                        {!isSearchActive ? (
                                            MONTHS.map((month, i) => (
                                                <TabPanel>
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
                                        ) : searchResults.data?.length === 0 ||
                                          searchResults.error ? (
                                            <Text fontSize="large">
                                                No tasks found :(
                                            </Text>
                                        ) : (
                                            searchResults.data?.map((t) => (
                                                <TaskCard
                                                    taskData={t}
                                                    key={t._id}
                                                />
                                            ))
                                        )}
                                    </TabPanels>
                                </Flex>
                            </Tabs>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </LLModal>
    )
}
