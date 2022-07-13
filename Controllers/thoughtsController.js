const { Thoughts, User } = require('../models');

const thoughtController = {

    getThoughts(req, res) {
        Thoughts.find({})
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtByID({ params }, res) {
        Thoughts.findOne({ _id: params.thoughtsId })
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addThought({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtsData => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'thought data incorrect!' });
                    return;
                }
                res.json(dbFootyData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thoughts.findByIdAndUpdate({ _id: params.thoughtId }, body, { runValidators: true, new: true })
            .then(thoughtsData => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'user not found with this ID!' });
                    return;
                }
                res.json(dbFootyData);
            })
            .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thoughts.findByIdAndDelete({ _id: params.thoughtId }, { runValidators: true, new: true })
            .then(thoughtsData => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'user not found with this ID!' });
                    return;
                }
                res.json(dbFootyData);
            })
            .catch(err => res.json(err));
    },
    addReaction({params, body}, res){
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtsId},
            {$push: {reactions: body}},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'Incorrect reaction data!' });
                return;
            }
            res.json(dbFootyData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({params}, res){
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtsId},
            {$pull: {reactions: {reactionId : params.reactionId}}},
            { new: true, runValidators: true }
        )
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'Incorrect reaction data!' });
                return;
            }
            res.json(dbFootyData);
        })
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;