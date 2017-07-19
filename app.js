const express = require('express')
const app = express()
const url = require('url')
const sparql = require('sparql')
const Promise = require('promise')

var client = new sparql.Client('http://dbpedia.org/sparql')

app.get('/', function(req, res) {
  const query = url.parse(req.url, true).query
  const keyword = query.keyword

  translator(keyword).then(function (json) {
    res.send(json)
  }).catch(function (error) {
    res.send(error)
  })
})

const port = process.env.PORT || 3000
const host = process.env.IP || '0.0.0.0'

app.listen(port, host, function () {
  console.log(`Example app listening on port: ${port} and host: ${host}`)
})

function translator (keyword) {
  const queryString = `
    SELECT DISTINCT ?englabel
    WHERE {
      ?entity rdfs:label ?label .
      ?label bif:contains '"${keyword.toLowerCase()}"' .
      ?entity rdfs:label ?englabel .
      FILTER ( strlen(?label) = ${keyword.length} ) .
      FILTER ( lang(?englabel) = 'en' )
    } LIMIT 1
  `
  return new Promise(function(keyword, resolve, reject) {
    client.query(queryString, function (err, res) {
      if (err) reject(err)
      else resolve(res)
    })
  })
}
