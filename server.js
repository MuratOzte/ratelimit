const express = require('express');
const {
    globalLimiter,
    routeSpecificLimiter,
    userLimiter,
} = require('./rateLimiters');

const app = express();
app.use(express.json());

app.use(globalLimiter);

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

app.get('/api/data', routeSpecificLimiter, (req, res) => {
    res.json({ message: 'This route uses a specific rate limiter.' });
});

app.get('/api/user-data', userLimiter, (req, res) => {
    res.json({ message: 'User-specific rate limiter applied.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
