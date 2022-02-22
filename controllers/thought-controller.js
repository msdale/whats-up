const { Thought, User } = require('../models');

const thoughtController = {
  /**
   * getAllThoughts() - GET http method that queries and returns all thoughts from mongoDB 
   * @param {*} req - request object (not used)
   * @param {*} res - response object (all users)
   */ 
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

  /**
   * getThoughtById() - GET http method that queries and returns single thought by thought id
   * @param {*} params - sub-object containing URL parameters, contained in request object
   * @param {*} res - response object 
   */
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

  /**
   * addThought() - POST http method that inserts a new thought into mongoDB 
   * @param {*} body - sub-object containing user data payload, contained in request object
   * @param {*} res - response object
   */
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

  /**
   * addReaction() - PUT http method that modifies thought document reactions array in mongoDB 
   * @param {*} params, body - are sub-objects contained in the request object...
   *                           params - sub-object containing URL parameter for thoughtId...
   *                           body - data payload to update the reactions array  
   * @param {*} res - response object
   */
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  /**
   * updateThought() - PUT http method that modifies thought data in mongoDB 
   * @param {*} params, body - are sub-objects contained in the request object...
   *                           params - sub-object containing URL parameter thoughtId...
   *                           body - data payload to update the thought document  
   * @param {*} res - response object
   */
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

  /**
   * removeThought() - DELETE http method for removing a thoughtt from mongoDB...
   *                Also deletes any thought the same thought referenced in the thoughts array in user collection 
   * @param {*} params - sub-object containing URL parameter id (thoughtId), contained in request object
   * @param {*} res - response object
   */  
  removeThought({ params }, res) {
    // get the thought data
    Thought.findOneAndDelete({ _id: params.id })
      .then(foundThought => {
        if (!foundThought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        User.findOneAndUpdate(
          { username: foundThought.username },
          { $pull: { thoughts: foundThought._id } },
          { new: true }
        )
        .catch(err => res.json(err));
        res.json(foundThought);
        return foundThought;
      })
      .then(removedThought => console.log(removedThought))
      .catch(err => res.json(err));
  },

  /**
   * removeReaction() - PUT http method that modifies thought document reactions array in mongoDB 
   * @param {*} params - sub-object containing URL parameter thoughtId and reactionId...
   *                     locates the thought document and removes the reaction (by reactionId)...
   *                     from the reactions array  
   * @param {*} res - response object
   */
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;