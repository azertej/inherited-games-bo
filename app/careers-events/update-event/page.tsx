'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import EventForm from '@/components/eventForm'

const UpdateEvent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const eventId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [event, setEvent] = useState({
        title: '',
        EventMaindescription: '',
        EventDescription: '',
        Date: '',
        year: '',
        eventMainImage: '',
        Slidedirection:'',
        eventImages: []
    })

    useEffect(() => {
        const eventById = async () => {
            const response = await fetch(`/api/Career-events/update-event/${eventId}`)
            const data = await response.json()
            setEvent({
                title: data.title,
                EventMaindescription: data.EventMaindescription,
                EventDescription: data.EventDescription,
                Date: data.Date,
                year: data.year,
                eventMainImage: data.eventMainImage,
                Slidedirection:data.Slidedirection,
                eventImages: data.eventImages,
            })
        }
        if (eventId) eventById()
    }, [eventId])

    const updateEvent = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!eventId) alert('cant find event with this ID')
        try {
            const response = await fetch(`/api/Career-events/update-event/${eventId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: event.title,
                    EventMaindescription: event.EventMaindescription,
                    EventDescription: event.EventDescription,
                    Date: event.Date,
                    year: event.year,
                    eventMainImage: event.eventMainImage,
                    Slidedirection:event.Slidedirection,
                    eventImages: event.eventImages,
                })
            })
            if (response.ok) {
                router.push('/careers-events')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(true)
        }
    }
    return (
        <div className='px-5 mt-28'>
            <EventForm type='edit' event={event} setEvent={setEvent} submitting={submitting} handleSubmit={updateEvent} />
        </div>
    )
}
export default UpdateEvent