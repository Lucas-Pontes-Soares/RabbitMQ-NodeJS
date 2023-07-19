const express = require('express')
const app = express()
const port = 3000
var bodyParser = require("body-parser")
var cors = require("cors");

app.get('/', function (req, res) {
  res.send('Hello!');
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App node rodando em: http://localhost:${port}`)
})