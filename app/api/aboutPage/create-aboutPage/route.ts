import { aboutPageModel } from './../../../../models/aboutPageModel';
import { connectToDB } from "@/utils/database"

export const POST = async (req: any) => {
    const { title, description, aboutPageImage,StuffsImages} = await req.json()
    try {
        await connectToDB()
        const aboutPageSection = new aboutPageModel({
            title, description, aboutPageImage,StuffsImages
        })
        await aboutPageSection.save()
        return new Response(JSON.stringify(aboutPageSection), { status: 200 })
    } catch (error) {
        return new Response('Failed to Create aboutPageSection', { status: 500 })
    }
}