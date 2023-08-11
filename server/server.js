const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios')
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');


const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

const direcuts = require('./routes/directus')
const chatwoot = require('./routes/chatwoot')
const wekan = require('./routes/wekan')

app.use('/directus', direcuts); // use as rotas no aplicativo
app.use('/chatwoot', chatwoot)
app.use('/wekan', wekan)


const port = 3005;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
