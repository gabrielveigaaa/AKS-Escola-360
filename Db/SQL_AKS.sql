CREATE DATABASE sistema_AKS;
USE sistema_AKS;

CREATE TABLE tb_alunos (
id_aluno INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (100) NOT NULL, 
cpf VARCHAR(14) NOT NULL UNIQUE,
data_nasc DATE NOT NULL,
email VARCHAR (200), 
telefone VARCHAR(20),
status ENUM ('ativo','transferido','concluido') DEFAULT 'ativo'
);

CREATE TABLE tb_professores (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE tb_turmas (
id_turma INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
ano_letivo INT NOT NULL,
turno ENUM ('manha', 'tarde', 'noite') DEFAULT 'manha',
ativa BOOLEAN DEFAULT TRUE
);

CREATE TABLE tb_disciplinas(
id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200) NOT NULL,
carga_horaria INT NOT NULL
);


CREATE TABLE tb_matriculas (
id_matricula INT AUTO_INCREMENT PRIMARY KEY,
id_aluno INT NOT NULL,
id_turma INT NOT NULL,
data_matricula DATE NOT NULL,
status ENUM ('ativa', 'trancada', 'cancelada') DEFAULT 'ativa',
FOREIGN KEY (id_aluno) REFERENCES tb_alunos(id_aluno),
FOREIGN KEY (id_turma) REFERENCES tb_turmas(id_turma)
);

CREATE TABLE tb_turma_disciplinas(
id_turma_disciplina INT AUTO_INCREMENT PRIMARY KEY,
id_turma INT NOT NULL,
id_disciplina INT NOT NULL,
id_professor INT NOT NULL,
FOREIGN KEY (id_turma) REFERENCES tb_turmas(id_turma),
FOREIGN KEY (id_disciplina) REFERENCES tb_disciplinas(id_disciplina),
FOREIGN KEY (id_professor) REFERENCES tb_professores(id_professor)
);

CREATE TABLE tb_bimestre (
id_bimestre INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
data_inicio DATE,
data_fim DATE
);

CREATE TABLE tb_avaliacoes (
id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
descricao VARCHAR(200),
peso INT NOT NULL,
data_avaliacao DATE,
id_turma_disciplina INT NOT NULL,
id_bimestre INT NOT NULL,
FOREIGN KEY (id_turma_disciplina) REFERENCES tb_turma_disciplinas(id_turma_disciplina),
FOREIGN KEY (id_bimestre) REFERENCES tb_bimestre(id_bimestre)
);

CREATE TABLE tb_notas (
id_nota INT AUTO_INCREMENT PRIMARY KEY,
nota DECIMAL(4,2),
validada BOOLEAN DEFAULT TRUE,
id_avaliacao INT NOT NULL,
id_matricula INT NOT NULL,
FOREIGN KEY (id_avaliacao) REFERENCES tb_avaliacoes(id_avaliacao),
FOREIGN KEY (id_matricula) REFERENCES tb_matriculas(id_matricula)
);

CREATE TABLE tb_frequencias (
id_frequencia INT AUTO_INCREMENT PRIMARY KEY,
id_matricula INT NOT NULL,
id_turma_disciplina INT NOT NULL,
data_ DATE NOT NULL,
presente BOOLEAN DEFAULT TRUE,
FOREIGN KEY (id_matricula) REFERENCES tb_matriculas(id_matricula),
FOREIGN KEY (id_turma_disciplina) REFERENCES tb_turma_disciplinas(id_turma_disciplina)
);

CREATE TABLE tb_usuarios (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR (100) NOT NULL UNIQUE,
senha_hash VARCHAR(300) NOT NULL,
ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE tb_perfis (
id_perfil INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL
);

CREATE TABLE usuario_perfis (
id_usuario INT NOT NULL,
id_perfil INT NOT NULL,
PRIMARY KEY (id_usuario, id_perfil),
FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario),
FOREIGN KEY (id_perfil) REFERENCES tb_perfis(id_perfil)
);



