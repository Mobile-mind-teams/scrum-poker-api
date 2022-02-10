const firestore = require('../config/db');
const User = require('../models/user');
const ApiResponse = require('../models/api-response')
class UsersController{
  constructor() {
    this.collection = "user"
    this.response = new ApiResponse()
  }

  async addUser (data) {
    await firestore.collection(this.collection).doc().set(data)
    return this.response.toApiResponse(this.collection, [data], "Success")
  };

  async getAllUsers () {
    const usersList = [];
    const data = await firestore.collection(this.collection).get();

    if (data.empty) {
      this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const user = new User(
          item.data().user_name,
          item.data().password,
          item.data().role,
          item.data().uid,
          item.data().email,
          item.data().status,
          item.id
        );
        usersList.push(user);
      });

      return this.response.toApiResponse(this.collection, usersList, "Success")
    }
  };

  async getAllAvailableUsers () {
    const usersList = [];
    const data = await firestore.collection(this.collection)
                                .where("status",'==',"available")
                                .where("role",'!=',1)
                                .get();

    if (data.empty) {
      this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const user = new User(
          item.data().user_name,
          item.data().password,
          item.data().role,
          item.data().uid,
          item.data().email,
          item.data().status,
          item.id
        );
        usersList.push(user);
      });

      return this.response.toApiResponse(this.collection, usersList, "Success")
    }
  };

  async getUser (id){
    const users = firestore.collection(this.collection);
    const data = await users.where("uid","==",id).get();
    const user = new User();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
          user.user_name = item.data().user_name,
          user.password = item.data().password,
          user.role = item.data().role,
          user.uid = item.data().uid,
          user.email = item.data().email,
          user.status = item.data().status,
          user.doc_id = item.id
      });

      return this.response.toApiResponse(this.collection, [user], "Success")
    }
  };

  async updateUser (data,id) {
    const userToUpdate = firestore.collection(this.collection).doc(id);
    await userToUpdate.update(data)
    return this.response.toApiResponse(this.collection, [data], "Success")
  };

  async deleteUser (field_name, field_value) {
    const data = await firestore.collection(this.collection)
                                .where(field_name, "==", field_value)
                                .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
          firestore.collection(this.collection)
          .doc(item.id)
          .delete()
      });

      return this.response.toApiResponse(this.collection, [], "Success")
    }
  }
}

module.exports = UsersController
