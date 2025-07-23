import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || 'docker-uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hello from Dockerized Node.js App! Uploads go to: ${uploadDir}`);
});

app.post('/upload', upload.array('files', 10), (req, res) => {
  if (!req.files?.length) return res.status(400).send('No files uploaded.');
  const uploadedFileNames = req.files.map(file => file.originalname);
  res.send(`Files uploaded successfully: ${uploadedFileNames.join(', ')}`);
});

app.get('/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send('Error reading files.');
    res.json(
      files.map(file => ({
        name: file,
        path: path.join(uploadDir, file),
        downloadUrl: `/download/${encodeURIComponent(file)}`
      }))
    );
  });
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found.');
  }
  res.download(filePath); 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
