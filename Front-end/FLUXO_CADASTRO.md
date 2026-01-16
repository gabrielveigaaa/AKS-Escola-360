## Fluxo de cadastro (ordem recomendada)

Este documento descreve a ordem segura para inserir dados nas tabelas do banco `sistema_AKS`, evitando erros por dependências de chave estrangeira.

Resumo da ordem (aplicável para fluxo de criação desde usuários até lançamentos):

1. `tb_usuarios` — criar os usuários (credenciais, nome, e-mail).
2. `tb_perfis` — (opcional) criar perfis se ainda não existirem.
3. `tb_usuario_perfis` — vincular usuários a perfis (precisa de `tb_usuarios` e `tb_perfis`).
4. `tb_professores` / `tb_alunos` — criar professor ou aluno referenciando `id_usuario` já existente.
5. `tb_turmas` e `tb_disciplinas` — criar turmas e disciplinas independentes.
6. `tb_turma_disciplinas` — vincular `turma` + `disciplina` + `professor` (precisa de `tb_turmas`, `tb_disciplinas` e `tb_professores`).
7. `tb_matriculas` — matricular alunos em turmas (precisa de `tb_alunos` e `tb_turmas`).
8. `tb_avaliacoes` — criar avaliações vinculadas a um `id_turma_disciplina` (precisa de `tb_turma_disciplinas`).
9. `tb_notas` — lançar notas por `id_avaliacao` e `id_matricula` (precisa de `tb_avaliacoes` e `tb_matriculas`).
10. `tb_frequencias` — registrar presenças/faltas por `id_matricula` e `id_turma_disciplina` (precisa de `tb_matriculas` e `tb_turma_disciplinas`).

Observações detalhadas

- `tb_usuarios` deve sempre ser criado antes de `tb_professores` e `tb_alunos`, pois estas tabelas possuem uma FK `id_usuario` com `UNIQUE`.
- `tb_perfis` pode ser povoada inicialmente com papéis como `ADMIN`, `PROFESSOR`, `RESPONSAVEL`, `COORDENACAO`.
- `tb_usuario_perfis` é uma tabela de relação muitos-para-muitos; insira somente após `tb_usuarios` e `tb_perfis` existirem.
- Ao criar `tb_professores` ou `tb_alunos`, garanta que o `id_usuario` esteja correto e que o mesmo usuário não tenha sido usado para outro registro do mesmo tipo (devido ao `UNIQUE`).
- `tb_turma_disciplinas` exige que o `id_professor` já exista — crie o professor (e o usuário) antes.
- `tb_matriculas` possui UNIQUE (`id_aluno`, `id_turma`) — verifique duplicatas antes de inserir.
- `tb_notas` tem UNIQUE (`id_avaliacao`, `id_matricula`) e CHECK na faixa de nota (0–10). Valide antes de inserir.
- `tb_frequencias` tem UNIQUE (`id_matricula`, `id_turma_disciplina`, `data`). Evite duplicatas por data.

Boas práticas ao implementar o fluxo via API

- Fazer as chamadas em sequência no cliente (ou usar transações no backend) para garantir consistência.
- Sempre recuperar o ID retornado pelo endpoint `POST` (por exemplo `id_usuario`, `id_aluno`) e usá-lo nos próximos passos.
- Tratar erros de FK: se o backend retornar 4xx/5xx ao inserir, abortar o fluxo ou criar os registros de suporte necessários.
- Validar campos antes de postar (formatos de CPF, datas, limites numéricos) para evitar rejeição pelo banco.
- Para importações em massa: criar primeiro os registros independentes (usuarios, perfis, turmas, disciplinas), depois criar vinculações e matrículas, por último avaliações/notas/frequências.

Exemplo de fluxo mínimo para cadastrar um aluno e lançar nota

1. POST `/api/usuarios` -> receber `id_usuario`
2. POST `/api/alunos` com `id_usuario` -> receber `id_aluno`
3. POST `/api/turmas` (se necessário) -> receber `id_turma`
4. POST `/api/matriculas` com `id_aluno` e `id_turma` -> receber `id_matricula`
5. POST `/api/disciplinas` (se necessário) -> receber `id_disciplina`
6. POST `/api/turma-disciplinas` com `id_turma`, `id_disciplina`, `id_professor` -> receber `id_turma_disciplina`
7. POST `/api/avaliacoes` com `id_turma_disciplina` -> receber `id_avaliacao`
8. POST `/api/notas` com `id_avaliacao`, `id_matricula`, `nota`

Mantendo documentação

- Atualize este arquivo quando a API adicionar validações adicionais (por exemplo, etapas/bimestres obrigatórios) ou quando houver triggers que alterem a ordem aceitável de inserção.
