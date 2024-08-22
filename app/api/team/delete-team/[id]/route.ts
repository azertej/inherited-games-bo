import { connectToDB } from "@/utils/database"
import { teamModel } from "@/models/teamModel"

export const DELETE = async (req: any, { params }: any) => {
    try {
        await connectToDB()
        await teamModel.findByIdAndDelete(params.id)
        return new Response('TeamMate Deleted Succesfully', { status: 200 })
    } catch (error) {
        return new Response('Cant delete the TeamMate', { status: 500 })
    }
}