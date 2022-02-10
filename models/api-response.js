class toApiResponse{
  constructor() {}

  toApiResponse(collection, data, message){
    return {
      collection: collection,
      data: data,
      message: message
    }
  }

  toApiResponseEmpty(collection){
    return{
      collection: collection,
      data:[],
      message: "No records found"
    }
  }


}

module.exports = toApiResponse;
