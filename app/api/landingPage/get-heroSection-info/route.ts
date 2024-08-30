import { connectToDB } from "@/utils/database"
import { landingPageModel } from "@/models/landingPageModel"

export const revalidate = 1
export const GET = async (req: any) => {
    try {
        await connectToDB()
        const infos = await landingPageModel.find()
        return new Response(JSON.stringify(infos), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}