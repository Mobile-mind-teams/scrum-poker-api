const firestore = require('../config/db');
const Card = require('../models/card');
const ApiResponse = require('../models/api-response')

class CardController{
  constructor() {
    this.collection = "card"
    this.response = new ApiResponse()
  }

  async addCard (data) {
    await firestore.collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection,[data], "Success!");
  };

  async updateCardData (data, id) {
    const cardToUpdate = firestore.collection(this.collection).doc(id);
    await cardToUpdate.update(data)
    return this.response.toApiResponse(this.collection,[data], "Success!");;
  };

  async getDeckFor (type){
    const deck = [];
    const data = await firestore.collection(this.collection)
                  .where("status","==","active")
                  .where("type","==",type)
                  .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const card = new Card(
          item.data().name,
          item.data().value,
          item.data().action,
          item.data().type,
          item.data().status,
          item.id,
        );
        deck.push(card);
      });

      return this.response.toApiResponse(this.collection,deck,"Success!");
    }
  };

  async getAllCards (){
    const deck = [];
    const data = await firestore.collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const card = new Card(
          item.data().name,
          item.data().value,
          item.data().action,
          item.data().type,
          item.data().status,
          item.id,
        );
        deck.push(card);
      });

      return this.response.toApiResponse(this.collection,deck,"Success!");
    }
  };

  async deleteCard (id) {
    const cardToDelete = await firestore.collection(this.collection)
                                .doc(id)
                                .delete();

    if (cardToDelete.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      return this.response.toApiResponse(this.collection,[], "Success!");;
    }
  }

}

module.exports = CardController
