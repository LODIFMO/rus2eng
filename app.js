const express = require('express')
const app = express()
const url = require('url')

app.get('/', function(req, res) {
  const query = url.parse(req.url, true).query
  console.log(query.keyword)
  res.send('Hello SPARQL!')
})

const port = process.env.PORT || 3000
const host = process.env.IP || '0.0.0.0'

app.listen(port, host, function () {
  console.log('Example app listening on port ' + port)
})
