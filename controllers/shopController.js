const db = require("../models");

// Defining methods for the shopController
module.exports = {

  findAllByUser: function (req, res) {
    db.Shop
      .find({ user: req.user._id })
      // populate drinks for that shop
      .populate("drinks")
      .then((dbShops) => res.json(dbShops))
      .catch((err) => res.status(422).json(err));
  },
   // Returns all shops
  findAll: function(req, res) {
    db.Shop
      .find(req.query)
      .sort({ date: -1 })
      .then(dbShops => res.json(dbShops))
      .catch(err => res.status(422).json(err));
  },

  // Returns a single shop
  findById: function(req, res) {
    db.Shop
      .findById(req.params.id)
      .populate("drinks")
      .then(dbShops => res.json(dbShops))
      .catch(err => res.status(422).json(err));
  },

  // Creates a new shop record
  create: function(req, res) {
    db.Shop.create({
        user: req.user._id,
        name: req.body.name,
        address:req.body.address,
        image: req.body.image,
      })
      .then((dbShops) => {
        db.User.findByIdAndUpdate (
          {_id: req.user._id},
          {$push: {shops:dbShops._id}}
        ).then((dbShops) => res.json(dbShops));

        })
      .catch(err => res.status(422).json(err));
  },

  // Finds and updates a shop 
  update: function(req, res) {
    db.Shop
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbShops => res.json(dbShops))
      .catch(err => res.status(422).json(err));
  },

  // Removes a shop
  remove: function(req, res) {
    db.Shop
      .findById({ _id: req.params.id })
      .then(dbShops => dbShops.remove())
      .then(dbShops => res.json(dbShops))
      .catch(err => res.status(422).json(err));
  }
};