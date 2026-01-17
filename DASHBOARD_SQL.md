START TRANSACTION;

-- ============================
-- USUÁRIOS (PROFESSORES)
-- ============================
INSERT INTO tb_usuarios (nome, email, senha_hash) VALUES
('Ana Souza', 'ana.prof@email.com', '123'),
('Bruno Lima', 'bruno.prof@email.com', '123'),
('Carla Mendes', 'carla.prof@email.com', '123');

SELECT id_usuario INTO @u_prof1 FROM tb_usuarios WHERE email = 'ana.prof@email.com';
SELECT id_usuario INTO @u_prof2 FROM tb_usuarios WHERE email = 'bruno.prof@email.com';
SELECT id_usuario INTO @u_prof3 FROM tb_usuarios WHERE email = 'carla.prof@email.com';

-- ============================
-- PROFESSORES
-- ============================
INSERT INTO tb_professores (id_usuario, cpf, data_admissao) VALUES
(@u_prof1, '11111111111', '2020-01-10'),
(@u_prof2, '22222222222', '2019-03-15'),
(@u_prof3, '33333333333', '2021-02-20');

SELECT id_professor INTO @prof1 FROM tb_professores WHERE id_usuario = @u_prof1;
SELECT id_professor INTO @prof2 FROM tb_professores WHERE id_usuario = @u_prof2;
SELECT id_professor INTO @prof3 FROM tb_professores WHERE id_usuario = @u_prof3;

-- ============================
-- USUÁRIOS (RESPONSÁVEIS)
-- ============================
INSERT INTO tb_usuarios (nome, email, senha_hash) VALUES
('Maria Responsável', 'maria.resp@email.com', '123'),
('José Responsável', 'jose.resp@email.com', '123');

SELECT id_usuario INTO @u_resp1 FROM tb_usuarios WHERE email = 'maria.resp@email.com';
SELECT id_usuario INTO @u_resp2 FROM tb_usuarios WHERE email = 'jose.resp@email.com';

-- ============================
-- USUÁRIOS (ALUNOS)
-- ============================
INSERT INTO tb_usuarios (nome, email, senha_hash) VALUES
('João Aluno', 'joao.aluno@email.com', '123'),
('Ana Aluna', 'ana.aluna@email.com', '123'),
('Pedro Aluno', 'pedro.aluno@email.com', '123'),
('Lucas Aluno', 'lucas.aluno@email.com', '123'),
('Marina Aluna', 'marina.aluna@email.com', '123');

SELECT id_usuario INTO @u_aluno1 FROM tb_usuarios WHERE email = 'joao.aluno@email.com';
SELECT id_usuario INTO @u_aluno2 FROM tb_usuarios WHERE email = 'ana.aluna@email.com';
SELECT id_usuario INTO @u_aluno3 FROM tb_usuarios WHERE email = 'pedro.aluno@email.com';
SELECT id_usuario INTO @u_aluno4 FROM tb_usuarios WHERE email = 'lucas.aluno@email.com';
SELECT id_usuario INTO @u_aluno5 FROM tb_usuarios WHERE email = 'marina.aluna@email.com';

-- ============================
-- ALUNOS
-- ============================
INSERT INTO tb_alunos (id_usuario, cpf, data_nascimento) VALUES
(@u_aluno1, '44444444444', '2009-05-10'),
(@u_aluno2, '55555555555', '2008-09-22'),
(@u_aluno3, '66666666666', '2010-01-30'),
(@u_aluno4, '77777777777', '2009-07-18'),
(@u_aluno5, '88888888888', '2008-12-05');

SELECT id_aluno INTO @aluno1 FROM tb_alunos WHERE id_usuario = @u_aluno1;
SELECT id_aluno INTO @aluno2 FROM tb_alunos WHERE id_usuario = @u_aluno2;
SELECT id_aluno INTO @aluno3 FROM tb_alunos WHERE id_usuario = @u_aluno3;
SELECT id_aluno INTO @aluno4 FROM tb_alunos WHERE id_usuario = @u_aluno4;
SELECT id_aluno INTO @aluno5 FROM tb_alunos WHERE id_usuario = @u_aluno5;

-- ============================
-- RESPONSÁVEIS ↔ ALUNOS
-- ============================
INSERT INTO tb_responsaveis (tb_alunos_id_aluno, tb_usuarios_id_usuario) VALUES
(@aluno1, @u_resp1),
(@aluno2, @u_resp1),
(@aluno3, @u_resp2),
(@aluno4, @u_resp2),
(@aluno5, @u_resp2);

