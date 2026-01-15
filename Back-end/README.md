# Escola360 Back-end
Express + Sequelize (MySQL 8) scaffold for the Escola360 API.

Quick start

1. Copy the example env and set your DB credentials:

	```powershell
	copy .env.sample .env
	```

2. Install dependencies and start in development:

	```bash
	cd Back-end
	npm install
	npm run dev
	```

3. Open http://localhost:3000 to verify the server and use the API at `http://localhost:3000/api`.

Configuration

- Edit `.env` to set `DB_HOST`, `DB_USER`, `DB_PASS` and `DB_NAME` for your MySQL 8 instance.

Endpoints (overview)

- Base URL: `{{HOST}}/api` (por padrão `http://localhost:3000/api`).
- Recursos disponíveis: `usuarios`, `perfis`, `professores`, `alunos`, `turmas`, `disciplinas`, `turma-disciplinas`, `matriculas`, `avaliacoes`, `notas`, `frequencias`.
- Cada recurso expõe rotas REST padrão: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`.

Sequelize — por que usar?

- Abstrai consultas SQL e mapeia tabelas para modelos JavaScript.
- Gerencia conexões e compatibilidade com MySQL 8 via `mysql2`.
- Facilita definição de relacionamentos, validações e hooks (ex.: hash de senha antes de salvar).
- Simplifica migrações e sincronização de esquema (quando desejado).

Estrutura de diretórios (resumo)

- `index.js`: ponto de entrada da API — inicializa Express e conecta ao banco.
- `src/config/database.js`: configuração do Sequelize (usa variáveis de ambiente).
- `src/models/`: modelos Sequelize correspondentes às tabelas `tb_*`.
- `src/controllers/`: controladores com lógica de CRUD (utilizam os modelos).
- `src/routes/`: roteadores Express que expõem os endpoints por entidade.
- `.env.sample`: exemplo de variáveis de ambiente.
- `insomnia-escola360.json`: workspace export do Insomnia com requisições e exemplos para importar.

Testes com Insomnia

1. No Insomnia escolha File > Import > From File e selecione `Back-end/insomnia-escola360.json`.
2. Ajuste a variável de ambiente `base_url` se necessário (ambient env dentro do workspace).
3. Execute sequencialmente:
	- Criar `usuario` (POST /usuarios)
	- Criar `perfil` (POST /perfis)
	- Criar `turma`, `disciplina`, `professor`, `turma-disciplinas`
	- Criar `aluno`, `matricula`, `avaliacao`, `nota`, `frequencia`

Respostas esperadas

- Criação: `201` + objeto criado.
- Leitura: `200` + objeto/array (ou `404` se não existir).
- Exclusão: `204` quando bem-sucedida.

Observações e próximos passos

- O scaffold não inclui autenticação; adicione JWT/Passport conforme necessidade.
- Em produção, desative `sync()` automático e use migrações controladas.
- Considere adicionar validações/constraints adicionais nos modelos e tratamento de erros centralizado.

Arquivo de referência de importação do Insomnia: [Back-end/insomnia-escola360.json](Back-end/insomnia-escola360.json)

