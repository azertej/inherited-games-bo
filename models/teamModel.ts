import { model, models, Schema } from "mongoose"

const teamSchema = new Schema({
    Teammate: {
        type: String,
        unique: [true, 'Name is Unique'],
    },
    Role: {
        type: String,
    },
    position: {
        type: String,
    },
    personImage: {
        type: String,
    }
})

export const teamModel = models.Team || model('Team', teamSchema)