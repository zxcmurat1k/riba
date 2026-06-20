const express = require('express');
const router = express.Router();

const { sendContact } = require('../controllers/contact.controller');

router.post('/contact', sendContact);

module.exports = router;