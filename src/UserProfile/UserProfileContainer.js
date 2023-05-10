import React, { useState, useEffect } from 'react'
import MainLayout from '../MainLayout'
import UserProfileNavMobile from './UserProfileNavMobile'
import UserProfileNavLeft from './UserProfileNavLeft'
import FormContainer from './UserForms/FormContainer'
import { useParams } from 'react-router-dom'

export default function UserProfileContainer() {
    let urlParams = useParams()

    const [selectedSection, setSelectedSection] = useState(0)
    const sections = [
        { left: '🙋‍♀️', middle: `Your Info` },
        { left: '🏢', middle: `Company Info` },
        { left: '📥', middle: `Inbox Settings` },
        { left: '🎨', middle: `Customization` },
        { left: '↔️', middle: `Integrations` },
        { left: '🔔', middle: `Notifications!` },
        { left: '💰', middle: `Subscription` },
    ]

    useEffect(() => {
        console.log(urlParams)
        if (urlParams.subsection === 'subscription') {
            setSelectedSection(6)
        } else if (urlParams.subsection === 'inbox') {
            setSelectedSection(2)
        }
    }, [])

    return (
        <MainLayout
            mobileMenu={
                <UserProfileNavMobile
                    sections={sections}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                />
            }
            left={
                <UserProfileNavLeft
                    sections={sections}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                />
            }
            main={<FormContainer section={selectedSection} />}
        />
    )
}
