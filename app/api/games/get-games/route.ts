import { gameModel } from '../../../../models/gameModel';
import { connectToDB } from '../../../../utils/database';

export const GET = async (req: any) => {
    try {
        await connectToDB()
        const games = await gameModel.find()

        return new Response(JSON.stringify(games), { status: 200 })
    } catch (error) {
        return new Response('Cant get games!', { status: 500 })
    }
}