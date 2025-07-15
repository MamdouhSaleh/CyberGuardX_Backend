import express from 'express';
import { Country } from './country.model.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await Country.paginate({}, { page, limit: parseInt(limit) });

    res.json({
      page: result.page,
      totalPages: result.totalPages,
      totalItems: result.totalDocs,
      data: result.docs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