-- ============================
-- ENDEREÇOS (RESPONSÁVEIS)
-- ============================
INSERT INTO tb_endereco (cep, logradouro, numero, bairro, cidade, uf, tb_usuarios_id_usuario) VALUES
('50000-000', 'Rua das Flores', '123', 'Centro', 'Recife', 'PE', @u_resp1),
('51000-000', 'Av. Brasil', '456', 'Boa Viagem', 'Recife', 'PE', @u_resp2);

-- ============================
-- TURMAS
-- ============================
INSERT INTO tb_turmas (nome, ano_letivo, turno) VALUES
('1º Ano A', 2024, 'MANHA'),
('2º Ano B', 2024, 'TARDE'),
('3º Ano C', 2024, 'NOITE');

SELECT id_turma INTO @turma1 FROM tb_turmas WHERE nome = '1º Ano A';
SELECT id_turma INTO @turma2 FROM tb_turmas WHERE nome = '2º Ano B';
SELECT id_turma INTO @turma3 FROM tb_turmas WHERE nome = '3º Ano C';

-- ============================
-- DISCIPLINAS
-- ============================
INSERT INTO tb_disciplinas (nome, carga_horaria) VALUES
('Matemática', 80),
('Português', 80),
('História', 60),
('Geografia', 60),
('Ciências', 70);

SELECT id_disciplina INTO @disc1 FROM tb_disciplinas WHERE nome = 'Matemática';
SELECT id_disciplina INTO @disc2 FROM tb_disciplinas WHERE nome = 'Português';
SELECT id_disciplina INTO @disc3 FROM tb_disciplinas WHERE nome = 'História';
SELECT id_disciplina INTO @disc4 FROM tb_disciplinas WHERE nome = 'Geografia';
SELECT id_disciplina INTO @disc5 FROM tb_disciplinas WHERE nome = 'Ciências';

-- ============================
-- TURMA × DISCIPLINA × PROFESSOR
-- ============================
INSERT INTO tb_turma_disciplinas (id_turma, id_disciplina, id_professor) VALUES
(@turma1, @disc1, @prof1),
(@turma1, @disc2, @prof2),
(@turma2, @disc1, @prof1),
(@turma2, @disc3, @prof3),
(@turma3, @disc4, @prof2),
(@turma3, @disc5, @prof3);

SELECT id_turma_disciplina INTO @td1 FROM tb_turma_disciplinas WHERE id_turma = @turma1 AND id_disciplina = @disc1;
SELECT id_turma_disciplina INTO @td2 FROM tb_turma_disciplinas WHERE id_turma = @turma1 AND id_disciplina = @disc2;
SELECT id_turma_disciplina INTO @td3 FROM tb_turma_disciplinas WHERE id_turma = @turma2 AND id_disciplina = @disc1;
SELECT id_turma_disciplina INTO @td4 FROM tb_turma_disciplinas WHERE id_turma = @turma2 AND id_disciplina = @disc3;
SELECT id_turma_disciplina INTO @td5 FROM tb_turma_disciplinas WHERE id_turma = @turma3 AND id_disciplina = @disc4;
SELECT id_turma_disciplina INTO @td6 FROM tb_turma_disciplinas WHERE id_turma = @turma3 AND id_disciplina = @disc5;

-- ============================
-- MATRÍCULAS
-- ============================
INSERT INTO tb_matriculas (id_aluno, id_turma, data_matricula) VALUES
(@aluno1, @turma1, '2024-02-01'),
(@aluno2, @turma1, '2024-02-02'),
(@aluno3, @turma2, '2024-02-03'),
(@aluno4, @turma2, '2024-02-04'),
(@aluno5, @turma3, '2024-02-05');

SELECT id_matricula INTO @mat1 FROM tb_matriculas WHERE id_aluno = @aluno1 AND id_turma = @turma1;
SELECT id_matricula INTO @mat2 FROM tb_matriculas WHERE id_aluno = @aluno2 AND id_turma = @turma1;
SELECT id_matricula INTO @mat3 FROM tb_matriculas WHERE id_aluno = @aluno3 AND id_turma = @turma2;
SELECT id_matricula INTO @mat4 FROM tb_matriculas WHERE id_aluno = @aluno4 AND id_turma = @turma2;
SELECT id_matricula INTO @mat5 FROM tb_matriculas WHERE id_aluno = @aluno5 AND id_turma = @turma3;

