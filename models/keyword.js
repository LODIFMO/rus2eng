'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Keyword schema
 */
const KeywordSchema = new Schema({
  rusLabel: { type: String, default: '' },
  engLabel: { type: String, default: '' }
})

/**
 * Validations
 */
KeywordSchema.path('rusLabel').required(true, 'Russian keyword cannot be blank')
KeywordSchema.path('engLabel').requried(true, 'English keyword cannot be blank')

mongoose.model('Keyword', KeywordSchema)
