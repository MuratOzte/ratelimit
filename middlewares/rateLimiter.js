const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests. Please try again later.',
});

const routeSpecificLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 50, 
});

const userLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 10, 
    keyGenerator: (req) => req.headers['user-id'] || req.ip, 
});

module.exports = {
    globalLimiter,
    routeSpecificLimiter,
    userLimiter,
};
