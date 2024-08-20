import { connectToDB } from "@/utils/database"
import { gameModel } from "@/models/gameModel"

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        await gameModel.findByIdAndDelete(params.id)
        return new Response('Game Deleted Succesfully', { status: 200 })
    } catch (error) {
        return new Response('Cant delete the Game', { status: 500 })
    }
}