-- ============================
-- AVALIAÇÕES
-- ============================
INSERT INTO tb_avaliacoes (id_turma_disciplina, descricao, data_avaliacao, peso) VALUES
(@td1, 'Prova 1', '2024-03-10', 1.0),
(@td1, 'Prova 2', '2024-05-10', 1.5),
(@td2, 'Trabalho', '2024-04-15', 1.0),
(@td3, 'Prova Única', '2024-06-20', 2.0),
(@td4, 'Projeto', '2024-05-05', 1.0),
(@td5, 'Avaliação Final', '2024-06-15', 2.0);

SELECT id_avaliacao INTO @av1 FROM tb_avaliacoes WHERE descricao = 'Prova 1' AND id_turma_disciplina = @td1;
SELECT id_avaliacao INTO @av2 FROM tb_avaliacoes WHERE descricao = 'Prova 2' AND id_turma_disciplina = @td1;
SELECT id_avaliacao INTO @av3 FROM tb_avaliacoes WHERE descricao = 'Trabalho' AND id_turma_disciplina = @td2;
SELECT id_avaliacao INTO @av4 FROM tb_avaliacoes WHERE descricao = 'Prova Única' AND id_turma_disciplina = @td3;
SELECT id_avaliacao INTO @av5 FROM tb_avaliacoes WHERE descricao = 'Projeto' AND id_turma_disciplina = @td4;
SELECT id_avaliacao INTO @av6 FROM tb_avaliacoes WHERE descricao = 'Avaliação Final' AND id_turma_disciplina = @td5;

-- ============================
-- NOTAS
-- ============================
INSERT INTO tb_notas (id_avaliacao, id_matricula, nota) VALUES
(@av1, @mat1, 8.5),
(@av1, @mat2, 6.0),
(@av2, @mat1, 7.0),
(@av2, @mat2, 5.5),
(@av3, @mat3, 9.0),
(@av4, @mat4, 6.5),
(@av5, @mat5, 7.5),
(@av6, @mat3, 8.0);

-- ============================
-- FREQUÊNCIAS
-- ============================
INSERT INTO tb_frequencias (id_matricula, id_turma_disciplina, data, status) VALUES
(@mat1, @td1, '2024-03-01', 'PRESENTE'),
(@mat1, @td1, '2024-03-02', 'FALTA'),
(@mat2, @td1, '2024-03-01', 'PRESENTE'),
(@mat3, @td3, '2024-03-05', 'PRESENTE'),
(@mat4, @td4, '2024-03-06', 'JUSTIFICADO'),
(@mat5, @td5, '2024-03-07', 'PRESENTE');

COMMIT;

-- Consulta de responsáveis por aluno

SELECT 
    u_resp.id_usuario AS id_responsavel,
    u_resp.nome AS nome_responsavel,
    u_resp.email AS email_responsavel,
    e.cep,
    e.logradouro,
    e.numero,
    e.complemento,
    e.bairro,
    e.cidade,
    e.uf,
    a.id_aluno,
    u_aluno.nome AS nome_aluno,
    a.cpf AS cpf_aluno,
    a.data_nascimento
FROM tb_responsaveis r
JOIN tb_usuarios u_resp 
    ON r.tb_usuarios_id_usuario = u_resp.id_usuario
LEFT JOIN tb_endereco e 
    ON e.tb_usuarios_id_usuario = u_resp.id_usuario
JOIN tb_alunos a 
    ON r.tb_alunos_id_aluno = a.id_aluno
JOIN tb_usuarios u_aluno 
    ON a.id_usuario = u_aluno.id_usuario
WHERE u_resp.email = 'maria.resp@email.com';

-- Total de alunos por ano
SELECT t.ano_letivo, COUNT(DISTINCT m.id_aluno) AS total_alunos
FROM tb_matriculas m
JOIN tb_turmas t ON m.id_turma = t.id_turma
GROUP BY t.ano_letivo;

-- Disciplinas mais ofertadas
SELECT d.nome, COUNT(*) AS qtd
FROM tb_turma_disciplinas td
JOIN tb_disciplinas d ON td.id_disciplina = d.id_disciplina
GROUP BY d.nome;

-- Responsáveis por mais alunos
SELECT u.nome, COUNT(*) AS total_alunos
FROM tb_responsaveis r
JOIN tb_usuarios u ON r.tb_usuarios_id_usuario = u.id_usuario
GROUP BY u.nome;

