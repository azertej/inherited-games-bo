import { model, models, Schema } from "mongoose"

const landingPageSchema = new Schema({
    title: {
        type: String,
    },
    shortDescription: {
        type: String,
    },
    description: {
        type: String,
    },
    experience:{
        type:Number,
    },
    competition:{
        type:Number,
    },
    projects:{
        type:Number,
    },
    heroImage:{
        type:String
    }
})

export const landingPageModel = models.heroSection || model('heroSection', landingPageSchema)