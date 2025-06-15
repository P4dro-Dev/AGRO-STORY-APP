const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todas as vendas
router.get('/', (req, res) => {
    // JOIN com produtos_agricolas para mostrar o nome do produto
    const query = `
        SELECT v.id_venda, v.id_produto, p.nome AS nome_produto, v.quantidade, v.data_venda, v.valor_total
        FROM vendas_agricolas v
        JOIN produtos_agricolas p ON v.id_produto = p.id_produto
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar vendas:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
        res.json(results);
    });
});

// Criar uma nova venda
router.post('/', (req, res) => {
    const { id_produto, quantidade, data_venda, valor_total } = req.body;
    if (!id_produto || !quantidade || !data_venda || valor_total === undefined) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: id_produto, quantidade, data_venda, valor_total' });
    }
    db.query('INSERT INTO vendas_agricolas (id_produto, quantidade, data_venda, valor_total) VALUES (?, ?, ?, ?)',
        [id_produto, quantidade, data_venda, valor_total],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar venda:', err);
                // Erro de chave estrangeira, produto não existe
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({ erro: 'O ID do produto informado não existe.' });
                }
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
            res.status(201).json({ id: result.insertId, id_produto, quantidade, data_venda, valor_total, mensagem: 'Venda criada com sucesso!' });
        });
});

// Obter uma venda por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT v.id_venda, v.id_produto, p.nome AS nome_produto, v.quantidade, v.data_venda, v.valor_total
        FROM vendas_agricolas v
        JOIN produtos_agricolas p ON v.id_produto = p.id_produto
        WHERE v.id_venda = ?
    `;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar venda:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensagem: 'Venda não encontrada' });
        }
        res.json(result[0]);
    });
});

// Atualizar uma venda por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_produto, quantidade, data_venda, valor_total } = req.body;
    if (!id_produto || !quantidade || !data_venda || valor_total === undefined) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: id_produto, quantidade, data_venda, valor_total' });
    }
    db.query('UPDATE vendas_agricolas SET id_produto = ?, quantidade = ?, data_venda = ?, valor_total = ? WHERE id_venda = ?',
        [id_produto, quantidade, data_venda, valor_total, id],
        (err, result) => {
            if (err) {
                console.error('Erro ao atualizar venda:', err);
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({ erro: 'O ID do produto informado não existe.' });
                }
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada para atualização' });
            }
            res.json({ mensagem: 'Venda atualizada com sucesso!' });
        });
});

// Excluir uma venda por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM vendas_agricolas WHERE id_venda = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir venda:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Venda não encontrada para exclusão' });
        }
        res.json({ mensagem: 'Venda excluída com sucesso!' });
    });
});