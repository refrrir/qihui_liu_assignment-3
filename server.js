const express = require('express');
const jobs = require('./routes/job.js');
const users = require('./routes/user.js');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');

const mongoString = 'mongodb://127.0.0.1/job_board'
mongoose.connect(mongoString, { useNewUrlParser: true })

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

app.use(session({
    secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

// app.use(cors(corsOptions));
app.use(cors());

app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/jobs', jobs);
app.use('/users', users);


process.env.SUPER_DUPER_SECRET = "my_secret_ssshhhhh_1234567890";


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
});

