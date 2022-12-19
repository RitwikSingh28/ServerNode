//Cross-Origin resource sharing for allowing access from domains
//Allowing only select few domains to access the server 
//use of third-party middleware

const whitelist = [
    'https://www.someSampleWebsite.com', 
    'http://localhost:3500',
     'http://127.0.0.1:5500'
];

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

module.exports = corsOptions;