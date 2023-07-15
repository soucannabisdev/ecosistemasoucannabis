const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios')
const cors = require("cors")
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.json());
app.use(cors());

const direcuts = require('./routes/directus')
const whatciket = require('./routes/whaticket')

app.use('/directus', direcuts); // use as rotas no aplicativo
app.use('/whaticket', whatciket)

/*const chaveSecreta = 'minhaChaveSuperSecreta';

const dadosOriginais = 'Os segredos devem ser protegidos!';

const cipher = crypto.createCipher('aes-256-cbc', chaveSecreta);
let dadosCriptografados = cipher.update(dadosOriginais, 'utf8', 'hex');
dadosCriptografados += cipher.final('hex');
console.log('Dados criptografados:', dadosCriptografados);

const decipher = crypto.createDecipher('aes-256-cbc', chaveSecreta);
let dadosDescriptografados = decipher.update(dadosCriptografados, 'hex', 'utf8');
dadosDescriptografados += decipher.final('utf8');
console.log('Dados descriptografados:', dadosDescriptografados);*/




const port = 3005;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
