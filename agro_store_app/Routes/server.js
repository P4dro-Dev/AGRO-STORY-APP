const express = require('express');
const app = express();
const cors = require('cors'); // Importa o módulo CORS

const produtosRoutes = require('./routes/produtos');
const vendasRoutes = require('./routes/vendas');

app.use(cors()); // Habilita o CORS para todas as requisições
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

app.use('/api/produtos', produtosRoutes); // Define as rotas para /api/produtos
app.use('/api/vendas', vendasRoutes);     // Define as rotas para /api/vendas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});