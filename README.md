# Sistema de Gerenciamento para Loja de Produtos Agrícolas (AgroStoreExpress)

Este projeto é um sistema CRUD (Create, Read, Update, Delete) simples, desenvolvido para o gerenciamento de produtos e vendas em uma loja de produtos agrícolas. Ele é dividido em um frontend interativo e um backend robusto, com toda a persistência de dados gerenciada por um banco de dados MySQL.

## Descrição Geral

O objetivo principal desta atividade prática é construir uma aplicação web que permita:
* **Gerenciar Produtos Agrícolas:** Cadastrar novos produtos, listar os produtos existentes, visualizar detalhes de um produto específico, atualizar informações de produtos e remover produtos.
* **Gerenciar Vendas:** Registrar novas vendas (associadas a produtos existentes), listar todas as vendas, visualizar detalhes de uma venda e remover registros de vendas.
* **Persistência de Dados:** Todas as operações são salvas e recuperadas de um banco de dados MySQL.

## Funcionalidades Implementadas

As seguintes funcionalidades essenciais foram desenvolvidas:

### Para Produtos Agrícolas
1.  **Cadastro de Produtos:** Adição de novos produtos (nome, categoria, preço, estoque).
2.  **Listagem de Produtos:** Visualização de todos os produtos cadastrados em uma tabela.
3.  **Edição de Produtos:** Atualização das informações de um produto existente.
4.  **Remoção de Produtos:** Exclusão de produtos da base de dados.

### Para Vendas
1.  **Cadastro de Vendas:** Registro de novas vendas, incluindo o ID do produto, quantidade, data da venda e valor total.
2.  **Listagem de Vendas:** Exibição de todas as vendas registradas, mostrando também o nome do produto vendido.
3.  **Edição de Vendas:** Atualização dos detalhes de uma venda existente.
4.  **Remoção de Vendas:** Exclusão de registros de vendas.

## Tecnologias Utilizadas

### Frontend
* **Linguagem:** JavaScript
* **Tecnologias Base:** HTML5, CSS3
* A comunicação com o backend é feita utilizando a API `fetch` nativa do navegador, sem a necessidade de bibliotecas adicionais como Axios, mantendo a simplicidade.

### Backend
* **Linguagem:** JavaScript
* **Plataforma:** Node.js
* **Framework:** Express.js
* **Bibliotecas:**
    * `mysql2`: Driver para conexão e interação com o banco de dados MySQL.
    * `cors`: Middleware para habilitar requisições de origem cruzada (Cross-Origin Resource Sharing).
    * `dotenv`: Para carregar variáveis de ambiente sensíveis (como credenciais do banco de dados) de um arquivo `.env`.
    * `body-parser`: (Integrado no Express.js 4.16.0+ via `express.json()`). Utilizado para analisar o corpo das requisições HTTP em formato JSON.
    * `nodemon`: Ferramenta para reiniciar automaticamente o servidor Node.js durante o desenvolvimento.

### Banco de Dados
* **SGBD:** MySQL
* **Ferramentas Sugeridas (para gerenciamento):** MySQL Workbench, DBeaver, phpMyAdmin, etc.

## Modelagem do Banco de Dados

O banco de dados `agro_store_express` utiliza duas tabelas para armazenar os dados: `produtos_agricolas` (tabela principal) e `vendas_agricolas` (tabela secundária com chave estrangeira).

### Tabela `produtos_agricolas` (Principal)

| Atributo      | Tipo            | Observação                               |
|---------------|-----------------|------------------------------------------|
| `id_produto`  | `INT`           | `PRIMARY KEY`, `AUTO_INCREMENT`          |
| `nome`        | `VARCHAR(60)`   | Nome do produto (Ex: "Adubo NPK")        |
| `categoria`   | `VARCHAR(60)`   | Categoria (Ex: "Fertilizante", "Semente") |
| `preco`       | `DECIMAL(10,2)` | Preço unitário do produto                |
| `estoque`     | `INT`           | Quantidade em estoque                    |

### Tabela `vendas_agricolas` (Secundária)

| Atributo      | Tipo            | Observação                               |
|---------------|-----------------|------------------------------------------|
| `id_venda`    | `INT`           | `PRIMARY KEY`, `AUTO_INCREMENT`          |
| `id_produto`  | `INT`           | `FOREIGN KEY` (referencia `produtos_agricolas.id_produto`) |
| `quantidade`  | `INT`           | Quantidade vendida                       |
| `data_venda`  | `DATE`          | Data da venda                            |
| `valor_total` | `DECIMAL(10,2)` | Valor total da venda                     |

## API - Endpoints da Aplicação

O backend expõe os seguintes endpoints RESTful para interagir com o banco de dados:

### Para Produtos
* `GET /api/products`: Lista todos os produtos agrícolas.
* `POST /api/products`: Cadastra um novo produto.
* `GET /api/products/:id`: Busca um produto específico pelo ID.
* `PUT /api/products/:id`: Atualiza um produto existente pelo ID.
* `DELETE /api/products/:id`: Remove um produto pelo ID.

### Para Vendas
* `GET /api/sales`: Lista todas as vendas (inclui o nome do produto via JOIN).
* `POST /api/sales`: Cadastra uma nova venda.
* `GET /api/sales/:id`: Busca uma venda específica pelo ID.
* `PUT /api/sales/:id`: Atualiza uma venda existente pelo ID.
* `DELETE /api/sales/:id`: Remove uma venda pelo ID.

## Estrutura do Projeto

A estrutura de pastas do projeto foi organizada para manter o código limpo e modularizado:
