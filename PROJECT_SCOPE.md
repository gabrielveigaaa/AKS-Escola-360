**Personas (descreva quem usará a aplicação)**
Secretarias escolares: 
Emissão de documentos oficiais (histórico, declarações), matrícula e transferências.
Coordenação pedagógica/Direção: consolidação de notas e faltas, relatórios de desempenho e frequência, calendários.

**Professores:**
lançamento de notas e presenças, comunicação com responsáveis.

Responsáveis/Alunos: consulta de boletins, histórico, avisos e calendário escolar.

Mantenedora/Órgãos de controle: exportação de dados e conformidade com exigências legais (INEP/SEDUC). 

**Qual problema a funcionalidade/aplicação irá resolver?**
Hoje, muitas escolas pequenas e médias usam planilhas e processos manuais para notas, faltas, históricos e documentos, o que gera erros, retrabalho, atrasos e dificulta a conformidade legal. Falta um sistema simples e integrado que padronize 
registros, emita documentos oficiais rapidamente e melhore a comunicação com 
responsáveis. 

**Como você imagina que a funcionalidade/aplicação resolverá o(s) problema(s) citado(s)?**

O Escola360 será um web app modular (backend + frontend) que centraliza cadastros (alunos, turmas, disciplinas), permite lançamento de notas e presenças, gera histórico e boletim em PDF com QR de verificação, e inclui mural/avisos para responsáveis. Perfis e permissões por papel, trilhas de auditoria e exportações (CSV/PDF) garantem segurança, transparência e conformidade. 
A arquitetura facilitará integrações futuras (ex.: SEDUC/INEP). 

**Cite funcionalidades que você considera essenciais para essa aplicação (mínimo de 3, com nome e descrição da funcionalidade):**

***Cadastro e Matrícula:***
CRUD de alunos, turmas, disciplinas e vínculos; importação por planilha.

***Diário de Classe:***
Lançamento de notas e presenças por bimestre/etapa com validações.

***Boletim e Histórico PDF:***
Geração automática de boletim e histórico assinado digitalmente com QR para 
validação.

***Comunicação com Responsáveis:***
Mural de avisos e mensagens segmentadas por turma/série; confirmação de leitura.

***Relatórios e Exportações:***
Desempenho por turma/disciplina, frequência, rankings e exportação CSV/PDF.

***Perfis e Permissões (LGPD):***
Acesso por papel (admin, professor, coordenação, responsável) e trilhas de auditoria.

***Calendário Escolar:***
Feriados, avaliações e eventos; lembretes automáticos para responsáveis.

***Assinatura Digital:*** 
Integração com certificado (ICP-Brasil/servidor) para validade jurídica dos documentos.