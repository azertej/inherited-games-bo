'use client'

import ContactsTable from '@/components/contactsTable'
import React from 'react'
import { useState, useEffect } from 'react'

const Page = () => {
    const [contactsInfo, setContactInfos] = useState([])
    const externeURL = process.env.NEXT_PUBLIC_REMOTE_API_URL || 'http://localhost:3001'
    useEffect(() => {
        const getContact = async () => {
            const response = await fetch(`${externeURL}/api/contactAPI/get-contacts`)
            const data = await response.json()
            setContactInfos(data)
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