import { connectToDB } from "@/utils/database"
import { aboutPageModel } from "@/models/aboutPageModel"

export const revalidate = 1
export const GET = async (req: any) => {
    try {
        await connectToDB()
        const infos = await aboutPageModel.find()
        return new Response(JSON.stringify(infos), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}