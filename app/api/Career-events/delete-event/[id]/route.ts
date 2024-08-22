import { connectToDB } from "@/utils/database"
import { eventModel } from "@/models/eventModel"

export const DELETE = async (req: any, { params }: any) => {
    try {
        await connectToDB()
        await eventModel.findByIdAndDelete(params.id)
        return new Response('Event Deleted Succesfully', { status: 200 })
    } catch (error) {
        return new Response('Cant delete the Event', { status: 500 })
    }
}