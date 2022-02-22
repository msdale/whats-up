const { User, Thought } = require('../models');

const userController = {
  /**
   * getAllUsers() - GET http method that queries and returns all users from mongoDB 
   * @param {*} req - request object (not used)
   * @param {*} res - response object (all users)
   */ 
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  /**
   * getUserById() - GET http method that queries and returns single user by user id
   * @param {*} params - sub-object containing URL parameters, contained in request object
   * @param {*} res - response object 
   */
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  /**
   * addUser() - POST http method that inserts a new user into mongoDB 
   * @param {*} body - sub-object containing user data payload, contained in request object
   * @param {*} res - response object
   */
  addUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  
  /**
   * updateUser() - PUT http method that modifies user data in mongoDB 
   * @param {*} params, body - are sub-objects contained in the request object...
   *                           params - sub-object containing URL parameters...
   *                           body - data payload to update the user  
   * @param {*} res - response object
   */
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
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
   * deleteUser() - DELETE http method for removing a user from mongoDB...
   *                Also deletes any associated thoughts from thought collection 
   * @param {*} params - sub-object containing URL parameter id (userId), contained in request object
   * @param {*} res - response object
   */
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        // loop through thoughts and delete each from thought collection
        console.log(dbUserData);
        for (let i = 0; i < dbUserData.thoughts.length; i++) {
          console.log("IN LOOP " + dbUserData.thoughts[i] + " for index " + i);
          Thought.findOneAndDelete({ _id: dbUserData.thoughts[i] })
          .catch(err => res.json(err));
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  
  /**
   * addFriend() - PUT http method that adds to the friends (user documents) array
   * @param {*} params - sub-object containing URL parameter userId and friendId, contained in request object
   * @param {*} res - response object
   */
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId} },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found at this friend id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  /**
   * deleteFriend() - PUT http method that remove user document from the friends array
   * @param {*} params - sub-object containing URL parameters userId and friendId, contained in request object
   * @param {*} res - response object
   */
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found at this user id!' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = userController;