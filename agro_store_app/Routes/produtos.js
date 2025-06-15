const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todos os produtos
router.get('/', (req, res) => {
    db.query('SELECT * FROM produtos_agricolas', (err, results) => {
        if (err) {
            console.error('Erro ao listar produtos:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
        res.json(results);
    });
});

// Criar um novo produto
router.post('/', (req, res) => {
    const { nome, categoria, preco, estoque } = req.body;
    if (!nome || !categoria || preco === undefined || estoque === undefined) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, categoria, preco, estoque' });
    }
    db.query('INSERT INTO produtos_agricolas (nome, categoria, preco, estoque) VALUES (?, ?, ?, ?)',
        [nome, categoria, preco, estoque],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar produto:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
            res.status(201).json({ id: result.insertId, nome, categoria, preco, estoque, mensagem: 'Produto criado com sucesso!' });
        });
});

// Obter um produto por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM produtos_agricolas WHERE id_produto = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.json(result[0]);
    });
});

// Atualizar um produto por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, categoria, preco, estoque } = req.body;
    if (!nome || !categoria || preco === undefined || estoque === undefined) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, categoria, preco, estoque' });
    }
    db.query('UPDATE produtos_agricolas SET nome = ?, categoria = ?, preco = ?, estoque = ? WHERE id_produto = ?',
        [nome, categoria, preco, estoque, id],
        (err, result) => {
            if (err) {
                console.error('Erro ao atualizar produto:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Produto não encontrado para atualização' });
            }
            res.json({ mensagem: 'Produto atualizado com sucesso!' });
        });
});

// Excluir um produto por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM produtos_agricolas WHERE id_produto = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir produto:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado para exclusão' });
        }
        res.json({ mensagem: 'Produto excluído com sucesso!' });
    });
});
