'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AboutForm from '@/components/aboutPageForm'

const UpdateSection = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sectionId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [infos, setInfos] = useState({
        title: '',
        description: '',
        aboutPageImage:'',
        StuffsImages:[]
    })

    useEffect(() => {
        const eventById = async () => {
            const response = await fetch(`/api/aboutPage/update-aboutPage/${sectionId}`)
            const data = await response.json()
            setInfos({
                title: data.title,
                description: data.description,
                aboutPageImage: data.aboutPageImage,
                StuffsImages:data.StuffsImages
            })
        }
        if (sectionId) eventById()
    }, [sectionId])

    const updateSection = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!sectionId) alert('cant find event with this ID')
        try {
            const response = await fetch(`/api/aboutPage/update-aboutPage/${sectionId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: infos.title,
                    description: infos.description,
                    aboutPageImage: infos.aboutPageImage,
                    StuffsImages:infos.StuffsImages
                })
            })
            if (response.ok) {
                router.push('/infoPage')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(true)
        }
    }
    return (
        <div className='px-5 mt-28'>
            <AboutForm type='edit' infos={infos} setInfos={setInfos} submitting={submitting} handleInfos={updateSection} />
        </div>
    )
}
export default UpdateSection