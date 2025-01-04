const User = require('../models/User');

const setDefaultUsername = async (req, res, next) => {
    try {
        const { name, username } = req.body
        if (!username && name) {
            req.body.username = name
        }
        next()
    } catch (error) {
        console.error('Error in middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = setDefaultUsername;
