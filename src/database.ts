import mongoose from 'mongoose';

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/test2' , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));