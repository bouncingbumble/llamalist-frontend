import React, { useState, useEffect } from 'react'
import { apiCall } from '../Util/api'
import {
    Flex,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar,
    Text,
    Input,
    FormLabel,
    Checkbox,
    Radio,
    RadioGroup,
} from '@chakra-ui/react'
import { CarrotIcon } from '../ChakraDesign/Icons'
import { isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInput from '../UserProfile/UserForms/PhoneInputs/PhoneInputComponent'
import OOModal from '../SharedComponents/OOModal'
import bell from '../sounds/bell.mp3'
import ding from '../sounds/ding.mp3'
import pop from '../sounds/pop.mp3'
import waterDrop from '../sounds/waterDrop.mp3'
import theme from '../ChakraDesign/theme'
import { useToast } from '@chakra-ui/react'
import { CircleCheckIcon } from '../ChakraDesign/Icons'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import { getUTCHours } from '../Util/timeUtils'

export default function EditUser({ admin, user, setUser, getUsers }) {
    const toaster = useToast()
    const sounds = ['bell', 'ding', 'pop', 'waterDrop']
    const subscriptions = [
        {
            type: 'free',
            id: '',
        },
        {
            type: 'personal',
            id: process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.split(' ')[0],
        },
        {
            type: 'professional',
            id: process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.split(
                ' '
            )[0],
        },
    ]

    const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false)

    // profile info
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [secondaryEmail, setSecondaryEmail] = useState(user.secondaryEmail)
    const [phone, setPhone] = useState(user.phone)
    const [validPhone, setValidPhone] = useState(isValidPhoneNumber(user.phone))
    const [slackId, setSlackId] = useState(user.slackUserId)
    const [mainUse, setMainUse] = useState(user.use)
    const [mainBenefit, setMainBenefit] = useState(user.benefit)
    const [autoSort, setAutoSort] = useState(user.autoSort)
    const [BOD, setBOD] = useState(user.notificationSettings.beginningOfDayHour)
    const [EOD, setEOD] = useState(user.notificationSettings.endOfDayHour)
    const [completeSound, setCompleteSound] = useState(user.completeSound)
    const [defaultNotiType, setDefaultNotiType] = useState(
        user.notificationSettings.type
    )
    const [walkthroughComplete, setWalkthroughComplete] = useState(
        user.isWalkthroughComplete
    )
    const [slackIntegrated, setSlackIntegrated] = useState(
        user.isSlackIntegrated
    )
    const [chromeIntegrated, setChromeIntegrated] = useState(
        user.isChromeExtIntegrated
    )
    const [weeklyReview, setWeeklyReview] = useState(
        user.notificationSettings.weeklyReviewHour
    )
    const [weeklyPreview, setWeeklyPreview] = useState(
        user.notificationSettings.weeklyPreviewHour
    )
    const [subscription, setSubscription] = useState(
        user.stripeProductId === ''
            ? subscriptions[0]
            : process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.includes(
                  user.stripeProductId
              )
            ? subscriptions[2]
            : process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.includes(
                  user.stripeProductId
              )
            ? subscriptions[1]
            : subscriptions[0]
    )

    const playSound = async (completeSound) => {
        switch (completeSound) {
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
    }

    const handleWeeklyReviewClick = (isChecked) => {
        if (isChecked) {
            setWeeklyReview(getUTCHours(12))
        } else {
            setWeeklyReview(null)
        }
    }

    const handleWeeklyPreviewClick = (isChecked) => {
        if (isChecked) {
            setWeeklyPreview(getUTCHours(6))
        } else {
            setWeeklyPreview(null)
        }
    }

    const handleBODClick = (isChecked) => {
        if (isChecked) {
            setBOD(getUTCHours(7))
        } else {
            setBOD(null)
        }
    }

    const handleEODClick = (isChecked) => {
        if (isChecked) {
            setEOD(getUTCHours(4))
        } else {
            setEOD(null)
        }
    }

    const submit = async () => {
        const newValues = {
            name,
            email,
            secondaryEmail,
            phone,
            autoSort,
            completeSound,
            slackUserId: slackId,
            use: mainUse,
            benefit: mainBenefit,
            isSlackIntegrated: slackIntegrated,
            isChromeExtIntegrated: chromeIntegrated,
            isWalkthroughComplete: walkthroughComplete,
            stripeProductId: subscription.id,
            notificationSettings: {
                weeklyReviewHour: weeklyReview,
                weeklyPreviewHour: weeklyPreview,
                beginningOfDayHour: BOD,
                endOfDayHour: EOD,
                type: defaultNotiType,
            },
        }
        if (user) {
            try {
                await apiCall(
                    'PUT',
                    `/admin/${admin._id}/users/${user._id}`,
                    newValues
                )
                toaster({
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    render: () => (
                        <ToastyBoi
                            message={'Settings successfully saved!'}
                            icon={<CircleCheckIcon fill="white" />}
                            backgroundColor="purple.500"
                        />
                    ),
                })
                getUsers()
                setUser(null)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (phone && isValidPhoneNumber(phone)) {
            setValidPhone(true)
        } else {
            setValidPhone(false)
        }
    }, [phone])

    return (
        <>
            <OOModal
                title={
                    <Flex direction="column" align="center">
                        <Avatar
                            name={user.name}
                            bg="purple.500"
                            fontWeight="normal"
                            color="white"
                        />
                        <Text fontSize="28px">{user.name}</Text>
                    </Flex>
                }
                width="960px"
                isOpen={user}
                onClose={() => setUser(null)}
                onSubmit={() => submit()}
                disableSubmit={!validPhone}
                secondaryButton={{
                    text: 'Delete User',
                    onClick: () => setDeleteUserModalOpen(true),
                    style: {
                        backgroundColor: theme.colors.red[500],
                        color: theme.colors.white,
                    },
                }}
            >
                <Flex justify="space-between">
                    <Flex direction="column" w="368px" p="8px">
                        <Text fontSize="16px" fontWeight="bold">
                            User Info
                        </Text>
                        <Flex direction="column" pl="16px">
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Full name *
                            </FormLabel>
                            <InfoInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Change user's name..."
                            />
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Email *
                            </FormLabel>
                            <InfoInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Change user's email..."
                            />
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Secondary Email
                            </FormLabel>
                            <InfoInput
                                value={secondaryEmail}
                                onChange={(e) =>
                                    setSecondaryEmail(e.target.value)
                                }
                                placeholder="Change user's second email..."
                            />
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Phone
                            </FormLabel>
                            <PhoneInput
                                value={phone}
                                onChange={(e) => setPhone(e)}
                                placeholder="Change user's phone..."
                            />
                            <PhoneErrorMessage validPhone={validPhone} />
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Slack User ID
                            </FormLabel>
                            <InfoInput
                                value={slackId}
                                onChange={(e) => setSlackId(e.target.value)}
                                placeholder="Change user slack ID..."
                            />
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Main Use
                            </FormLabel>
                            <InfoInput
                                value={mainUse}
                                onChange={(e) => setMainUse(e.target.value)}
                                placeholder="Change user main use case..."
                            />
                            <FormLabel
                                mt="8px"
                                mb="0px"
                                fontSize="14px"
                                color="#8f9bb3"
                            >
                                Main Benefit
                            </FormLabel>
                            <InfoInput
                                value={mainBenefit}
                                onChange={(e) => setMainBenefit(e.target.value)}
                                placeholder="Change user main benefit..."
                            />
                        </Flex>
                    </Flex>
                    <Flex direction="column" w="368px" p="8px">
                        <Text fontSize="16px" fontWeight="bold" mb="8px">
                            Emails
                        </Text>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Weekly Review</Text>
                            <Checkbox
                                value={weeklyReview}
                                isChecked={weeklyReview}
                                onChange={(e) =>
                                    handleWeeklyReviewClick(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Weekly Preview</Text>
                            <Checkbox
                                value={weeklyPreview}
                                isChecked={weeklyPreview}
                                onChange={(e) =>
                                    handleWeeklyPreviewClick(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Daily Summary (morning)</Text>
                            <Checkbox
                                value={BOD}
                                isChecked={BOD}
                                onChange={(e) =>
                                    handleBODClick(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="16px"
                        >
                            <Text>Daily Summary (evening)</Text>
                            <Checkbox
                                value={EOD}
                                isChecked={EOD}
                                onChange={(e) =>
                                    handleEODClick(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Text
                            fontSize="16px"
                            fontWeight="bold"
                            mt="16px"
                            mb="8px"
                        >
                            Integrations
                        </Text>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Slack Integrated</Text>
                            <Checkbox
                                value={slackIntegrated}
                                isChecked={slackIntegrated}
                                onChange={(e) =>
                                    setSlackIntegrated(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Chrome Integrated</Text>
                            <Checkbox
                                value={chromeIntegrated}
                                isChecked={chromeIntegrated}
                                onChange={(e) =>
                                    setChromeIntegrated(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Text
                            fontSize="16px"
                            fontWeight="bold"
                            mt="16px"
                            mb="8px"
                        >
                            Additional Info
                        </Text>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Walkthrough Complete</Text>
                            <Checkbox
                                value={walkthroughComplete}
                                isChecked={walkthroughComplete}
                                onChange={(e) =>
                                    setWalkthroughComplete(e.target.checked)
                                }
                                size="lg"
                            />
                        </Flex>
                        <Text
                            fontSize="16px"
                            fontWeight="bold"
                            mt="16px"
                            mb="8px"
                        >
                            Preferences
                        </Text>
                        <Flex
                            justify="space-between"
                            w="100%"
                            pl="16px"
                            mb="8px"
                        >
                            <Text>Auto sort checklist items</Text>
                            <Checkbox
                                value={autoSort}
                                isChecked={autoSort}
                                onChange={(e) => setAutoSort(e.target.checked)}
                                size="lg"
                            />
                        </Flex>
                    </Flex>
                    <Flex direction="column" w="368px" p="8px">
                        <Text fontSize="16px" fontWeight="bold" mb="8px">
                            Default notification type
                        </Text>
                        <Box pl="16px" w="100%">
                            <RadioGroup
                                value={defaultNotiType}
                                onChange={setDefaultNotiType}
                            >
                                <Flex direction="column" align="start">
                                    <Radio
                                        size="lg"
                                        mt="8px"
                                        mb="8px"
                                        value="desktop"
                                    >
                                        Desktop
                                    </Radio>
                                    <Radio
                                        size="lg"
                                        mt="8px"
                                        mb="8px"
                                        value="text"
                                    >
                                        Text
                                    </Radio>
                                    <Radio
                                        size="lg"
                                        mt="8px"
                                        mb="8px"
                                        value="email"
                                    >
                                        Email
                                    </Radio>
                                </Flex>
                            </RadioGroup>
                        </Box>
                        <Text
                            fontSize="16px"
                            fontWeight="bold"
                            mt="16px"
                            mb="8px"
                        >
                            Completion Sound
                        </Text>
                        <Box pl="16px" w="100%">
                            <RadioGroup
                                value={completeSound}
                                onChange={setCompleteSound}
                            >
                                <Flex direction="column" align="start">
                                    {sounds.map((sound) => (
                                        <Radio
                                            size="lg"
                                            mt="8px"
                                            mb="8px"
                                            value={sound}
                                            onClick={() => playSound(sound)}
                                        >
                                            {sound === 'waterDrop'
                                                ? 'water drop'
                                                : sound}
                                        </Radio>
                                    ))}
                                </Flex>
                            </RadioGroup>
                        </Box>
                        <Text
                            fontSize="16px"
                            fontWeight="bold"
                            mt="16px"
                            mb="8px"
                        >
                            Subscription
                        </Text>
                        <Menu isLazy matchWidth>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton
                                        as={Button}
                                        variant="select-menu"
                                        style={{
                                            borderBottom: `1px solid rgb(226, 232, 240)`,
                                        }}
                                        _active={{
                                            borderBottomColor: 'purple.500',
                                        }}
                                        rightIcon={
                                            <CarrotIcon
                                                style={{
                                                    transform:
                                                        isOpen &&
                                                        'rotate(180deg)',
                                                    transition: 'all 0.25s',
                                                }}
                                            />
                                        }
                                    >
                                        {subscription.type}
                                    </MenuButton>
                                    <MenuList>
                                        {subscriptions.map((subscription) => (
                                            <MenuItem
                                                onClick={() =>
                                                    setSubscription(
                                                        subscription
                                                    )
                                                }
                                            >
                                                {subscription.type}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    </Flex>
                </Flex>
            </OOModal>
            {deleteUserModalOpen && (
                <DeleteUserModal
                    admin={admin}
                    user={user}
                    setUser={setUser}
                    isOpen={deleteUserModalOpen}
                    getUsers={getUsers}
                    onClose={() => setDeleteUserModalOpen(false)}
                />
            )}
        </>
    )
}

const DeleteUserModal = ({
    admin,
    user,
    setUser,
    isOpen,
    onClose,
    getUsers,
}) => {
    const toaster = useToast()

    const deleteUser = async () => {
        if (user._id) {
            try {
                // delete user from db
                await apiCall('DELETE', `/admin/${admin._id}/users/${user._id}`)

                // notify admin
                toaster({
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    render: () => (
                        <ToastyBoi
                            message={'User deleted'}
                            icon={<CircleCheckIcon fill="white" />}
                            backgroundColor="purple.500"
                        />
                    ),
                })

                // update front end and close modals
                getUsers()
                onClose()
                setUser(null)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <OOModal
            title="Delete User"
            isOpen={isOpen}
            onClose={onClose}
            secondaryButton={{
                text: 'Delete User',
                onClick: () => deleteUser(),
                style: {
                    backgroundColor: theme.colors.red[500],
                    color: theme.colors.white,
                },
            }}
        >
            <Text>
                Are you sure you want to delete this user?
                <br />
                All of their data will be deleted from the databse!
            </Text>
        </OOModal>
    )
}

const InfoInput = ({
    value,
    onFocus,
    onBlur,
    onChange,
    placeholder,
    isRequired,
}) => (
    <Input
        type="text"
        size="md"
        variant="filled"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        isRequired={isRequired}
        autoComplete="off"
    />
)

export const PhoneErrorMessage = ({ validPhone }) => {
    if (!validPhone) {
        return (
            <h3
                style={{
                    color: 'red',
                    margin: 0,
                    fontWeight: 200,
                    fontSize: 14,
                }}
            >
                *Invalid phone number
            </h3>
        )
    } else {
        return null
    }
}