-- Frequência média por turma
SELECT 
    t.nome AS turma,
    ROUND(SUM(f.status = 'PRESENTE') / COUNT(*) * 100, 2) AS taxa_presenca
FROM tb_frequencias f
JOIN tb_turma_disciplinas td ON f.id_turma_disciplina = td.id_turma_disciplina
JOIN tb_turmas t ON td.id_turma = t.id_turma
GROUP BY t.id_turma, t.nome;

-- Total de alunos matriculados por ano letivo
SELECT 
  t.ano_letivo,
  COUNT(DISTINCT m.id_aluno) AS total_alunos
FROM tb_matriculas m
JOIN tb_turmas t ON m.id_turma = t.id_turma
GROUP BY t.ano_letivo
ORDER BY t.ano_letivo;

-- Turmas com mais alunos
SELECT 
  t.nome AS turma,
  t.ano_letivo,
  COUNT(m.id_matricula) AS total_alunos
FROM tb_turmas t
LEFT JOIN tb_matriculas m ON t.id_turma = m.id_turma
GROUP BY t.id_turma, t.nome, t.ano_letivo
ORDER BY total_alunos DESC;

-- Quantidade de alunos por disciplina
SELECT 
  d.nome AS disciplina,
  COUNT(m.id_matricula) AS total_alunos
FROM tb_matriculas m
JOIN tb_turma_disciplinas td ON m.id_turma = td.id_turma
JOIN tb_disciplinas d ON td.id_disciplina = d.id_disciplina
GROUP BY d.nome
ORDER BY total_alunos DESC;

-- Professores com mais alunos no total
SELECT 
  u.nome AS professor,
  COUNT(m.id_matricula) AS total_alunos
FROM tb_matriculas m
JOIN tb_turma_disciplinas td ON m.id_turma = td.id_turma
JOIN tb_professores p ON td.id_professor = p.id_professor
JOIN tb_usuarios u ON p.id_usuario = u.id_usuario
GROUP BY p.id_professor, u.nome
ORDER BY total_alunos DESC;

-- Alunos sem responsável cadastrado
SELECT 
  u.nome AS aluno,
  u.email
FROM tb_alunos a
JOIN tb_usuarios u ON a.id_usuario = u.id_usuario
LEFT JOIN tb_responsaveis r ON a.id_aluno = r.tb_alunos_id_aluno
WHERE r.tb_alunos_id_aluno IS NULL;

-- Média geral de notas por disciplina
SELECT 
  d.nome AS disciplina,
  ROUND(AVG(n.nota), 2) AS media_nota
FROM tb_notas n
JOIN tb_avaliacoes a ON n.id_avaliacao = a.id_avaliacao
JOIN tb_turma_disciplinas td ON a.id_turma_disciplina = td.id_turma_disciplina
JOIN tb_disciplinas d ON td.id_disciplina = d.id_disciplina
GROUP BY d.id_disciplina, d.nome
ORDER BY media_nota DESC;

-- Alunos com maior média geral
SELECT 
  u.nome AS aluno,
  ROUND(AVG(n.nota), 2) AS media_geral
FROM tb_notas n
JOIN tb_matriculas m ON n.id_matricula = m.id_matricula
JOIN tb_alunos a ON m.id_aluno = a.id_aluno
JOIN tb_usuarios u ON a.id_usuario = u.id_usuario
GROUP BY a.id_aluno, u.nome
ORDER BY media_geral DESC;

-- Percentual de presença por aluno
SELECT 
  u.nome AS aluno,
  ROUND(
    SUM(f.status = 'PRESENTE') / COUNT(*) * 100, 2
  ) AS percentual_presenca
FROM tb_frequencias f
JOIN tb_matriculas m ON f.id_matricula = m.id_matricula
JOIN tb_alunos a ON m.id_aluno = a.id_aluno
JOIN tb_usuarios u ON a.id_usuario = u.id_usuario
GROUP BY a.id_aluno, u.nome
ORDER BY percentual_presenca DESC;

-- Disciplinas com maior índice de faltas
SELECT 
  d.nome AS disciplina,
  COUNT(*) AS total_faltas
FROM tb_frequencias f
JOIN tb_turma_disciplinas td ON f.id_turma_disciplina = td.id_turma_disciplina
JOIN tb_disciplinas d ON td.id_disciplina = d.id_disciplina
WHERE f.status = 'FALTA'
GROUP BY d.id_disciplina, d.nome
ORDER BY total_faltas DESC;