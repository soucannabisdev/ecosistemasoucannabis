const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors({
  origin: '*',
  credentials: true
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


app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.REACT_APP_SERVER_PORT}`);
});
