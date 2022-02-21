const { Thought, User } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    // get the thought data
    Thought.findOneAndDelete({ _id: params.id })
      .then(foundThought => {
        if (!foundThought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(foundThought);
        return foundThought;
      })
      .then(removedThought => console.log(removedThought))
      .catch(err => res.json(err));
  }


  /*      .then(dbThoughtData) => {       
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
  
              console.log("REMOVED THE THOUGHT FROM USER: " + JSON.stringify(dbThoughtData));
              res.json(dbThoughtData);
            })
            .then(dbThoughtData => {
              if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
              }
              // delete the thought from thought collection
              Thought.findOneAndDelete(
                { _id: dbThoughtData._id }
              )
                .catch(err => res.json(err));
  
              console.log("REMOVED THE THOUGHT FROM THOUGHT COLLECTION: " + JSON.stringify(dbThoughtData));
              res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },
          // remove reaction
          removeReaction({ params }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
          )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
        }
      */
};

module.exports = thoughtController;