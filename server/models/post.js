const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { POST } = require('./schemas');

const postSchema = new Schema({
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    image: { type:'String' },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: POST,
        required: true
    },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Post', postSchema);
