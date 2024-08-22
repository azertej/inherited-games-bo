'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import AboutForm from '@/components/aboutPageForm'

const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [infos, setInfos] = useState({
        title: '',
        description: '',
        aboutPageImage: '',
        StuffsImages: []
    })

    const createSection = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/aboutPage/create-aboutPage', {
                method: 'POST',
                body: JSON.stringify({
                    title: infos.title,
                    description: infos.description,
                    aboutPageImage: infos.aboutPageImage,
                    StuffsImages: infos.StuffsImages
                })
            })
            if (response.ok) {
                router.push('/infoPage')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28'>
            <AboutForm type='Create' infos={infos} setInfos={setInfos} submitting={submitting} handleInfos={createSection} />
        </div>
    )
}

export default Page