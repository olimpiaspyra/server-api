const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    const Testimonial = require('../models/testimonial.model');
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand).populate('testimonial');
    if(!test) res.status(404).json({ message: 'Not found' });
    else res.json(test);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if(!test) res.status(404).json({ message: 'Not found' });
    else res.json(test);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAll = async (req, res) => {
  try {
    const { author, text } = req.body;
    const NewTestimonial = new Testimonial ({ 
      author: author, 
      text: text
    });
    await NewTestimonial.save();      
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { author, text } = req.body;
  try {
    const test = await Testimonial.findById(req.params.id);
    if(test) {
      test.author = author;
      test.text = text;      
      await test.save();
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if(test) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }  
};
