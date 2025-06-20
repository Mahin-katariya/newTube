    import mongoose,{Schema} from "mongoose";
    import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

    const videoSchema = new Schema({
        title : {
            type:String,
            required:true,
        },
        description : {
            type:String,
            required:true,
        },
        duration : {
            type:Number,
            required:true,
        },
        views : {
            type:Number,
            default: 0
        },
        videoFile : {
            type:String, //cloudinary url
            require:true
        },
        thumbnail : {
            type:String,
            required:true,
        },
        isPublished : {
            type:Boolean,
            default:true,
        },
        owner : {
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    },{timestamps:true})

    videoSchema.plugin(mongooseAggregatePaginate) //performing aggregate pipeplines
    export const Video = mongoose.model("Video",videoSchema)