import mongoose from 'mongoose';
import validator from 'validator';

mongoose.connect('mongodb://127.0.0.1:27017/notes-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface NoteInterface {
  title: string,
  body: string,
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Note title must start with a capital letter');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('Note title must contain alphanumeric characters only');
      }
    },
  },
  body: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'yellow',
    enum: ['blue', 'green', 'red', 'yellow', 'magenta'],
  },
});

const Note = mongoose.model<NoteInterface>('Note', NoteSchema);

const note = new Note({
  title: 'Green note 2',
  body: 'This is a green note',
  color: 'green',
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
