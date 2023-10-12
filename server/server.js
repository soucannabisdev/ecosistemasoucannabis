const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('ws');
dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors({
  origin: ['https://cadastro.ecosistemasoucannabis.ong.br'],
  credentials: true
}));


const direcuts = require('./routes/directus')
const chatwoot = require('./routes/chatwoot')
const zapsign = require('./routes/zapsign')
const email = require('./routes/email')

app.use('/api/directus', direcuts); 
app.use('/api/chatwoot', chatwoot)
app.use('/api/zapsign', zapsign)
app.use('/api/email', email)

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.REACT_APP_SERVER_PORT}`);
});
