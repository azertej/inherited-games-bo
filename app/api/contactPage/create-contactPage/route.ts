import { contactPageModel } from "@/models/contactPageModel"
import { connectToDB } from "@/utils/database"

export const POST = async (req: any) => {
    const { title, description, shortDescription } = await req.json()
    try {
        await connectToDB()
        const contactPageSection = new contactPageModel({
            title, description, shortDescription
        })
        await contactPageSection.save()
        return new Response(JSON.stringify(contactPageSection), { status: 200 })
    } catch (error) {
        return new Response('Failed to Create contactPageSection', { status: 500 })
    }
}