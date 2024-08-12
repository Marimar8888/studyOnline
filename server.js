const express = require('express');
const port = process.env.PORT || 8080;
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5000' 
})); 

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})
app.listen(port);

console.log("server started");