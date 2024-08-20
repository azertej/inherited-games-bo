import { model, models, Schema } from "mongoose"

const newsSchema = new Schema({
    title: {
        type: String,
        unique: [true, 'Title is Unique'],
        required: [true, 'Title is required']
    },
    mainDescription: {
        type: String,
        required: [true, 'mainDescription is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    NewsmainImage: {
        type: String
    },
    NewsImages: {
        type: Array
    }
})

export const newsModel = models.News || model('News', newsSchema)