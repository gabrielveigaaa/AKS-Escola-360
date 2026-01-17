1. O sql a seguir foi o que nós decidimos alterar no modelo que já tinhamos.

CREATE TABLE IF NOT EXISTS `tb_endereco` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `cep` VARCHAR(9) NULL,
  `logradouro` VARCHAR(100) NULL,
  `complemento` VARCHAR(45) NULL,
  `numero` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NULL,
  `uf` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `tb_usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_endereco`),
  INDEX `fk_tb_endereco_tb_usuarios_idx` (`tb_usuarios_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_tb_endereco_tb_usuarios`
    FOREIGN KEY (`tb_usuarios_id_usuario`)
    REFERENCES `sistema_aks`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `tb_responsaveis` (
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


2. Precisamos criar as features necessária na nossa api para comportar estas mudanças e deixá-las acessíveis para consultas http à noss api.

3. Precisamos atualizar nosso frontend com estas informações.
