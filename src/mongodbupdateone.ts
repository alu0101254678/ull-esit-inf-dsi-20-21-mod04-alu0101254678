import {MongoClient, ObjectID} from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'notes-app';

interface NoteInterface {
  title: string,
  body: string,
  color: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<NoteInterface>('notes').updateOne({
    _id: new ObjectID('60a43d7a69c93c0d15904419'),
  }, {
    $set: {
      title: 'Green note',
      body: 'This is a green note',
      color: 'green',
    },
  });
}).then((result) => {
  console.log(result.modifiedCount);
}).catch((error) => {
  console.log(error);
});
