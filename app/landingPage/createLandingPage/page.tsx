'use client'
import LandingPageForm from '@/components/landingPageForm'
import TeamForm from '@/components/teamForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [infos, setInfos] = useState({
        title: '',
        shortDescription: '',
        description: '',
        experience:0,
        competition:0,
        projects:0,
        heroImage:''
    })

    const createSection = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/landingPage/create-heroSection', {
                method: 'POST',
                body: JSON.stringify({
                    title: infos.title,
                    shortDescription: infos.shortDescription,
                    description: infos.description,
                    experience: infos.experience,
                    competition: infos.competition,
                    projects: infos.projects,
                    heroImage: infos.heroImage,
                })
            })
            if (response.ok) {
                router.push('/landingPage')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28'>
            <LandingPageForm type='Create' infos={infos} setInfos={setInfos} submitting={submitting} handleInfos={createSection} />
        </div>
    )
}

export default Page