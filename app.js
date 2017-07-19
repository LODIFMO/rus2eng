'use strict'

const express = require('express')
const app = express()
const url = require('url')
const sparql = require('sparql')
const Promise = require('promise')
const mongoose = require('mongoose')

const keywordSchema = require('./models/keyword')
const Keyword = mongoose.model('Keyword')

const dbpedia = 'http://dbpedia.org/sparql'

var client = new sparql.Client(dbpedia)

app.get('/', function(req, res) {
  const query = url.parse(req.url, true).query
  const keyword = query.keyword

  translator(keyword).then(function (json) {
    let term = new Keyword({
      rusLabel: keyword,
      engLabel: json.results.bindings[0].englabel.value
    })
    term.save(function (err, term) {
      if (err) return console.error(err)
      res.send(term)
    })
  }).catch(function (error) {
    res.send(error)
  })
})

const port = process.env.PORT || 3000
const host = process.env.IP || '0.0.0.0'

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

function listen() {
  app.listen(port, host, function () {
    console.log(`Example app listening on port: ${port} and host: ${host}`)
  })
}

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
  return new Promise(function(resolve, reject) {
    client.query(queryString, function (err, res) {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

function connect() {
  return mongoose.connect('mongodb://localhost/rus2eng').connection
}
