const express = require('express')
const app = express()
const url = require('url')
const sparql = require('sparql')

var client = new sparql.Client('http://dbpedia.org/sparql')

app.get('/', function(req, res) {
  const query = url.parse(req.url, true).query
  const keyword = query.keyword
  console.log(keyword)
  rus2eng(keyword, function (result) {
    res.send(result)
  })
})

const port = process.env.PORT || 3000
const host = process.env.IP || '0.0.0.0'

app.listen(port, host, function () {
  console.log(`Example app listening on port: ${port} and host: ${host}`)
})

function rus2eng (keyword, callback) {
  console.log('build query')
  const query = `
    SELECT DISTINCT ?englabel
    WHERE {
      ?entity rdfs:label ?label .
      ?label bif:contains '"${keyword.toLowerCase()}"' .
      ?entity rdfs:label ?englabel .
      FILTER ( strlen(?label) = ${keyword.length} ) .
      FILTER ( lang(?englabel) = 'en' )
    } LIMIT 1
  `
  console.log(query)
  client.query(query, function (err, res) {
    console.log('exec query')
    callback(res.results.bindings)
  })
}
