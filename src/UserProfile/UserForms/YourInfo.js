import React, { useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInput from './PhoneInputs/PhoneInputComponent'
import { Text, Box, Input, Button, FormLabel } from '@chakra-ui/react'

export default function YourInfo({ user, submit }) {
    // personal info
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [secondaryEmail, setSecondaryEmail] = useState(user.secondaryEmail)
    const [jobTitle, setJobTitle] = useState(user.jobTitle)
    const [phone, setPhone] = useState(user.phone)
    const [validPhone, setValidPhone] = useState(isValidPhoneNumber(user.phone))

    const submitForm = async () => {
        // update user info
        if (isValidPhoneNumber(phone)) {
            setValidPhone(true)
            await submit({
                name,
                email,
                secondaryEmail,
                phone,
                jobTitle,
            })
        } else {
            setValidPhone(false)
        }
    }

    return (
        <>
            <Text variant="profile-title">Personal info</Text>
            <Box pl="16px" w="100%">
                <Label text="Full name" />
                <InfoInput
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your full name..."
                />
                <Label text="Email" />
                <InfoInput
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type your email..."
                />
                <Label text="Secondary email" />
                <InfoInput
                    name="secondary-email"
                    value={secondaryEmail}
                    onChange={(e) => setSecondaryEmail(e.target.value)}
                    placeholder="Type your secondary email..."
                />
                <Label text="Job Title" />
                <InfoInput
                    name="job-title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Type your job title..."
                />
                <Label text="Phone" />
                <PhoneInput
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e)}
                    placeholder="Type your phone number..."
                />
                <PhoneErrorMessage validPhone={validPhone} />
            </Box>
            <Button variant="profile-save" onClick={() => submitForm()}>
                Save changes
            </Button>
        </>
    )
}

const InfoInput = ({
    name,
    value,
    onFocus,
    onBlur,
    onChange,
    placeholder,
    isRequired,
    disabled,
}) => (
    <Input
        name={name}
        type="text"
        size="lg"
        variant="filled"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        isRequired={isRequired}
        disabled={disabled}
        autoComplete="off"
    />
)

const Label = ({ text }) => <FormLabel mt="16px">{text}</FormLabel>

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
