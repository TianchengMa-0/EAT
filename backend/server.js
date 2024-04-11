const express = require('express');
const cors = require('cors');
const signup = require('./api/signup');
const login = require('./api/login');
const weightTrack = require('./api/weightTrack');



const app = express();
const port = 3001;

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use('/backend', signup);
app.use('/backend', login);
app.use('/backend',weightTrack);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
