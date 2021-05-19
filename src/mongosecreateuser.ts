import mongoose from 'mongoose';
import validator from 'validator';

mongoose.connect('mongodb://127.0.0.1:27017/dsi-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface UserInterface {
  name: string,
  surname: string,
  age?: number,
  email: string,
  password: string,
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validate: (value: number) => {
      if (value <= 0) {
        throw new Error('La edad es un entero positivo');
      }
    },
    required: false,
  },
  email: {
    type: String,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('El email que intenta introducir es incorrecto');
      }
    },
    required: true,
    unique: true,
  },
  passwrod: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserInterface>('Users', UserSchema);

const user = new User({
  name: 'Yago',
  surname: 'Pérez',
  age: 21,
  email: 'yagoy90@gmail.com',
  passwrod: 'hola',
});

user.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});

