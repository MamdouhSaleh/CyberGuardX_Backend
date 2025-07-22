import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const uploadDir = path.join(__dirname, 'docker-uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

mongoose.connect('mongodb://mongo:27017/myfilesdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const FileSchema = new mongoose.Schema({
  filename: String,
  uploadedAt: { type: Date, default: Date.now }
});
const File = mongoose.model('File', FileSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js + MongoDB!');
});

app.post('/upload', upload.array('files', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const uploadedFileNames = req.files.map(file => file.originalname);

  await File.insertMany(req.files.map(file => ({ filename: file.originalname })));
  console.log('Files uploaded:', uploadedFileNames);

  res.send(`Files uploaded successfully: ${uploadedFileNames.join(', ')}`);
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).send('Error fetching files from DB');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
