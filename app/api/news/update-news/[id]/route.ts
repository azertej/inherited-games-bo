import { connectToDB } from "@/utils/database"
import { newsModel } from "@/models/newsModel"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const postId = params.id
        const newsById = await newsModel.findById(postId)
        if (!newsById) return new Response('Cant find current post', { status: 404 })
        return new Response(JSON.stringify(newsById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    
    try {
        await connectToDB()
        const { title, mainDescription, description, NewsmainImage, NewsImages } = await req.json()
        const newsId = params.id
        const UpdatedNews = await newsModel.findById(newsId)
        if (!UpdatedNews) return new Response('Cant find this news', { status: 404 })
        UpdatedNews.title = title
        UpdatedNews.mainDescription = mainDescription
        UpdatedNews.description = description
        UpdatedNews.NewsmainImage = NewsmainImage
        UpdatedNews.NewsImages = NewsImages
        await UpdatedNews.save()
        return new Response(JSON.stringify(UpdatedNews), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}