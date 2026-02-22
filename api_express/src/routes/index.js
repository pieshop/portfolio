import { Router } from 'express';
import {
  getAvailableCategories,
  getActiveCategoriesByYear,
  getCategoryEntries,
} from '../models/Categories.js';
import { getEntryByID } from '../models/Entries.js';

export const router = Router();

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await getAvailableCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/categories/active', async (req, res, next) => {
  try {
    const result = await getActiveCategoriesByYear();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/categories/:categoryId/:yearId', async (req, res, next) => {
  try {
    const { categoryId, yearId } = req.params;
    const result = await getCategoryEntries(categoryId, yearId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/item/:entryId', async (req, res, next) => {
  try {
    const entry = await getEntryByID(req.params.entryId);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (err) {
    next(err);
  }
});
