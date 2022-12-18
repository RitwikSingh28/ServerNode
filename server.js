const express = require('express');
const app = express();

const { logger } = require('./middleware/logEvents');
const path = require('path');
const PORT = process.env.PORT || 3500;

//custom middleware logger to continuously log the requests
//refactored 
app.use(logger);

//using built-in middleware for delivering static content
app.use(express.static(path.join(__dirname, 'public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 is the default 
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));