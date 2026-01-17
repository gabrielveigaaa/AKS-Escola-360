CREATE TABLE IF NOT EXISTS `sistema_aks`.`tb_usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha_hash` VARCHAR(255) NOT NULL,
  `ativo` TINYINT(1) NOT NULL DEFAULT '1',
  `criado_em` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `rg` VARCHAR(45) NULL,
  `cpf` VARCHAR(11) NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `sistema_aks`.`tb_alunos` (
  `id_aluno` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `data_nascimento` DATE NULL DEFAULT NULL,
  `nome_mae` VARCHAR(100) NULL,
  `nome_pai` VARCHAR(100) NULL,
  `sexo` VARCHAR(45) NULL,
  PRIMARY KEY (`id_aluno`),
  UNIQUE INDEX `id_usuario` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `tb_alunos_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `sistema_aks`.`tb_usuarios` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci


CREATE TABLE IF NOT EXISTS `sistema_aks`.`tb_responsaveis` (
  `tb_alunos_id_aluno` INT NOT NULL,
  `tb_usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`tb_alunos_id_aluno`, `tb_usuarios_id_usuario`),
  INDEX `fk_tb_alunos_has_tb_usuarios_tb_usuarios1_idx` (`tb_usuarios_id_usuario` ASC) VISIBLE,
  INDEX `fk_tb_alunos_has_tb_usuarios_tb_alunos1_idx` (`tb_alunos_id_aluno` ASC) VISIBLE,
  CONSTRAINT `fk_tb_alunos_has_tb_usuarios_tb_alunos1`
    FOREIGN KEY (`tb_alunos_id_aluno`)
    REFERENCES `sistema_aks`.`tb_alunos` (`id_aluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_alunos_has_tb_usuarios_tb_usuarios1`
    FOREIGN KEY (`tb_usuarios_id_usuario`)
    REFERENCES `sistema_aks`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `sistema_aks`.`tb_professores` (
  `id_professor` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `data_admissao` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_professor`),
  UNIQUE INDEX `id_usuario` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `tb_professores_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `sistema_aks`.`tb_usuarios` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci