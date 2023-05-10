import React, { useState, useEffect } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import PhoneInput from 'react-phone-number-input'
import theme from '@chakra-ui/theme'
import './phoneInputStyles.css'

export default function PhoneInputComponent({
    name,
    value,
    onChange,
    placeholder,
    isAdminPage,
}) {
    const [borderColor, setBorderColor] = useState(theme.colors.gray[200])

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: 'transparent',
            }}
        >
            <PhoneInput
                name={name}
                defaultCountry="US"
                value={value}
                onChange={onChange}
                onFocus={() => setBorderColor('#0a58ce')}
                onBlur={() => setBorderColor(theme.colors.gray[200])}
                style={{
                    width: '100%',
                    borderBottomColor: borderColor,
                }}
                className={'PhoneInput'}
                placeholder={placeholder}
                required={isAdminPage ? false : true}
            />
        </div>
    )
}
