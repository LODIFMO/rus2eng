const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Hello SPARQL!')
})

const port = process.env.PORT || 3000
const host = process.env.IP || '0.0.0.0'

app.listen(port, host, function () {
  console.log('Example app listening on port ' + port)
})
