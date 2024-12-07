const { Firestore } = require('@google-cloud/firestore');

//const path = require('path'); 
const db = new Firestore({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/*async function storeData(id, data) {

  const predictCollection = db.collection('predictions');

  try {
    await predictCollection.doc(id).set(data);
    console.log('Data stored successfully:', id);
  } catch (error) {
    console.error('Error storing data in Firestore:', error);
    throw error;
  }
}*/
async function storeData(id, data) {

  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}
 
module.exports = storeData;