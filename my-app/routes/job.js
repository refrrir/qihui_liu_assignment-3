const express = require('express');
const router = express.Router();
const auth_middleware = require('./auth_middleware.js')
const JobAccessor = require('./models/job.Model');


router.get('/findAll', function (_, response) {
    return JobAccessor.getAllJobs()
        .then(jobResponse => {
            response.status(200).send(jobResponse);
        })
        .catch(error => response.status(400).send(error))
});

router.get('/findAll/:title', function (request, response) {
    const title = request.params.title;
    return JobAccessor.findJobByTitle(title)
        .then(jobResponse => {
            response.status(200).send(jobResponse);
        })
        .catch(error => response.status(400).send(error))
});

router.get('/find/:id', function (request, response) {
    const id = request.params.id;
    return JobAccessor.findJobById(id)
        .then(jobResponse => {
            response.status(200).send(jobResponse);
        })
        .catch(error => response.status(400).send(error))
});


router.post('/create', auth_middleware, (request, response) => {
    return JobAccessor.insertJob(request.body)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
});

router.put('/edit', auth_middleware, (request, response) => {
    return JobAccessor.updateJobById(request.body)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
});

router.delete('/delete/:id', auth_middleware, (request, response) => {
    const id = request.params.id;
    return JobAccessor.deleteJobById(id)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
});

module.exports = router;