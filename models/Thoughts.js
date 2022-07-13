const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('../Reaction');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            validate: [[({ length }) => length > 0 && length <= 280, 'Thoughts must be no longer then 280 characters but at least be 1!']]
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