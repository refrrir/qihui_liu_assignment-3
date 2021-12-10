const mongoose = require("mongoose")
const JobSchema = require('../schema/job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJobs() {
    return JobModel.find().exec();
}

function findJobByTitle(title) {
    return JobModel.find({ title: { $regex: title, $options: 'i' } }).exec();
}

function findJobById(id) {
    return JobModel.find({ _id: id }).exec();
}

function findJobsByIds(ids) {
    return JobModel.find({ _id: { $in: ids } }).exec();
}

function updateJobById(job) {
    const { _id, title, company, location, descrption, email, website } = job;
    return JobModel.updateOne({ _id: _id }, {
        "$set": {
            title: title,
            company: company,
            location: location,
            descrption: descrption,
            email: email,
            website: website,
        }
    });
}

function deleteJobById(id){
    return JobModel.deleteOne({_id: id});
}
module.exports = {
    insertJob,
    getAllJobs,
    findJobByTitle,
    findJobById,
    findJobsByIds,
    updateJobById,
    deleteJobById
};