const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });

  router.route('/seats/:id').get((req, res) => {
    res.json(db.seats[`${req.params.id - 1}`]);
  });

  router.route('/seats').post((req, res) => {
    const newItem = {
      id: uuidv4(),
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email,     
  };

  if(db.seats.some(chosenSeat => chosenSeat.day === newItem.day && chosenSeat.seat === newItem.seat)) {
    res.status(404).json({ message: "The slot is already taken..." });
  } else {
  db.seats.push(newItem);
  res.json({message: 'OK'});
  };
});

router.route('/seats/:id').put((req, res) => {
  const updateItem = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(updateItem);
    const updateContent = ({
        id: req.params.id,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,        
    });
    db.seats[index] = updateContent;
    res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  const deleteItem = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(deleteItem);
  db.seats.splice(index, 1);
  res.json({message: 'OK'});
});

module.exports = router;