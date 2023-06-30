const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Configurar cabeçalhos CORS
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'avisoscompos',
  password: 'Marketing@321',
  database: 'proposta',
});

app.use(express.json());

app.post('/enviar-dados', (req, res) => {
  const { objetivo, situacaoAtual, escopoProposta, especificacoesEquipamentos, materiais, equipamentos, servicos, suporteMensal, demaisCondicoes, imagem, descricoesImagens } = req.body;

  const sql = `INSERT INTO informacoes(objetivo, situacaoAtual, escopoProposta, especificacoesEquipamentos, materiais, equipamentos, servicos, suporteMensal, demaisCondicoes, imagem, descricoesImagens) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [objetivo, situacaoAtual, escopoProposta, especificacoesEquipamentos, materiais, equipamentos, servicos, suporteMensal, demaisCondicoes, imagem, descricoesImagens];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir os dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir os dados' });
    } else {
      console.log('Dados inseridos com sucesso!');
      res.status(200).json({ message: 'Dados inseridos com sucesso' });
    }
  });
});

app.get('/dados-proposta', (req, res) => {
  const sql = 'SELECT * FROM informacoes';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao ler os dados do banco de dados:', err);
      res.status(500).json({ error: 'Erro ao ler os dados' });
    } else {
      console.log('Dados lidos com sucesso!');
      res.status(200).json(results);
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
