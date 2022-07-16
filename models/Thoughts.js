const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const ThoughtsSchema = new Schema(
    {
    thoughts: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Moment
        get: (createdAtVal) => moment(createdAtVal).format('DD, MM, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
       // Use ReactionSchema to validate data
       reactions: [reactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;

});

const Thoughts = model('Thought',ThoughtsSchema);

module.exports = Thoughts;