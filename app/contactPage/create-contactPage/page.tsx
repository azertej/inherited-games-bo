'use client'

import ContactForm from '@/components/contactPageForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [infos, setInfos] = useState({
        title: '',
        shortDescription: '',
        description: '',
   
    })

    const createSection = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/contactPage/create-contactPage', {
                method: 'POST',
                body: JSON.stringify({
                    title: infos.title,
                    shortDescription: infos.shortDescription,
                    description: infos.description,
                })
            })
            if (response.ok) {
                router.push('/contactPage')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28'>
            <ContactForm type='Create' infos={infos} setInfos={setInfos} submitting={submitting} handleInfos={createSection} />
        </div>
    )
}

export default Page