const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    title: String,
    company: String,
    location: String,
    descrption: String,
    email: String,
    website: String,
    postingDate: {
        type: Date,
        default: Date.now,
    },
    postUser: String,
}, { collection : 'jobs' });