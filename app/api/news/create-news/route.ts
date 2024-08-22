import { connectToDB } from "@/utils/database"
import { newsModel } from "@/models/newsModel"

export const POST = async (req: any) => {
    const { title, mainDescription, description, NewsmainImage, NewsImages } = await req.json()
    try {
        await connectToDB()
        const newNews = new newsModel({
            title, mainDescription, description, NewsmainImage, NewsImages
        })
        await newNews.save()
        return new Response(JSON.stringify(newNews), { status: 200 })
    } catch (error) {
        return new Response('Failed to Create a new News', { status: 500 })
    }
}