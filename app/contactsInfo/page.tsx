'use client'

import ContactsTable from '@/components/contactsTable'
import React from 'react'
import { useState, useEffect } from 'react'

const Page = () => {
    const [contactsInfo, setContactInfos] = useState([])
    const externeURL = 'https://inherited-games-app.vercel.app'
    useEffect(() => {
        const getContact = async () => {
            try {
                const response = await fetch(`${externeURL}/api/contactAPI/get-contacts`, {
                    redirect: 'follow'
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setContactInfos(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }

        }
        getContact()
    }, [externeURL])

    return (
        <div>
            <ContactsTable data={contactsInfo} />
        </div>
    )
}

export default Page