const express = require('express');
const app = express();

const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const PORT = process.env.PORT || 3500;

//custom middleware logger to continuously log the requests
//refactored 
app.use(logger);

//Cross-Origin resource sharing for allowing access from domains
//Allowing only select few domains to access the server 
//use of third-party middleware
const whitelist = ['https://www.someSampleWebsite.com', 'http://localhost:3500', 'http://127.0.0.1:5500'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) != -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//using built-in middleware for delivering static content
app.use(express.static(path.join(__dirname, 'public')));
app.use('/subdir' ,express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir')); 
app.use('/employees', require('./routes/api/employees'));

//using app.all() to handle all other events
app.all('/*', (req, res) => {
    res.status(404);
    
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({error: "404 Not Found"});
    } else {
        res.type('text').send('404 Not Found');
    }
});

//middleware for handling errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));