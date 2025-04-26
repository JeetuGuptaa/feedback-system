const express = require('express');
const router  = express.Router();
const { saveFeedback, getFeedback } = require('../../controller/feedback');

router.post('/', saveFeedback);
router.get('/', getFeedback);

module.exports = router;
