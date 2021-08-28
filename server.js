const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' }, 
    { id: 3, author: 'Max Doe', text: 'They really know how to make you sad.' }, 
  ];

  app.get('/testimonials', (req, res) => {
    res.json(db);
  });

  app.get('/testimonials/random', (req, res) => {
    res.json(db[Math.floor(Math.random() * db.length)]);
  });

  app.get('/testimonials/:id', (req, res) => {
    res.json(db[`${req.params.id - 1}`]);
  });

   app.post('/testimonials', (req, res) => {
    const newItem = {
      id: uuidv4(),
      author: req.body.author,
      text: req.body.text,
  };
  db.push(newItem);
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const updateItem = db.find(item => item.id == req.params.id);
    const index = db.indexOf(updateItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db[index] = updateContent;
    res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const deleteItem = db.find(item => item.id == req.params.id);
  const index = db.indexOf(deleteItem);
  db.splice(index, 1);
  res.json({message: 'OK'});
});

  app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});