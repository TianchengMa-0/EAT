const {MongoClient}=require('mongodb')
const dbURI='mongodb://127.0.0.1:27017'
const client = new MongoClient(dbURI);

async function connectToDatabase(){
  try {
    await client.connect()
    console.log('successfully connect to database')
    const db = client.db('admin');
    return db
  } catch (error) {
    console.log('error happens when connect to database:',error)
  }
}
module.exports = { connectToDatabase };



