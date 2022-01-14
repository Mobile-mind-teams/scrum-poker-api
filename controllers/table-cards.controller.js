const { json } = require('body-parser');
const firestore = require('../config/db');
const TableCard = require('../models/table-card');

class TableCardController{
  constructor() {}

  async addCard (data, document_id) {
    await firestore.collection("session").doc(document_id).collection("table-card").doc().set(data);
    return data;
  };

  async getAllCards (id) {
    const cardList = [];
    const data = await firestore.collection("session").doc(id).collection("table-card").get();

    if (data.empty) {
      return json({message : "No records found"})
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

      return cardList
    }
  };

  async getCard (document_id, card_id){
    const card = firestore.collection("session").doc(document_id).collection("table-card");
    const data = await card.doc(card_id).get();

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      return new TableCard(
        data.data().value,
        data.data().description,
        data.data().user_id,
        data.data().visibility,
        data.data().story_id,
        data.id
      );
    }
  };

  async updateTableCard (data, document_id, card_id) {
    const tableCardToUpdate = firestore.collection("session").doc(document_id).collection("table-card").doc(card_id);
    await tableCardToUpdate.update(data)
    return data;
  };

  async resetTable (document_id, story_id) {
    const data = await firestore.collection("session")
                                .doc(document_id)
                                .collection("table-card")
                                .where("story_id", "==", story_id)
                                .get();

    if (data.empty) {
      return {"message": "No records found" }
    } else {
      data.forEach((item) => {
          firestore.collection("session")
          .doc(document_id)
          .collection("table-card")
          .doc(item.id)
          .delete()
      });

      return {"message": "Records deleted!"}
    }
  }
}

module.exports = TableCardController
