import { teamModel } from '@/models/teamModel';
import { connectToDB } from '../../../../utils/database';

export const GET = async (req: any) => {
    try {
        await connectToDB()
        const teams = await teamModel.find()

        return new Response(JSON.stringify(teams), { status: 200 })
    } catch (error) {
        return new Response('Cant get teams!', { status: 500 })
    }
}