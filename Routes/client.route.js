var router = require('express').Router();
const clientController = require('../Controllers/client.controller');
router.post('/clientInsert', clientController.clientInfoInsert)

module.exports = router;