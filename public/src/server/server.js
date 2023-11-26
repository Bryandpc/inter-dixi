require('dotenv').config();

// Variáveis iniciais
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY;
const app = express();

// Utilizando a página estática "public"
app.use(bodyParser.json());
app.use(express.static('public'));

// Criando a conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Conectando ao banco
db.connect((err) => {

    // Tratando caso haja um erro na ceonxão
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        // Encerra o processo se tiver erro
        process.exit(1); 
    }

    // Criando a tabela de usuários caso não exista
    const usuariosSql = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            token VARCHAR(255),
            nome VARCHAR(255),
            usuario VARCHAR(50),
            email VARCHAR(255),
            senha VARCHAR(255)
        )`;

    db.query(usuariosSql, (err, result) => {
        // Mostrando caso tenha um erro na query de usuário
        if (err) throw err;
    });

    // Criando a tabela de atualizações caso não exista
    const atualizacoesSql = `
    CREATE TABLE IF NOT EXISTS atualizacoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mensagemNovaAtt VARCHAR(255),
        criadoPor VARCHAR(50),
        criadoEm VARCHAR(25)
    )`;
    db.query(atualizacoesSql, (err, result) => {
        // Mostrando caso tenha um erro na query de criar atualização
        if (err) throw err;
    });
});

// Redirecionando o usuário par ao index
app.get('/', (req, res) => {
    res.redirect('/src');
});

// Rota para postar uma atualização
app.post('/postar', async (requisicao, resposta) => {
    const { mensagemNovaAtt, criadoPor, criadoEm } = requisicao.body;

    const novaAtt = { mensagemNovaAtt, criadoPor, criadoEm };

    // Colocando a atualização no banco
    const [resultado] = await db.promise().query('INSERT INTO atualizacoes SET ?', novaAtt);

    resposta.json({ message: 'Ação realizada com sucesso!' });
});















// Rodando servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000: http://localhost:3000');
});