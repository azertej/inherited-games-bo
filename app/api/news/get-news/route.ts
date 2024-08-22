import { connectToDB } from "@/utils/database"
import { newsModel } from "@/models/newsModel"

export const GET = async (req: any) => {
    try {
        await connectToDB()
        const news = await newsModel.find()
        return new Response(JSON.stringify(news), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}