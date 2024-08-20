'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ContactForm from '@/components/contactPageForm'

const UpdateSection = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sectionId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [infos, setInfos] = useState({
        title: '',
        shortDescription: '',
        description: '',
    })

    useEffect(() => {
        const eventById = async () => {
            const response = await fetch(`/api/contactPage/update-contactPage/${sectionId}`)
            const infos = await response.json()
            setInfos({
                title: infos.title,
                shortDescription: infos.shortDescription,
                description: infos.description,
            })
        }
        if (sectionId) eventById()
    }, [sectionId])

    const updateSection = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!sectionId) alert('cant find event with this ID')
        try {
            const response = await fetch(`/api/contactPage/update-contactPage/${sectionId}`, {
                method: 'PATCH',
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
            setSubmitting(true)
        }
    }
    return (
        <div className='px-5 mt-28'>
            <ContactForm type='edit' infos={infos} setInfos={setInfos} submitting={submitting} handleInfos={updateSection} />
        </div>
    )
}
export default UpdateSection