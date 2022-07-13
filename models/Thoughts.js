const { Schema, model, Types } = require('mongoose');

const reactionSchema = require('../models/Reaction');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlentgh: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;

});

const Thoughts = model('Thoughts',thoughtSchema);

module.exports = Thoughts;