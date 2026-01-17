# Escola360 Frontend

Minimal plain-JS Vite frontend scaffold using Tailwind and Axios (no React).

Quick start


1. Install dependencies

```bash
cd Front-end
npm install
```

2. Run dev server

```bash
npm run dev
```

The frontend expects the backend API at `http://localhost:3000/api` by default. You can change this by creating a `.env` file with the Vite variable `VITE_API_URL`.

Example `.env` in `Front-end/`:

```
VITE_API_URL=http://localhost:3000/api
```

 - This project uses plain JavaScript for maintainability; the UI is in `index.html`.
 - CRUD pages are generic and will attempt to infer fields from the API response. For more tailored forms, we'll add per-entity field definitions on request.

## Novos endpoints

Exemplos mínimos para consumir as novas rotas (assumindo `VITE_API_URL=http://localhost:3000/api`):

Listar endereços:

```javascript
fetch(`${import.meta.env.VITE_API_URL}/enderecos`).then(r => r.json()).then(console.log)
```

Criar um endereço:

```javascript
fetch(`${import.meta.env.VITE_API_URL}/enderecos`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ tb_usuarios_id_usuario: 1, cep: '12345-678', logradouro: 'Rua A' })
}).then(r => r.json()).then(console.log)
```

Listar responsáveis (filtrar por aluno):

```javascript
fetch(`${import.meta.env.VITE_API_URL}/responsaveis?alunoId=1`).then(r => r.json()).then(console.log)
```

Vincular responsável a um aluno:

```javascript
fetch(`${import.meta.env.VITE_API_URL}/responsaveis`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ tb_alunos_id_aluno: 1, tb_usuarios_id_usuario: 5 })
});
```

