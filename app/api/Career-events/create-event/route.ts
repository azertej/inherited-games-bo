import { connectToDB } from "@/utils/database"
import { eventModel } from "@/models/eventModel"

export const POST = async (req: any)=>{
    const {title,EventMaindescription,EventDescription,Date,year,eventMainImage,eventImages,Slidedirection} = await req.json()
    try {
        await connectToDB()
        const newEvent = new eventModel({
            title,EventMaindescription,EventDescription,Date,year,eventMainImage,eventImages,Slidedirection
        })
        await newEvent.save()
        return new Response(JSON.stringify(newEvent),{status:200})
    } catch (error) {
        return new Response(`${error}`,{status:500})
    }
}