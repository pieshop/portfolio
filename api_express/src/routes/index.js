// const express = require('express');
// const router = express.Router();
const Entries = require('../models/Entries');
const Categories = require('../models/Categories');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });

  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Welcome to the API',
    });
  });

  app.get('/api/item/:entryId', (req, res) => {
    const { entryId } = req.params;
    Entries.getEntryByID(entryId).then(
      (response) => {
        res.status(200).send(response);
      },
      (err) => {
        res.status(404).send(err);
      }
    );
  });

  app.get('/api/active_categories', (req, res) => {
    Categories.getActiveCategories()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

  app.get('/api/categories/:categoryId/:yearId', (req, res) => {
    const { categoryId, yearId } = req.params;
    const filtered = false;
    Categories.getCategoryEntries(categoryId, yearId, filtered).then(
      (response) => {
        res.status(200).send(response);
      },
      (err) => {
        res.status(404).send(err);
      }
    );
  });
};
