import express from 'express';
import axios from 'axios';
import { Country } from './country.model.js';
const router = express.Router();

router.post('/seed-countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,region,population');

    const countries = response.data.map(c => ({
      name: c.name.common,
      capital: c.capital?.[0] || 'N/A',
      region: c.region,
      population: c.population
    }));

    await Country.deleteMany({}); 
    await Country.insertMany(countries);

    res.status(201).json({ message: 'Countries seeded', count: countries.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;