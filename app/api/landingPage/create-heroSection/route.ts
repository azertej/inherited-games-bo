import { connectToDB } from "@/utils/database"
import { landingPageModel } from "@/models/landingPageModel"

export const POST = async (req) => {
    const { title, shortDescription, description, experience, competition, projects, heroImage } = await req.json()
    try {
        await connectToDB()
        const heroSection = new landingPageModel({
            title, shortDescription, description, experience, competition, projects, heroImage
        })
        await heroSection.save()
        return new Response(JSON.stringify(heroSection), { status: 200 })
    } catch (error) {
        return new Response('Failed to Create heroSection', { status: 500 })
    }
}