// Back-end/scripts/seed.js
// Uses @faker-js/faker; compatible with multiple faker API shapes via fallbacks
const { faker: fakerPkg } = require('@faker-js/faker');
const faker = fakerPkg || (globalThis && globalThis.faker) || null
const db = require('../src/models');
async function run(){
  await db.sequelize.authenticate();
  const t = await db.sequelize.transaction();
  try{
    // perfis
    const perfis = ['ADMIN','ALUNO','PROFESSOR','RESPONSAVEL','USUARIO'];
    for(const nome of perfis) await db.Perfil.findOrCreate({ where:{ nome }, defaults:{ nome }, transaction: t });

    // usuário padrão (idempotente)
    const [u] = await db.Usuario.findOrCreate({
      where: { email: 'secretaria@grupoaks.com.br' },
      defaults: { nome:'Grupo AKS Educacional', email:'secretaria@grupoaks.com.br', cpf:'12345678910', rg:'1122334455667788-99', senha_hash: '...' },
      transaction: t
    });

    // gerar amostra: usuarios + alunos
    for(let i=0;i<50;i++){
      // name fallback (v8 uses faker.person.fullName())
      const nome = (faker && (faker.person && faker.person.fullName) ? faker.person.fullName() : (faker && faker.name && faker.name.findName ? faker.name.findName() : ('Usuario ' + (i+1))))
      const email = (faker && faker.internet && faker.internet.email ? faker.internet.email().toLowerCase() : (('user' + (i+1) + '@example.com')))
      const usuario = await db.Usuario.create({ nome, email, senha_hash: '...', ativo:true }, { transaction: t });
      if(i<30){
        // data_nascimento fallback
        let dt = null
        try{
          if(faker && faker.date && faker.date.past) dt = (typeof faker.date.past === 'function') ? (faker.date.past(18)) : null
        }catch(e){}
        await db.Aluno.create({ id_usuario: usuario.id_usuario, data_nascimento: dt }, { transaction: t });
      } else {
        let dt = null
        try{
          if(faker && faker.date && faker.date.past) dt = (typeof faker.date.past === 'function') ? (faker.date.past(5)) : null
        }catch(e){}
        await db.Professor.create({ id_usuario: usuario.id_usuario, data_admissao: dt }, { transaction: t });
      }
    }

    await t.commit();
    console.log('Seed completa');
    process.exit(0);
  }catch(e){ await t.rollback(); console.error(e); process.exit(1) }
}
run();