import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,region,population');
    const countries = response.data.map(country => ({
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      region: country.region,
      population: country.population
    }));
    res.json(countries);
  } catch (error) {
    console.error('Axios Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch countries', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
