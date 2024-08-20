import { connectToDB } from "@/utils/database"
import { contactPageModel } from "@/models/contactPageModel"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const postId = params.id
        const postById = await contactPageModel.findById(postId)
        if (!postById) return new Response('Cant find current section', { status: 404 })
        return new Response(JSON.stringify(postById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}


export const PATCH = async (req, { params }) => {
    
    try {
        await connectToDB()
        const {title, description, shortDescription} = await req.json()
        const postId = params.id
        const postById = await contactPageModel.findById(postId)
        if (!postById) return new Response('Cant find this section', { status: 404 })
        postById.title = title
        postById.description = description
        postById.shortDescription = shortDescription
        await postById.save()
        return new Response(JSON.stringify(postById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}