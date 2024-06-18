# API Corelab - CoreNotes

## Tabela de Conteúdos

- [Início Rápido](#1-início-rápido)
  - [Instalando Dependências](#11-instalando-dependências)
  - [Scripts](#22-scripts)
- [Endpoints](#2-endpoints)
- [Desenvolvedores](#3-desenvolvedores)

---

## 1. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 1.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm install
```

Após instaladas as dependências adicione o arquivo .env na raiz do projeto e o preencha com as variáveis de ambiete presentes no arquivo .env.example.

JWT_SECRET - representa uma chave secreta para garantir seguridade da API.
JWT_EXPIRATION_TIME - representa o tempo, em segundos (números), que será utilizado para a expiração do token utilizado para garantir que o usuário está logado.

### 1.2. Scripts

Executar as migrações no banco de dados:

```
npm run migration:run
```

Popular o banco de dados para ter um usuário para login:

```
npm run populate:db
```

Executar aplicação em ambiente de desenvolvimento:

```
npm run dev
```

Após a ececução dos scripts a aplicação estará funcional e com 10 usuários aleatórios no banco de dados, utilize o usuário "admin" para fazer login e acessar as rotas protegidas.
Dados de login:
email= admin@mail.com
senha= admin

---

## 2. Endpoints

DOCUMENTAÇÃO ALTERNATIVA COM SWAGGER: http://localhost:3000/api-docs

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Auth](#1-Auth)
- [Colaborators](#1-Colaborators)

---

## 1. **Auth**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota        | Descrição                               |
| ------ | ----------- | --------------------------------------- |
| POST   | /auth/login | Autorização de login de um colaborador. |

---

### 1.1. **Autenticação de Colaborador**

### `POST/auth/login`

### Exemplo de Request:

```
POST /auth/login
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "email": "admin@mail.com",
  "password": "admin"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGI1MjhlMS0wN2FiLTQ4MDMtOWE0MS04YWRjZWQzYmZiYjQiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNzE4NzQ3MzIxLCJleHAiOjE3MTg3NTA5MjF9.5xBVMg4zxvOXXbSzKcNIl_RPsCmT0NkRAVWYmIPh9ow",
  "expiresIn": 3600,
  "colaborator": {
    "id": "58b528e1-07ab-4803-9a41-8adced3bfbb4",
    "isAllowed": true,
    "name": "admin",
    "documentNumber": "11111111111",
    "phone": "11999999999",
    "email": "admin@mail.com",
    "photo": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/821.jpg"
  }
}
```

---

## 2. **Colaborators**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método     | Rota              | Descrição                     |
| ---------- | ----------------- | ----------------------------- |
| POST       | /colaborators     | Criação de um colaborador.    |
| GET        | /colaborators     | Busca de todos colaboradores. |
| GET/:id    | /colaborators/:id | Busca um colaborador por id.  |
| PUT/:id    | /colaborators/:id | Edita um colaborador por id.  |
| DELETE/:id | /colaborators/:id | Deleta um colaborador por id. |

---

### 2.1. **Criação de Colaborador**

### `POST/colaborators`

### Exemplo de Request:

```
POST /colaborators
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "name": "admin",
  "documentNumber": "13313313311",
  "phone": "81987654321",
  "email": "admin@mail.com",
  "password": "admin"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "admin",
  "documentNumber": "13313313311",
  "phone": "81987654321",
  "email": "admin@mail.com",
  "photo": null,
  "id": "b4f52939-40c6-4be7-b8ee-3a8e1d7c0fb2",
  "isAllowed": false
}
```

---

### 2.2. **Busca de todos os colaboradores**

### `GET/colaborators`

### Exemplo de Request:

```
GET /colaborators
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: None
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "data": [
    {
      "id": "58b528e1-07ab-4803-9a41-8adced3bfbb4",
      "isAllowed": true,
      "name": "admin",
      "documentNumber": "11111111111",
      "phone": "11999999999",
      "email": "admin@mail.com",
      "photo": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/821.jpg"
    },
    {
      "id": "a63d3e0d-db03-41bd-b301-5835122fc1ab",
      "isAllowed": false,
      "name": "Fernando Roob",
      "documentNumber": "11111111111",
      "phone": "11999999999",
      "email": "Darius_Kilback@gmail.com",
      "photo": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/43.jpg"
    }
  ],
  "count": 10,
  "page": 1
}
```

A rota aceita os parâmetros "limit" (número referente a quantidade de registros a serem retornados) e "page" (página selecionada de itens a serem retornados) para paginação e "search" (busca por registros que possuam os dados buscados pelo colaborador) e "isAllowed" (filtra por campo isAllowed que é um boolean referente a permissões dos colaboradores) para busca.

---

### 2.3. **Busca colaborador por id**

### `GET/colaborators/:id`

### Exemplo de Request:

```
GET /colaborators/:id
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: None
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "58b528e1-07ab-4803-9a41-8adced3bfbb4",
  "isAllowed": true,
  "name": "admin",
  "documentNumber": "11111111111",
  "phone": "11999999999",
  "email": "admin@mail.com",
  "photo": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/821.jpg"
}
```

---

### 2.4. **Edição de nota por id**

### `PUT/colaborators/:id`

### Exemplo de Request:

```
PUT /colaborators/:id
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "name": "admin edited"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "6b2e1f35-9d35-4ef3-bea3-b287a759e4d5",
  "isAllowed": true,
  "name": "admin edited",
  "documentNumber": "11111111111",
  "phone": "11999999999",
  "email": "admin@mail.com",
  "photo": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/469.jpg"
}
```

---

### 2.5. **Deleção de nota por id**

### `DELETE/colaborators/:id`

### Exemplo de Request:

```
DELETE /colaborators/:id
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: None
```

### Exemplo de Response:

```
204 NO CONTENT
```

---

## 3. Desenvolvedores

[ Voltar para o topo ](#tabela-de-conteúdos)

[<img src="https://avatars.githubusercontent.com/u/104766684?v=4" width=115><br><sub>Wesley Matos</sub>](https://github.com/wesleydematos)
