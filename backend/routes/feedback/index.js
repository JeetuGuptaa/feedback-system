const express = require('express');
const router  = express.Router();
const { saveFeedback } = require('../../controller/feedback');

router.post('/', saveFeedback);

module.exports = router;
