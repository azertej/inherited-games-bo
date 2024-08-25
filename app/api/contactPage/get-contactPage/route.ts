import { connectToDB } from "@/utils/database"
import { contactPageModel } from "@/models/contactPageModel"

export const GET = async (req: any) => {
    try {
        await connectToDB()
        const infos = await contactPageModel.find()
        return new Response(JSON.stringify(infos), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}