## Changed
- Corrigida incompatibilidade MySQL removendo `DEFAULT CURRENT_DATE` de colunas `DATE`.
- Ajustada criação da tabela `tb_matriculas` para evitar erro de sintaxe (Error 1064).
- Padronizada a ordem de criação e remoção das tabelas para respeitar dependências de FK.

## Fixed
- Eliminados erros de sintaxe SQL incompatíveis com MySQL 5.7+/MariaDB.
- Corrigidos relacionamentos órfãos com inclusão adequada de PRIMARY KEY e FOREIGN KEY.
- Impedida duplicidade lógica de matrículas, perfis, notas e frequências via `UNIQUE`.

## Added
- Centralização de autenticação na tabela `tb_usuarios`.
- Relacionamento explícito entre usuários, alunos e professores.
- Regras de negócio aplicadas no banco (constraints e integridade referencial).

## Security
- Aumentado o tamanho do campo `senha_hash` para suportar hashes seguros (bcrypt/argon2).
- Adicionados `UNIQUE` em campos críticos como `email` e `cpf`.

## Compatibility
- Garantida execução completa do schema em MySQL 5.7+ e MariaDB sem ajustes manuais.
