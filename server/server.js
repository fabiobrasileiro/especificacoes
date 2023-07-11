// Server-side code (Node.js with Express, Multer, and MySQL)

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'fabiobrasileiro',
  password: 'fabinho',
  database: 'especificacoes'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/enviar-dados', upload.fields([
  { name: 'fotoSituacao', maxCount: 10 },
  { name: 'fotoEscopo', maxCount: 10 }
]), (req, res) => {
  const {
    objetivo,
    situacaoAtual,
    escopoProposta,
    materiais,
    equipamentos,
    servicos,
    suporteMensal,
    demaisCondicoes,
    caminhoImagensSituacaoAtual,
    caminhoImagensEscopoProposta,
    empresa
  } = req.body;



  const sql = 'INSERT INTO formulario (objetivo, situacaoAtual, escopoProposta, materiais, equipamentos, servicos, suporteMensal, demaisCondicoes, caminhoImagensSituacaoAtual, caminhoImagensEscopoProposta, empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    objetivo,
    situacaoAtual,
    escopoProposta,
    materiais,
    equipamentos,
    servicos,
    suporteMensal,
    demaisCondicoes,
    caminhoImagensSituacaoAtual,
    caminhoImagensEscopoProposta,
    empresa
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully!');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

app.use('/uploads', express.static('uploads'));

app.get('/dados-proposta', (req, res) => {
  const sql = 'SELECT * FROM formulario';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error reading data from the database:', err);
      res.status(500).json({ error: 'Error reading data' });
    } else {
      console.log('Data read successfully!');
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
