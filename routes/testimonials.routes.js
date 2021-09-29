const express = require('express');
const router = express.Router();
const TestimonialController = require('../controller/testimonials.controller');

router.route('/testimonials').get(TestimonialController.getAll);
router.route('/testimonials/random').get(TestimonialController.getRandom);
router.route('/testimonials/:id').get(TestimonialController.getById);
router.route('/testimonials').post(TestimonialController.postAll);
router.route('/testimonials/:id').put(TestimonialController.putById);
router.route('/testimonials/:id').delete(TestimonialController.deleteById);

module.exports = router;