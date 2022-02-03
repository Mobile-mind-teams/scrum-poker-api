const firestore = require('../config/db');
const TableCard = require('../models/table-card');
const ApiResponse = require('../models/api-response')

class TableCardController{
  constructor() {
    this.collection = "table-card"
    this.response = new ApiResponse()
  }

  async addCard (data, document_id) {
    await firestore.collection("session").doc(document_id).collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection,[data],"Success");
  };

  async getAllCards (id) {
    const cardList = [];
    const data = await firestore.collection("session").doc(id).collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const card = new TableCard(
          item.data().value,
          item.data().description,
          item.data().user_id,
          item.data().visibility,
          item.data().story_id,
          item.id
        );
        cardList.push(card);
      });

      return this.response.toApiResponse(this.collection,cardList,"Success!")
    }
  };

  async getCard (document_id, card_id){
    const card = firestore.collection("session").doc(document_id).collection(this.collection);
    const data = await card.doc(card_id).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      const card = TableCard(
        data.data().value,
        data.data().description,
        data.data().user_id,
        data.data().visibility,
        data.data().story_id,
        data.id
      );

      return this.response.toApiResponse(this.collection,[card],"Success!")
    }
  };

  async updateTableCard (data, document_id, card_id) {
    const tableCardToUpdate = firestore.collection("session").doc(document_id).collection("table-card").doc(card_id);
    await tableCardToUpdate.update(data)
    return this.response.toApiResponse(this.collection,[data],"Success!")
  };

  async resetTable (document_id, story_id) {
    const data = await firestore.collection("session")
                                .doc(document_id)
                                .collection("table-card")
                                .where("story_id", "==", story_id)
                                .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
          firestore.collection("session")
          .doc(document_id)
          .collection("table-card")
          .doc(item.id)
          .delete()
      });

      return this.response.toApiResponse(this.collection,[],"Success!")
    }
  }
}

module.exports = TableCardController
