import { connectToDB } from "@/utils/database"
import { landingPageModel } from "@/models/landingPageModel"

export const GET = async (req: any, { params }: any) => {
    try {
        await connectToDB()
        const postId = params.id
        const postById = await landingPageModel.findById(postId)
        if (!postById) return new Response('Cant find current section', { status: 404 })
        return new Response(JSON.stringify(postById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}

export const PATCH = async (req: any, { params }: any) => {
    
    try {
        await connectToDB()
        const { title, shortDescription, description, experience, competition, projects, heroImage} = await req.json()
        const postId = params.id
        const postById = await landingPageModel.findById(postId)
        if (!postById) return new Response('Cant find this section', { status: 404 })
        postById.title = title
        postById.shortDescription = shortDescription
        postById.description = description
        postById.experience = experience
        postById.competition = competition
        postById.projects = projects
        postById.heroImage = heroImage
        await postById.save()
        return new Response(JSON.stringify(postById), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}