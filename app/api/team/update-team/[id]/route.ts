import { connectToDB } from "@/utils/database"
import { teamModel } from "@/models/teamModel"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const matetId = params.id
        const matetById = await teamModel.findById(matetId)
        if (!matetById) return new Response('Cant find current teamMate', { status: 404 })
        return new Response(JSON.stringify(matetById), { status: 201 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { Teammate, Role, personImage, position } = await req.json()
    try {
        await connectToDB()
        const matetId = params.id
        const matetById = await teamModel.findById(matetId)
        if (!matetById) return new Response('Cant find current teamMate', { status: 404 })
        matetById.Teammate = Teammate
        matetById.Role = Role
        matetById.position = position
        matetById.personImage = personImage
        await matetById.save()
        return new Response(JSON.stringify(matetById), { status: 201 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}