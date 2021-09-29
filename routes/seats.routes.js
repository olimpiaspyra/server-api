const express = require('express');
const router = express.Router();
const SeatController = require('../controller/seats.controller');

router.route('/seats').get(SeatController.getAll);
router.route('/seats/:id').get(SeatController.getById);
router.route('/seats').post(SeatController.postAll);
router.route('/seats/:id').put(SeatController.putById);
router.route('/seats/:id').delete(SeatController.deleteById);

module.exports = router;