
import { model, models, Schema } from "mongoose";

const gameSchema = new Schema({
    title: {
        type: String,
        unique: [true, 'Title must be Unique!'],
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    mainDescription: {
        type: String,
        required: [true, 'mainDescription is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    platforms: {
        type: String,
        required: [true, 'Platforms is required']
    },
    artStyle: {
        type: String,
        required: [true, 'ArtStyle is required']
    },
    graphic: {
        type: String,
    },
    myCareer: {
        type: String,
    },
    myTeamMode: {
        type: String,
    },
    mainImage: {
        type: String
    },
    images:{
        type:Array
    }
})

export const gameModel = models.Games || model('Games', gameSchema) 