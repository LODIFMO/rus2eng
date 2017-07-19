'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Keyword schema
 */
const KeywordSchema = new Schema({
  rusLabel: {
    type: String,
    default: '',
    required: true
  },
  engLabel: {
    type: String,
    default: '',
    required: true
  }
})

mongoose.model('Keyword', KeywordSchema)
