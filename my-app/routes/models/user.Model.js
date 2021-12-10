const mongoose = require("mongoose");
const UserSchema = require('../schema/user.Schema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getAllUsers() {
    return UserModel.find().exec();
}

function findUserByUsername(username) {
    return UserModel.findOne({ username }).exec();
}

function updateFavorite(username, jobs) {
    return UserModel.updateOne({ username: username }, {
        favorites: jobs
    });
}

module.exports = {
    insertUser,
    getAllUsers,
    findUserByUsername,
    updateFavorite,
};