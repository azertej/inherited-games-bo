import { model, models, Schema } from "mongoose"

const aboutPageSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    aboutPageImage: {
        type: String,
    },
    StuffsImages:{
        type:Array
    }
})

export const aboutPageModel = models.aboutPage || model('aboutPage', aboutPageSchema)