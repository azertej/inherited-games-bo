'use client'

import EventForm from '@/components/eventForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [event, setEvent] = useState({
        title: '',
        EventMaindescription: '',
        EventDescription: '',
        Date: '',
        year: '',
        eventMainImage: '',
        Slidedirection: '',
        eventImages: []
    })

    const createEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/Career-events/create-event', {
                method: 'POST',
                body: JSON.stringify({
                    title: event.title,
                    EventMaindescription: event.EventMaindescription,
                    EventDescription: event.EventDescription,
                    Date: event.Date,
                    year: event.year,
                    eventMainImage: event.eventMainImage,
                    Slidedirection: event.Slidedirection,
                    eventImages: event.eventImages,
                })
            })
            if (response.ok) {
                router.push('/careers-events')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28' >
            <div className='flex flex-col gap-y-8'>
                <EventForm type='Create' event={event} setEvent={setEvent} submitting={submitting} handleSubmit={createEvent} />
            </div>
        </div>
    )
}

export default Page