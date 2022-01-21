const { json } = require('body-parser');
const firestore = require('../config/db');
const User = require('../models/user');

class UsersController{
  constructor() {}

  async addUser (data) {
    await firestore.collection("user").doc().set(data)
    return data
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
          item.id
        );
        usersList.push(user);
      });

      return usersList
    }
  };

  async getUser (id){
    const users = firestore.collection("user");
    const data = await users.where("uid","==",id).get();
    const user = new User();

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      data.forEach((item) => {
          user.user_name = item.data().user_name,
          user.password = item.data().password,
          user.role = item.data().role,
          user.uid = item.data().uid,
          user.email = item.data().email,
          user.doc_id = item.id
      });

      return user
    }
  };

  async updateUser (data,id) {
    const userToUpdate =firestore.collection("user").doc(id);
    await userToUpdate.update(data)
    return data;
  };

  async deleteUser (field_name, field_value) {
    const data = await firestore.collection("user")
                                .where(field_name, "==", field_value)
                                .get();

    if (data.empty) {
      return {message: "No records found" }
    } else {
      data.forEach((item) => {
          firestore.collection("user")
          .doc(item.id)
          .delete()
      });

      return {message: "Records deleted!"}
    }
  }
}

module.exports = UsersController
