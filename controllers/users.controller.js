const { json } = require('body-parser');
const firestore = require('../config/db');
const User = require('../models/user');

class UsersController{
  constructor() {}

  async addUser (data) {
    await firestore.collection("user").doc().set(data);
    return data;
  };

  async getAllUsers () {
    const usersList = [];
    const data = await firestore.collection("user").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const user = new User(
          item.data().user_name,
          item.data().password,
          item.data().role,
          item.data().uid,
          item.data().email,
        );
        usersList.push(user);
      });

      return usersList
    }
  };

  async getUser (id){
    const users = firestore.collection("user");
    const data = await users.where("uid","==",id).get();
    const userResult = [];

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      data.forEach((item) => {
        const user = new User(
          item.data().user_name,
          item.data().password,
          item.data().role,
          item.data().uid,
          item.data().email,
        );

        userResult.push(user)
      });
      return userResult
    }

  };

  async updateUser (data,id) {
    const userToUpdate =firestore.collection("user").doc(id);
    await userToUpdate.update(data)
    return data;
  };
}

module.exports = UsersController
