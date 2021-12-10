const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const UserModel = require('./models/User.Model');
const JobAccessor = require('./models/job.Model');
const auth_middleware = require('./auth_middleware.js')


router.get('/whoIsLoggedIn', auth_middleware, function (request, response) {
    const username = request.session.username;
    return response.send(username);
});

router.get('/favorites', auth_middleware, function (request, response) {
    const username = request.session.username;
    if (!username) {
        return response.status(401).send('Invalid login status');
    } else {
        UserModel.findUserByUsername(username).then((findUserResponse) => {
            if (!!findUserResponse) {
                const { favorites } = findUserResponse;
                JobAccessor.findJobsByIds(favorites).then(jobResponse => {
                    return response.status(200).send(jobResponse);
                }).catch(() => {
                    return response.status(500).send("Server internal error");
                });
            } else {
                return response.status(401).send("Invalid user");
            }
        })
    }

});

router.get('/isFavorite/:jobId', auth_middleware, function (request, response) {
    const username = request.session.username;
    const jobId = request.params.jobId;
    if (!username) {
        return response.status(401).send('Invalid login status');
    } else {
        UserModel.findUserByUsername(username).then((findUserResponse) => {
            if (!!findUserResponse) {
                const { favorites } = findUserResponse;
                let isFavorite = false;
                favorites.forEach((id) => {
                    if (id === jobId) {
                        isFavorite = true;
                    }
                });
                return response.status(200).send(isFavorite);
            } else {
                return response.status(401).send("Invalid user");
            }
        })
    }

});

router.post('/addFavorite/:jobId', auth_middleware, function (request, response) {
    const username = request.session.username;
    const jobId = request.params.jobId;
    if (!username) {
        return response.status(401).send('Invalid login status');
    } else {
        UserModel.findUserByUsername(username).then((findUserResponse) => {
            if (!!findUserResponse) {
                UserModel.updateFavorite(findUserResponse.username, [...findUserResponse.favorites, jobId])
                    .then(() => {
                        return response.status(200).send([...findUserResponse.favorites, jobId]);
                    })
                    .catch(() => {
                        return response.status(500).send("Server internal error");
                    })
            } else {
                return response.status(401).send("Invalid user");
            }
        })
    }

});


router.post('/removeFavorite/:jobId', auth_middleware, function (request, response) {
    const username = request.session.username;
    const jobId = request.params.jobId;
    if (!username) {
        return response.status(401).send('Invalid login status');
    } else {
        UserModel.findUserByUsername(username).then((findUserResponse) => {
            if (!!findUserResponse) {
                const { favorites } = findUserResponse;
                const newFavorites = favorites.filter((id) => {
                    return id !== jobId;
                });
                UserModel.updateFavorite(findUserResponse.username, [...newFavorites])
                    .then(() => {
                        return response.status(200).send([...newFavorites]);
                    })
                    .catch(() => {
                        return response.status(500).send("Server internal error");
                    })
            } else {
                return response.status(401).send("Invalid user");
            }
        })
    }

});

router.get('/logout', function (request, response) {
    response.clearCookie('jobBoardCookie');
    response.status(200).send('cookie cleared');
})

router.post('/authenticate', function (request, response) {
    let { username, password } = request.body;
    console.log(username);
    console.log(password);
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(200).send("Invalid username or password");
            }
            if (bcrypt.compareSync(password, userResponse.password)) {
                request.session.username = username;
                const payload = { username };
                // JWT is encrypting our payload (which is whatever data we want
                // to carry across sessions: in this case, just the username)
                // into the cookie based on our SECRET
                const token = jwt.sign(payload, process.env.SUPER_DUPER_SECRET, {
                    expiresIn: '14d' // optional cookie expiration date
                });
                // Here we are setting the cookie on our response obect.  
                // Note that we are returning the username, but that isn't as necessary anymore
                // unless we want to reference that on the frontend
                response.cookie('jobBoardCookie', token, { httpOnly: true });
                return response.status(200).send({ username });
            } else {
                return response.status(200).send("Invalid username or password");
            }
        })

        .catch((error) => console.error(`Something went wrong: ${error}`));

})



router.get('/:username', (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("User not found");
            }
            response.send(userResponse)
        })
        .catch(() => response.send("Issue getting user")).status(500);

})

router.post('/', function (req, res) {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    UserModel.findUserByUsername(username).then((findUserResponse) => {
        if (!findUserResponse) {
            password = bcrypt.hashSync(password, 10);
            return UserModel.insertUser({ username, password, favorites: [] })
                .then(() => {
                    req.session.username = username;
                    const payload = { username };
                    // JWT is encrypting our payload (which is whatever data we want
                    // to carry across sessions: in this case, just the username)
                    // into the cookie based on our SECRET
                    const token = jwt.sign(payload, process.env.SUPER_DUPER_SECRET, {
                        expiresIn: '14d' // optional cookie expiration date
                    });
                    // Here we are setting the cookie on our response obect.  
                    // Note that we are returning the username, but that isn't as necessary anymore
                    // unless we want to reference that on the frontend
                    res.cookie('jobBoardCookie', token, { httpOnly: true });
                    return res.status(200).send({ username });

                })
                .catch(error => {
                    res.status(400).send(error);
                });
        } else {
            res.status(400).send("duplicate username");
        }
    })
});

module.exports = router;