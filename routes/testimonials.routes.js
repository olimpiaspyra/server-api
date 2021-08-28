const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });

  router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
  });

  router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials[`${req.params.id - 1}`]);
  });

  router.route('/testimonials').post((req, res) => {
    const newItem = {
      id: uuidv4(),
      author: req.body.author,
      text: req.body.text,
  };
  db.testimonials.push(newItem);
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const updateItem = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(updateItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db.testimonials[index] = updateContent;
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  const deleteItem = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(deleteItem);
  db.testimonials.splice(index, 1);
  res.json({message: 'OK'});
});

module.exports = router;