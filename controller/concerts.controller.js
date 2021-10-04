const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
        catch(err) {
            res.status(500).json({ message: err });
        }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getByPerformer = async (req, res) => {
  try {
      const con = await Concert.find({performer: req.params.performer});
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getByGenre = async (req, res) => {
  try {
      const con = await Concert.find({genre: req.params.genre});
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getByPrice = async (req, res) => {
  try {
      const con = await Concert.find({price: {$gte: req.params.price_min, $lte: req.params.price_max}});
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getByDay = async (req, res) => {
  try {
      const con = await Concert.find({day: req.params.day});
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postAll = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const NewConcert = new Concert ({ 
      performer: performer, 
      genre: genre, 
      price: price, 
      day: day, 
      image: image 
    });
    await NewConcert.save();      
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      con.performer = performer;
      con.genre = genre;
      con.price = price;
      con.day = day;
      con.image = image;
      await con.save();
      res.json({message: 'OK'});
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  }     
};

exports.deleteById = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }  
};