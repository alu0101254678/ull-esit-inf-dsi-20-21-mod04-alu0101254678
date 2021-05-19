import {MongoClient} from 'mongodb';

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

  return db.collection<NoteInterface>('notes').insertMany([
    {
      title: 'Yellow note',
      body: 'This is a yellow note',
      color: 'yellow',
    },
    {
      title: 'Magenta note',
      body: 'This is a magenta note',
      color: 'magenta',
    },
  ]);
}).then((result) => {
  console.log(result.insertedCount);
}).catch((error) => {
  console.log(error);
});
