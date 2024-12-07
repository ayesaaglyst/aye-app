const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');

//const path = require('path');
/*const db = new Firestore({
  keyFilename: path.join('../../serviceaccounkey.json'),
});*/

// Inisialisasi Firestore dengan path file service account

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
      id,
      result: label,
      suggestion,
      createdAt,
  };

  await storeData(id, data);

  return h
      .response({
          status: 'success',
          message: 'Model is predicted successfully',
          data: data,
      })
      .code(201);
}

/*const postPredictHandler = async (request, h) => {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { label, suggestion } = await predictClassification(model, image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = { id, result: label, suggestion, createdAt };

    // Simpan data ke Firestore
    await storeData(id, data);

    return h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data,
    }).code(201);
  } catch (error) {
    console.error('Error in postPredictHandler:', error);

    return h.response({
      status: 'fail',
      message: 'Error storing data or predicting model',
      error: error.message,
    }).code(500);
  }
};*/


const getHistoriesHandler = async (request, h) => {
  const db = new Firestore;
  const predictCollection = db.collection('predictions');
  const predictSnapshot = await predictCollection.get();
  const predictData = predictSnapshot.docs.map((doc) => doc.data());
  return h.response({ status: 'success', data: predictData }).code(200);
};

 
module.exports = { postPredictHandler, getHistoriesHandler };