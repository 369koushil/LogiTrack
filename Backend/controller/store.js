const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
  console.log(req.body);
  const addStore = new Store({
    userID: req.body.userID, // Fixed this line to match request body key
    name: req.body.name,
    category: req.body.category,
    address: req.body.address,
    city: req.body.city,
    image: req.body.image,
  });

  addStore
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error("Error saving store:", err);
      res.status(400).send({ error: "Failed to add store", details: err.message });
    });
};

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores };
