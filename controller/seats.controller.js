const Seat = require('../models/seat.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAll = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const chosenSeat = await Seat.findById(req.params.id);

    if(chosenSeat) {
      res.status(404).json({ message: "The slot is already taken..." });
    } else {
      const NewSeat = new Seat ({ 
      day: day, 
      seat: seat, 
      client: client,
      email: email 
    });
      await NewSeat.save(); 
      req.io.emit('seatsUpdated', await Seat.find())
      res.json({message: 'OK'});
    }  
  } catch(err) {
      res.status(500).json({ message: err });
    }    
};

exports.putById = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      seat.day = day;
      seat.seat = seat;
      seat.client = client;
      seat.email = email;
      await seat.save();
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }  
};
