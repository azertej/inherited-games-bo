import { connectToDB } from "@/utils/database"
import { teamModel } from "@/models/teamModel"

export const POST = async (req) => {
    const { Teammate, Role, personImage, position } = await req.json()
    try {
        await connectToDB()
        const newMate = new teamModel({
            Teammate, Role, personImage, position
        })
        await newMate.save()
        return new Response(JSON.stringify(newMate), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}