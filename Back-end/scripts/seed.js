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

    // --- disciplinas (área de Tecnologia)
    const disciplinasList = [
      'Algoritmos e Lógica de Programação',
      'Estruturas de Dados',
      'Banco de Dados',
      'Desenvolvimento Web',
      'Programação em JavaScript',
      'DevOps',
      'Redes de Computadores',
      'Segurança da Informação',
      'Inteligência Artificial',
      'Desenvolvimento Mobile',
      'UX/UI'
    ]
    const disciplinaMap = {}
    for(const nome of disciplinasList){
      const [d] = await db.Disciplina.findOrCreate({ where:{ nome }, defaults:{ nome, carga_horaria: 60 }, transaction: t })
      disciplinaMap[nome] = d
    }

    // --- turmas (uma ou duas por curso)
    const cursos = ['Desenvolvimento Web','Desenvolvimento Mobile','Redes de Computadores','Segurança da Informação','Inteligência Artificial','DevOps']
    const turnos = ['MANHA','TARDE','NOITE']
    const turmas = []
    let turnoIdx = 0
    for(const curso of cursos){
      for(const sufixo of ['A','B']){
        const nome = curso + ' — Turma ' + sufixo
        const ano = 2026
        const turno = turnos[turnoIdx % turnos.length]
        turnoIdx++
        const [tm] = await db.Turma.findOrCreate({ where:{ nome, ano_letivo: ano }, defaults:{ nome, ano_letivo: ano, turno, ativa:true }, transaction: t })
        turmas.push(tm)
      }
    }

    // --- vincular turma-disciplinas: para cada turma, escolher 4-6 disciplinas aleatórias e atribuir um professor existente
    const profs = await db.Professor.findAll({ transaction: t })
    const professorIds = profs.map(p => p.id_professor)
    function randChoice(arr){ return arr[Math.floor(Math.random()*arr.length)] }
    const disciplinaObjs = Object.values(disciplinaMap)
    if(professorIds.length === 0){ console.warn('Nenhum professor encontrado — pulando vinculação de turma-disciplinas') }
    for(const tm of turmas){
      // pick 4..6 unique disciplines
      const count = Math.min(disciplinaObjs.length, 4 + Math.floor(Math.random()*3))
      const chosen = []
      while(chosen.length < count){
        const cand = randChoice(disciplinaObjs)
        if(!chosen.includes(cand)) chosen.push(cand)
      }
      for(const d of chosen){
        const profId = (professorIds.length>0) ? randChoice(professorIds) : null
        if(!profId) continue
        await db.TurmaDisciplina.findOrCreate({ where:{ id_turma: tm.id_turma, id_disciplina: d.id_disciplina }, defaults:{ id_turma: tm.id_turma, id_disciplina: d.id_disciplina, id_professor: profId }, transaction: t })
      }
    }

    await t.commit();
    console.log('Seed completa — disciplinas, turmas e vinculações adicionadas');
    process.exit(0);
  }catch(e){ await t.rollback(); console.error(e); process.exit(1) }
}
run();