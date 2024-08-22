import { gameModel } from '../../../../models/gameModel';
import { connectToDB } from "@/utils/database"

export const POST = async (req: any) => {
    const { title, description, mainDescription, genre, platforms, artStyle, graphic, myCareer, myTeamMode, mainImage, images } = await req.json()
    try {
        await connectToDB()
        const newGame = new gameModel({
            title, description, mainDescription, genre, platforms, artStyle, graphic, myCareer, myTeamMode, mainImage, images
        })
        await newGame.save()
        return new Response(JSON.stringify(newGame), { status: 201 })
    } catch (error) {
        return new Response('Failed to Create a new Game', { status: 500 })
    }

}