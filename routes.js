const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createHash = require('./createhash');
const hashLen = 8; /* 8 chars long */

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

/* MONGOOSE SCHEMAS */

const redirSchema = new Schema({
  shortUrl: String,
  url: String,
  createdAt: Date
});

const Redir = mongoose.model('Redir', redirSchema);

/* Exporting the routes */
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler(request, reply) {
      reply.file('views/index.html');
    }
  },
  {
    method: 'GET',
    path: '/public/{file}',
    handler(request, reply) {
      reply.file(`public/${request.params.file}`);
    }
  }
];