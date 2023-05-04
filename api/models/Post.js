const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String,
    contnent: String,
    cover: String,
    author:{type:Schema.Types.ObjectId, ref:'users'},
}, {
    timestamps: true
}, 
{
    collection: "posts"
}
);

const PostModel = model('posts', PostSchema);
module.exports = PostModel;