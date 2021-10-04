const express = require('express');
const router = express.Router();

const ConcertController = require('../controller/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);
router.route('/concerts/:id').get(ConcertController.getById);
router.route('/concerts/performer/:performer').get(ConcertController.getByPerformer);
router.route('/concerts/genre/:genre').get(ConcertController.getByGenre);
router.route('/concerts/price/:price_min/:price_max').get(ConcertController.getByPrice);
router.route('concerts/price/day/:day').get(ConcertController.getByDay);
router.route('/concerts').post(ConcertController.postAll);
router.route('/concerts/:id').put(ConcertController.putById);
router.route('/concerts/:id').delete(ConcertController.deleteById);

module.exports = router;