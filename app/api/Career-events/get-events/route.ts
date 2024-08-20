import { eventModel } from '@/models/eventModel';
import { connectToDB } from '../../../../utils/database';

export const GET = async (req) => {
    try {
        await connectToDB()
        const events = await eventModel.find()

        return new Response(JSON.stringify(events), { status: 200 })
    } catch (error) {
        return new Response('Cant get events!', { status: 500 })
    }
}