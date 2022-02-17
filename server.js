const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const convert = require('./business/conversion');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req, res) => {
    return res.sendFile(`${__dirname}/index.html`);
});

app.post('/api/convert', async (req, res, next) => {
    convert(req, res);
    return;
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});