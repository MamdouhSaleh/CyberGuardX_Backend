import express from 'express';
import multer from 'multer';
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'docker-uploads')),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js App!');
});

app.post('/upload', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const uploadedFileNames = req.files.map(file => file.originalname);
  console.log('Files uploaded:', uploadedFileNames);

  res.send(`Files uploaded successfully: ${uploadedFileNames.join(', ')}`);
});

app.get('/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files.');
    }
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
