'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import LandingPageForm from '@/components/landingPageForm'

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sectionId = searchParams.get('id')
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

    useEffect(() => {
        const eventById = async () => {
            const response = await fetch(`/api/landingPage/update-heroSection/${sectionId}`)
            const infos = await response.json()
            setInfos({
                title: infos.title,
                shortDescription: infos.shortDescription,
                description: infos.description,
                experience: infos.experience,
                competition: infos.competition,
                projects: infos.projects,
                heroImage: infos.heroImage,
            })
        }
        if (sectionId) eventById()
    }, [sectionId])

    const updateSection = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        if (!sectionId) alert('cant find event with this ID')
        try {
            const response = await fetch(`/api/landingPage/update-heroSection/${sectionId}`, {
                method: 'PATCH',
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
            setSubmitting(true)
        }
    }
    return (
        <div className='px-5 mt-28'>
            <LandingPageForm type='edit' infos={infos} setInfos={setInfos} submitting={submitting} handleInfos={updateSection} />
        </div>
    )
}

const UpdateSection = () => {
    return (
        <Suspense>
            <Page />
        </Suspense>
    )
}
export default UpdateSection