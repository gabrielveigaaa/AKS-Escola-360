CREATE DATABASE sistema_AKS;
USE sistema_AKS;
SET FOREIGN_KEY_CHECKS = 0;

-- ======================
-- USUÁRIOS
-- ======================

CREATE TABLE tb_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT 1,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rg VARCHAR(45) DEFAULT NULL,
    cpf VARCHAR(11) DEFAULT NULL UNIQUE
 ) ENGINE=InnoDB;

-- ======================
-- PERFIS
-- ======================

CREATE TABLE tb_perfis (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE tb_usuario_perfis (
    id_usuario INT NOT NULL,
    id_perfil INT NOT NULL,
    PRIMARY KEY (id_usuario, id_perfil),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario),
    FOREIGN KEY (id_perfil) REFERENCES tb_perfis(id_perfil)
) ENGINE=InnoDB;

-- ======================
-- PROFESSORES E ALUNOS
-- ======================

CREATE TABLE tb_professores (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    data_admissao DATE,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE tb_alunos (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    data_nascimento DATE DEFAULT NULL,
    nome_mae VARCHAR(100) DEFAULT NULL,
    nome_pai VARCHAR(100) DEFAULT NULL,
    sexo VARCHAR(45) DEFAULT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
) ENGINE=InnoDB;

-- ======================
-- ENDEREÇOS E RESPONSÁVEIS
-- ======================

CREATE TABLE tb_endereco (
        id_endereco INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        cep VARCHAR(9) DEFAULT NULL,
        logradouro VARCHAR(100) DEFAULT NULL,
        complemento VARCHAR(45) DEFAULT NULL,
        numero VARCHAR(45) DEFAULT NULL,
        bairro VARCHAR(45) DEFAULT NULL,
        uf VARCHAR(45) DEFAULT NULL,
        cidade VARCHAR(45) DEFAULT NULL,
        tb_usuarios_id_usuario INT NOT NULL,
        INDEX fk_tb_endereco_tb_usuarios_idx (tb_usuarios_id_usuario),
        CONSTRAINT fk_tb_endereco_tb_usuarios
            FOREIGN KEY (tb_usuarios_id_usuario)
            REFERENCES tb_usuarios (id_usuario)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE tb_responsaveis (
    tb_alunos_id_aluno INT NOT NULL,
    tb_usuarios_id_usuario INT NOT NULL,
    cpf VARCHAR(11) DEFAULT NULL,
    PRIMARY KEY (tb_alunos_id_aluno, tb_usuarios_id_usuario),
    INDEX fk_tb_alunos_has_tb_usuarios_tb_usuarios1_idx (tb_usuarios_id_usuario),
    INDEX fk_tb_alunos_has_tb_usuarios_tb_alunos1_idx (tb_alunos_id_aluno),
    CONSTRAINT fk_tb_alunos_has_tb_usuarios_tb_alunos1
        FOREIGN KEY (tb_alunos_id_aluno)
        REFERENCES tb_alunos (id_aluno)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT fk_tb_alunos_has_tb_usuarios_tb_usuarios1
        FOREIGN KEY (tb_usuarios_id_usuario)
        REFERENCES tb_usuarios (id_usuario)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ======================
-- TURMAS E DISCIPLINAS
-- ======================

CREATE TABLE tb_turmas (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ano_letivo YEAR NOT NULL,
    turno ENUM('MANHA','TARDE','NOITE') NOT NULL,
    ativa BOOLEAN DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE tb_disciplinas (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    carga_horaria INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE tb_turma_disciplinas (
    id_turma_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    id_turma INT NOT NULL,
    id_disciplina INT NOT NULL,
    id_professor INT NOT NULL,
    UNIQUE (id_turma, id_disciplina),
    FOREIGN KEY (id_turma) REFERENCES tb_turmas(id_turma),
    FOREIGN KEY (id_disciplina) REFERENCES tb_disciplinas(id_disciplina),
    FOREIGN KEY (id_professor) REFERENCES tb_professores(id_professor)
) ENGINE=InnoDB;

-- ======================
-- MATRÍCULAS (CORRIGIDO)
-- ======================

CREATE TABLE tb_matriculas (
    id_matricula INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_turma INT NOT NULL,
    data_matricula DATE NOT NULL,
    UNIQUE (id_aluno, id_turma),
    FOREIGN KEY (id_aluno) REFERENCES tb_alunos(id_aluno),
    FOREIGN KEY (id_turma) REFERENCES tb_turmas(id_turma)
) ENGINE=InnoDB;

-- ======================
-- AVALIAÇÕES E NOTAS
-- ======================

CREATE TABLE tb_avaliacoes (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_turma_disciplina INT NOT NULL,
    descricao VARCHAR(150),
    data_avaliacao DATE NOT NULL,
    peso DECIMAL(4,2) DEFAULT 1.00,
    FOREIGN KEY (id_turma_disciplina) REFERENCES tb_turma_disciplinas(id_turma_disciplina)
) ENGINE=InnoDB;

CREATE TABLE tb_notas (
    id_nota INT AUTO_INCREMENT PRIMARY KEY,
    id_avaliacao INT NOT NULL,
    id_matricula INT NOT NULL,
    nota DECIMAL(4,2) NOT NULL,
    UNIQUE (id_avaliacao, id_matricula),
    CHECK (nota BETWEEN 0 AND 10),
    FOREIGN KEY (id_avaliacao) REFERENCES tb_avaliacoes(id_avaliacao),
    FOREIGN KEY (id_matricula) REFERENCES tb_matriculas(id_matricula)
) ENGINE=InnoDB;

-- ======================
-- FREQUÊNCIA
-- ======================

CREATE TABLE tb_frequencias (
    id_frequencia INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT NOT NULL,
    id_turma_disciplina INT NOT NULL,
    data DATE NOT NULL,
    status ENUM('PRESENTE','FALTA','JUSTIFICADO') NOT NULL,
    UNIQUE (id_matricula, id_turma_disciplina, data),
    FOREIGN KEY (id_matricula) REFERENCES tb_matriculas(id_matricula),
    FOREIGN KEY (id_turma_disciplina) REFERENCES tb_turma_disciplinas(id_turma_disciplina)
) ENGINE=InnoDB;
