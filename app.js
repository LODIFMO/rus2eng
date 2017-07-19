const express = require('express')
const app = express()
const url = require('url')
const sparql = require('sparql')

var client = new sparql.Client('http://dbpedia.org/sparql')

app.get('/', function(req, res) {
  const query = url.parse(req.url, true).query
  const keyword = query.keyword
  rus2eng(keyword)
  res.send('Hello SPARQL!')
})

const port = process.env.PORT || 3000
const host = process.env.IP || '0.0.0.0'

app.listen(port, host, function () {
  console.log('Example app listening on port ' + port)
})

function rus2eng (keyword) {
  client.query(`
    SELECT *
    WHERE {
      ?s ?p ?o
    } LIMIT 10
  `, function (_err, res) {
    console.log(res.results.bindings[0])
  })
}
