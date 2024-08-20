import { connectToDB } from "@/utils/database"
import { eventModel } from "@/models/eventModel"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const eventId = params.id
        const eventById = await eventModel.findById(eventId)
        if (!eventById) return new Response('Cant find current event', { status: 404 })
        return new Response(JSON.stringify(eventById), { status: 201 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    try {
        await connectToDB()
        const { title, EventMaindescription, EventDescription, Date, year, eventMainImage, eventImages, Slidedirection } = await req.json()
        const eventId = params.id
        const eventById = await eventModel.findById(eventId)
        if (!eventById) return new Response('Cant find current game', { status: 404 })
        eventById.title = title
        eventById.EventMaindescription = EventMaindescription
        eventById.EventDescription = EventDescription
        eventById.Date = Date
        eventById.playeartforms = year
        eventById.eventMainImage = eventMainImage
        eventById.eventImages = eventImages
        eventById.Slidedirection = Slidedirection
        await eventById.save()
        return new Response(JSON.stringify(eventById), { status: 201 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}