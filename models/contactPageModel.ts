import { model, models, Schema } from "mongoose"

const contactPageSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    shortDescription: {
        type: String,
    }
})

export const contactPageModel = models.contactPage || model('contactPage', contactPageSchema)