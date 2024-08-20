import { connectToDB } from "@/utils/database"
import { gameModel } from "@/models/gameModel"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const postId = params.id
        const postById = await gameModel.findById(postId)
        if (!postById) return new Response('Cant find current post', { status: 404 })
        return new Response(JSON.stringify(postById), { status: 201 })
    } catch (error) {
        return new Response(error, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    try {
        await connectToDB()
        const { title, description, mainDescription, genre, platforms, artStyle, graphic, myCareer, myTeamMode, mainImage ,images} = await req.json()
        const postId = params.id
        const postById = await gameModel.findById(postId)
        if (!postById) return new Response('Cant find current game', { status: 404 })
        postById.title = title
        postById.description = description
        postById.mainDescription = mainDescription
        postById.genre = genre
        postById.platforms = platforms
        postById.artStyle = artStyle
        postById.graphic = graphic
        postById.myCareer = myCareer
        postById.myTeamMode = myTeamMode
        postById.mainImage = mainImage
        postById.images= images
        await postById.save()
        return new Response(JSON.stringify(postById), { status: 201 })
    } catch (error) {
        return new Response(error, { status: 500 })
    }
}