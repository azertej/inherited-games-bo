import { connectToDB } from "@/utils/database"
import { newsModel } from "@/models/newsModel"

export const DELETE = async (req: any, { params }: any) => {
    try {
        await connectToDB()
        const gameId = params.id
        await newsModel.findByIdAndDelete(gameId)
        return new Response('news Deleted Succesfully', { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}