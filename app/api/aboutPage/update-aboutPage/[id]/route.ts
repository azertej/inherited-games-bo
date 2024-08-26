import { connectToDB } from "@/utils/database"
import { aboutPageModel } from "@/models/aboutPageModel"

export const GET = async (req: any, { params }: any) => {
    try {    
        const postId = params.id
        const postById = await aboutPageModel.findById(postId)
        if (!postById) return new Response('Cant find current section', { status: 404 })
        return new Response(JSON.stringify(postById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}


export const PATCH = async (req: any, { params }: any) => {

    try {
        const { title, description, aboutPageImage, StuffsImages } = await req.json()
        const postId = params.id
        const postById = await aboutPageModel.findById(postId)
        if (!postById) return new Response('Cant find this section', { status: 404 })
        postById.title = title
        postById.description = description
        postById.aboutPageImage = aboutPageImage
        postById.StuffsImages = StuffsImages
        await postById.save()
        return new Response(JSON.stringify(postById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}