const express = require('express');
const router = express.Router();

const ConcertController = require('../controller/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);
router.route('/concerts/:id').get(ConcertController.getById);
router.route('/concerts').post(ConcertController.postAll);
router.route('/concerts/:id').put(ConcertController.putById);
router.route('/concerts/:id').delete(ConcertController.deleteById);

module.exports = router;