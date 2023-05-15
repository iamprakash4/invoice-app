const { Router} =  require('express');
const router = Router();

const { getInvoice, updateInvoice } = require('../controllers/index.controller');

router.get('/invoice',getInvoice);
router.put('/invoice',updateInvoice);

module.exports = router;