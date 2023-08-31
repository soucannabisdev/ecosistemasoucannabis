const express = require('express');

const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');

const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Se você estiver usando cookies ou autenticação
}));

const direcuts = require('./routes/directus')
const chatwoot = require('./routes/chatwoot')
const wekan = require('./routes/wekan')
const api = require('./routes/api')
const zapsign = require('./routes/zapsign')

app.use('/directus', direcuts); 
app.use('/chatwoot', chatwoot)
app.use('/wekan', wekan)
app.use('/api', api)
app.use('/zapsign', zapsign)

const port = 3005;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
