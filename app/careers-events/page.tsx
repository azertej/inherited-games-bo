'use client'
import EventTable from "@/components/eventTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [events, setEvents] = useState([])
  interface Event {
    _id: string;
  }
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/Career-events/get-events')
      const data = await response.json()
      setEvents(data)
    }
    fetchEvents()
  }, [])

  const handleEdit = (event: Event) => {
    router.push(`/careers-events/update-event?id=${event._id}`)
  }


  const handleDelete = async (event: Event) => {
    const isconfirmed = confirm("Are you sure to delete this event")
    if (isconfirmed) {
      try {
        await fetch(`/api/Career-events/delete-event/${event._id.toString()}`, {
          method: 'DELETE',
        })
        const eventsAfterDelete = events.filter((e: any) => e._id !== event._id)
        setEvents(eventsAfterDelete)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="w-full my-5 flex justify-center items-center">
      <EventTable data={events} handleEdit={handleEdit} handleDelete={handleDelete} />
    </main>
  );
}