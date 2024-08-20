import { model, models, Schema } from 'mongoose'

const eventSchema = new Schema ({
    title:{
        type:String,
        unique:[true,'Title should be Unique'],
        required:[true,'Title is required']
    },
    EventMaindescription:{
        type:String,
        required:[true,'EventMaindescription is required']
    },
    EventDescription:{
        type:String,
        required:[true,'EventDescription is required']
    },
    Date:{
        type:String,
    },
    year:{
        type:String,
        required:[true,'Year is required']
    },
    eventMainImage:{
        type:String,
    },
    eventImages:{
        type:Array
    },
    Slidedirection:{
        type:String
    }
})

export const eventModel = models.Events || model('Events',eventSchema)
