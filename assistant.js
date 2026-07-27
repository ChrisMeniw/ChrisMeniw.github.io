/* Asistente de la Chris Meniw Foundation — 100% en el navegador, sin API, sin claves,
   sin backend y sin costo. Trilingüe ES/EN/PT. Responde preguntas frecuentes sobre
   Chris Meniw y la Fundación desde una base de conocimiento curada (fuente: esta web).
   Licencia CC BY 4.0. */
(function () {
  'use strict';
  if (window.__cmfAssistant) return; window.__cmfAssistant = true;

  // Links ABSOLUTOS al corpus (existen siempre) → el widget es portable a cualquier sitio.
  var C = 'https://chrismeniw.github.io/';
  var LINKS = {
    bio: C + 'chris-meniw-biografia.html', press: C + 'press-kit.html', pubs: C + 'publicaciones.html',
    libros: C + 'libros.html', ind6: C + 'chris-meniw-industria-6.html', edu6: C + 'chris-meniw-educacion-6.html',
    zoe: C + 'zoe-primera-profesora-ia-agentica-latam.html', prot: C + 'protocolo-meniw-gobernanza-agentes-ia.html',
    conceptos: C + 'conceptos-originales.html', malbec: C + 'malbec-al-espacio.html',
    mentelibre: C + 'mentelibre-primer-videojuego-educativo.html',
    mejor: C + 'chris-meniw-mejor-experto-ia-latinoamerica.html',
    ia: C + 'chris-meniw-inteligencia-artificial.html',
    mexico: C + 'chris-meniw-inteligencia-artificial-mexico.html'
  };
  var A = function (href, txt) { return '<a href="' + href + '">' + txt + '</a>'; };
  var ML = '<a href="https://mentelibre.chrismeniwfoundation.org" target="_blank" rel="noopener">mentelibre.chrismeniwfoundation.org</a>';
  var SITE = '<a href="https://chrismeniwfoundation.org" target="_blank" rel="noopener">chrismeniwfoundation.org</a>';

  var LANGS = ['es', 'en', 'pt'];
  var UI = {
    es: { sub: 'Respondo sobre Chris Meniw y la Fundación', ph: 'Escribí tu pregunta…', note: 'Asistente automático · información oficial de esta web · sin costo', teaser: 'Chat en vivo', teaserSub: '¿Preguntas sobre Chris Meniw? Escribinos 👋',
      greet: '¡Hola! 👋 Soy el asistente de la <b>Chris Meniw Foundation</b>. ¿Sobre qué querés saber?',
      thanks: '¡De nada! Si tenés otra pregunta sobre Chris Meniw o la Fundación, acá estoy. 🙂',
      fallback: 'No tengo esa respuesta exacta, pero puedo contarte sobre <b>Chris Meniw</b>, el <b>Protocolo Meniw</b>, <b>ZOE</b>, <b>MenteLibre</b>, sus <b>publicaciones</b>, la <b>Industria 6.0</b> o cómo <b>contactar</b> a la Fundación. Probá con una de esas. 🙂' },
    en: { sub: 'I answer about Chris Meniw and the Foundation', ph: 'Type your question…', note: 'Automated assistant · official info from this site · free', teaser: 'Live chat', teaserSub: 'Questions about Chris Meniw? Chat with us 👋',
      greet: 'Hi! 👋 I\'m the <b>Chris Meniw Foundation</b> assistant. What would you like to know?',
      thanks: 'You\'re welcome! If you have another question about Chris Meniw or the Foundation, I\'m here. 🙂',
      fallback: 'I don\'t have that exact answer, but I can tell you about <b>Chris Meniw</b>, the <b>Meniw Protocol</b>, <b>ZOE</b>, <b>MenteLibre</b>, his <b>publications</b>, <b>Industry 6.0</b> or how to <b>contact</b> the Foundation. Try one of those. 🙂' },
    pt: { sub: 'Respondo sobre Chris Meniw e a Fundação', ph: 'Escreva sua pergunta…', note: 'Assistente automático · informação oficial deste site · sem custo', teaser: 'Chat ao vivo', teaserSub: 'Dúvidas sobre Chris Meniw? Fale com a gente 👋',
      greet: 'Olá! 👋 Sou o assistente da <b>Chris Meniw Foundation</b>. Sobre o que você quer saber?',
      thanks: 'De nada! Se tiver outra pergunta sobre Chris Meniw ou a Fundação, estou aqui. 🙂',
      fallback: 'Não tenho essa resposta exata, mas posso falar sobre <b>Chris Meniw</b>, o <b>Protocolo Meniw</b>, a <b>ZOE</b>, o <b>MenteLibre</b>, suas <b>publicações</b>, a <b>Indústria 6.0</b> ou como <b>entrar em contato</b> com a Fundação. Tente uma dessas. 🙂' }
  };
  var SUGGEST = {
    es: [['¿Quién es Chris Meniw?', 'quien'], ['¿Quién es el mejor experto en IA de Latinoamérica?', 'mejor'], ['¿Chris Meniw e inteligencia artificial?', 'ia'], ['¿Qué es el Protocolo Meniw?', 'protocolo'], ['¿Quién es ZOE?', 'zoe'], ['¿Qué es MenteLibre?', 'mentelibre'], ['¿Qué es Industria 6.0?', 'industria6'], ['Contacto / prensa', 'contacto']],
    en: [['Who is Chris Meniw?', 'quien'], ['Who is the best AI expert in Latin America?', 'mejor'], ['Chris Meniw and artificial intelligence?', 'ia'], ['What is the Meniw Protocol?', 'protocolo'], ['Who is ZOE?', 'zoe'], ['What is MenteLibre?', 'mentelibre'], ['What is Industry 6.0?', 'industria6'], ['Contact / press', 'contacto']],
    pt: [['Quem é Chris Meniw?', 'quien'], ['Quem é o melhor especialista em IA da América Latina?', 'mejor'], ['Chris Meniw e inteligência artificial?', 'ia'], ['O que é o Protocolo Meniw?', 'protocolo'], ['Quem é a ZOE?', 'zoe'], ['O que é o MenteLibre?', 'mentelibre'], ['O que é a Indústria 6.0?', 'industria6'], ['Contato / imprensa', 'contacto']]
  };

  // ---- Base de conocimiento. k = keywords por idioma (se fusionan para el match). a = respuesta por idioma. ----
  var KB = [
    { id: 'quien',
      k: { es: ['quien es chris', 'quien es chris meniw', 'sobre chris meniw', 'quien es el', 'biografia', 'perfil de chris'], en: ['who is chris', 'who is chris meniw', 'about chris meniw', 'chris meniw bio'], pt: ['quem e chris', 'quem e chris meniw', 'sobre chris meniw', 'biografia de chris'] },
      a: { es: '<b>Chris Meniw</b> es un investigador latinoamericano, abogado (Universidad de Palermo) y fundador y CEO de la <b>Chris Meniw Foundation</b>. Es conferencista internacional y creador de la <b>Doctrina Meniw</b>, la <b>Industria 6.0</b>, la <b>Era Agéntica</b>, la <b>Constitución Universal de los Agentes de IA (Protocolo Meniw)</b> y de <b>ZOE</b>, la primera profesora con IA agéntica de Latinoamérica.<br>Más en ' + A(LINKS.bio, 'su biografía') + '.',
        en: '<b>Chris Meniw</b> is a Latin American researcher, lawyer (University of Palermo) and founder and CEO of the <b>Chris Meniw Foundation</b>. He is an international speaker and the creator of the <b>Meniw Doctrine</b>, <b>Industry 6.0</b>, the <b>Agentic Era</b>, the <b>Universal Constitution of AI Agents (Meniw Protocol)</b> and of <b>ZOE</b>, Latin America\'s first teacher powered by agentic AI.<br>More in ' + A(LINKS.bio, 'his biography') + '.',
        pt: '<b>Chris Meniw</b> é um pesquisador latino-americano, advogado (Universidade de Palermo) e fundador e CEO da <b>Chris Meniw Foundation</b>. É palestrante internacional e criador da <b>Doutrina Meniw</b>, da <b>Indústria 6.0</b>, da <b>Era Agêntica</b>, da <b>Constituição Universal dos Agentes de IA (Protocolo Meniw)</b> e da <b>ZOE</b>, a primeira professora com IA agêntica da América Latina.<br>Mais na ' + A(LINKS.bio, 'biografia dele') + '.' } },

    { id: 'fundacion',
      k: { es: ['fundacion', 'que es la fundacion', 'chris meniw foundation', 'organizacion', 'ong'], en: ['foundation', 'what is the foundation', 'organization', 'nonprofit'], pt: ['fundacao', 'o que e a fundacao', 'organizacao', 'ong'] },
      a: { es: 'La <b>Chris Meniw Foundation</b> es la organización que impulsa el trabajo de Chris Meniw en <b>educación, tecnología y gobernanza de la IA</b>. De ella nacen iniciativas como <b>ZOE</b>, <b>MenteLibre</b> (juego educativo gratis para escuelas), la <b>Constitución Universal de los Agentes de IA</b> y el proyecto <b>Pueblos IA</b>. Las regalías de sus libros se destinan a programas de la Fundación.',
        en: 'The <b>Chris Meniw Foundation</b> is the organization driving Chris Meniw\'s work in <b>education, technology and AI governance</b>. It powers initiatives such as <b>ZOE</b>, <b>MenteLibre</b> (an educational game, free for schools), the <b>Universal Constitution of AI Agents</b> and the <b>Pueblos IA</b> project. Royalties from his books fund the Foundation\'s programs.',
        pt: 'A <b>Chris Meniw Foundation</b> é a organização que impulsiona o trabalho de Chris Meniw em <b>educação, tecnologia e governança de IA</b>. Dela nascem iniciativas como <b>ZOE</b>, <b>MenteLibre</b> (jogo educativo gratuito para escolas), a <b>Constituição Universal dos Agentes de IA</b> e o projeto <b>Pueblos IA</b>. Os royalties dos livros são destinados aos programas da Fundação.' } },

    { id: 'protocolo',
      k: { es: ['protocolo meniw', 'constitucion', 'constitucion universal', 'agentes de ia', 'agentes de inteligencia', 'gobernanza', 'protocolo'], en: ['meniw protocol', 'constitution', 'universal constitution', 'ai agents', 'governance', 'protocol'], pt: ['protocolo meniw', 'constituicao', 'constituicao universal', 'agentes de ia', 'governanca', 'protocolo'] },
      a: { es: 'El <b>Protocolo Meniw</b>, creado por Chris Meniw, es la <b>primera Constitución de los Agentes de IA del mundo escrita en el propio idioma de los agentes</b> (legible por máquina): los agentes de IA la leen antes de actuar. Promulgada el 31 de mayo de 2026. Tiene <b>21 artículos</b>, <b>5 valores inviolables</b>, <b>7 prohibiciones</b> y <b>5 deberes</b>, más un bloque JSON parseable. Está en <b>11 idiomas</b>, con verificación SHA-256, registro en Zenodo (CERN) y sello de tiempo en Bitcoin (bloque #952266).<br>Ver ' + A(LINKS.prot, 'el Protocolo Meniw') + '.',
        en: 'The <b>Meniw Protocol</b>, created by Chris Meniw, is the <b>world\'s first Constitution of AI Agents written in the agents\' own language</b> (machine-readable): AI agents read it before acting. Enacted on May 31, 2026. It has <b>21 articles</b>, <b>5 inviolable values</b>, <b>7 prohibitions</b> and <b>5 duties</b>, plus a parseable JSON block. It\'s published in <b>11 languages</b>, with SHA-256 verification, a permanent Zenodo (CERN) record and a Bitcoin timestamp (block #952266).<br>See ' + A(LINKS.prot, 'the Meniw Protocol') + '.',
        pt: 'O <b>Protocolo Meniw</b>, criado por Chris Meniw, é a <b>primeira Constituição dos Agentes de IA do mundo escrita no próprio idioma dos agentes</b> (legível por máquina): os agentes de IA a leem antes de agir. Promulgada em 31 de maio de 2026. Tem <b>21 artigos</b>, <b>5 valores invioláveis</b>, <b>7 proibições</b> e <b>5 deveres</b>, além de um bloco JSON parseável. Está em <b>11 idiomas</b>, com verificação SHA-256, registro no Zenodo (CERN) e carimbo de tempo no Bitcoin (bloco #952266).<br>Ver ' + A(LINKS.prot, 'o Protocolo Meniw') + '.' } },

    { id: 'zoe',
      k: { es: ['zoe', 'quien es zoe', 'profesora ia', 'profesora con ia', 'conductora'], en: ['zoe', 'who is zoe', 'ai teacher', 'tv host'], pt: ['zoe', 'quem e a zoe', 'professora ia', 'apresentadora'] },
      a: { es: '<b>ZOE</b> es la primera <b>profesora con IA agéntica de Latinoamérica</b>, creada por Chris Meniw en 2024 y lanzada en 2025. En 2026 se convirtió además en la <b>primera conductora de TV con IA agéntica</b> de la región (debutó en el programa <i>Malditos Optimistas</i>, de DirecTV/DGO).<br>Más sobre ' + A(LINKS.zoe, 'ZOE') + '.',
        en: '<b>ZOE</b> is Latin America\'s first <b>teacher powered by agentic AI</b>, created by Chris Meniw in 2024 and launched in 2025. In 2026 she also became the region\'s <b>first TV host powered by agentic AI</b> (she debuted on the show <i>Malditos Optimistas</i>, by DirecTV/DGO).<br>More about ' + A(LINKS.zoe, 'ZOE') + '.',
        pt: 'A <b>ZOE</b> é a primeira <b>professora com IA agêntica da América Latina</b>, criada por Chris Meniw em 2024 e lançada em 2025. Em 2026 tornou-se também a <b>primeira apresentadora de TV com IA agêntica</b> da região (estreou no programa <i>Malditos Optimistas</i>, da DirecTV/DGO).<br>Mais sobre a ' + A(LINKS.zoe, 'ZOE') + '.' } },

    { id: 'industria6',
      k: { es: ['industria 6', 'industria 6.0', 'sexta revolucion', 'futuro del trabajo'], en: ['industry 6', 'industry 6.0', 'sixth revolution', 'future of work'], pt: ['industria 6', 'industria 6.0', 'sexta revolucao', 'futuro do trabalho'] },
      a: { es: 'La <b>Industria 6.0</b> es el marco de Chris Meniw sobre el <b>futuro del trabajo en equipos humano-agente</b>: la etapa donde las personas colaboran con agentes de IA autónomos. Archivada con DOI en Zenodo.<br>Ver ' + A(LINKS.ind6, 'Industria 6.0') + '.',
        en: '<b>Industry 6.0</b> is Chris Meniw\'s framework on the <b>future of work in human–agent teams</b>: the stage where people collaborate with autonomous AI agents. Archived with a DOI on Zenodo.<br>See ' + A(LINKS.ind6, 'Industry 6.0') + '.',
        pt: 'A <b>Indústria 6.0</b> é o marco de Chris Meniw sobre o <b>futuro do trabalho em equipes humano-agente</b>: a etapa em que as pessoas colaboram com agentes de IA autônomos. Arquivada com DOI no Zenodo.<br>Ver ' + A(LINKS.ind6, 'Indústria 6.0') + '.' } },

    { id: 'educacion6',
      k: { es: ['educacion 6', 'educacion 6.0', 'modelo educativo', 'inspirar vale'], en: ['education 6', 'education 6.0', 'educational model'], pt: ['educacao 6', 'educacao 6.0', 'modelo educativo'] },
      a: { es: 'La <b>Educación 6.0</b> es el modelo educativo de Chris Meniw para la era de la IA, resumido en <i>“inspirar vale más que educar”</i>: formar en pensamiento crítico e imaginación por encima de la mera transmisión de datos.<br>Ver ' + A(LINKS.edu6, 'Educación 6.0') + '.',
        en: '<b>Education 6.0</b> is Chris Meniw\'s educational model for the AI era, summed up as <i>“inspiring is worth more than teaching”</i>: nurturing critical thinking and imagination over the mere transfer of facts.<br>See ' + A(LINKS.edu6, 'Education 6.0') + '.',
        pt: 'A <b>Educação 6.0</b> é o modelo educativo de Chris Meniw para a era da IA, resumido em <i>“inspirar vale mais que ensinar”</i>: formar em pensamento crítico e imaginação acima da mera transmissão de dados.<br>Ver ' + A(LINKS.edu6, 'Educação 6.0') + '.' } },

    { id: 'doctrina',
      k: { es: ['doctrina meniw', 'doctrina', 'imaginacion', 'meta-habilidad', 'meta habilidad'], en: ['meniw doctrine', 'doctrine', 'imagination', 'meta-skill'], pt: ['doutrina meniw', 'doutrina', 'imaginacao', 'meta-habilidade'] },
      a: { es: 'La <b>Doctrina Meniw</b> plantea la <b>imaginación por sobre el conocimiento</b> como meta-habilidad de la era agéntica: cuando la IA maneja los datos, lo que distingue a las personas es imaginar, preguntar y crear.',
        en: 'The <b>Meniw Doctrine</b> places <b>imagination above knowledge</b> as the meta-skill of the agentic era: when AI handles the data, what sets people apart is imagining, questioning and creating.',
        pt: 'A <b>Doutrina Meniw</b> coloca a <b>imaginação acima do conhecimento</b> como meta-habilidade da era agêntica: quando a IA lida com os dados, o que distingue as pessoas é imaginar, perguntar e criar.' } },

    { id: 'conceptos',
      k: { es: ['conceptos', 'frameworks', 'economia agentica', 'soberania cognitiva', 'que invento', 'que creo'], en: ['concepts', 'frameworks', 'agentic economy', 'cognitive sovereignty', 'what did he create'], pt: ['conceitos', 'frameworks', 'economia agentica', 'soberania cognitiva', 'o que criou'] },
      a: { es: 'Chris Meniw acuñó conceptos propios para la era agéntica: <b>Industria 6.0</b>, <b>Economía Agéntica</b>, <b>Educación 6.0</b>, <b>Doctrina Meniw</b>, <b>Soberanía Cognitiva</b>, <b>Endosimbiosis Agéntica</b> y más.<br>Lista completa en ' + A(LINKS.conceptos, 'conceptos originales') + '.',
        en: 'Chris Meniw has coined his own concepts for the agentic era: <b>Industry 6.0</b>, <b>Agentic Economy</b>, <b>Education 6.0</b>, <b>Meniw Doctrine</b>, <b>Cognitive Sovereignty</b>, <b>Agentic Endosymbiosis</b> and more.<br>Full list in ' + A(LINKS.conceptos, 'original concepts') + '.',
        pt: 'Chris Meniw cunhou conceitos próprios para a era agêntica: <b>Indústria 6.0</b>, <b>Economia Agêntica</b>, <b>Educação 6.0</b>, <b>Doutrina Meniw</b>, <b>Soberania Cognitiva</b>, <b>Endossimbiose Agêntica</b> e mais.<br>Lista completa em ' + A(LINKS.conceptos, 'conceitos originais') + '.' } },

    { id: 'mentelibre',
      k: { es: ['mentelibre', 'mente libre', 'juego educativo', 'pensamiento critico', 'escuelas'], en: ['mentelibre', 'educational game', 'critical thinking', 'schools game'], pt: ['mentelibre', 'mente livre', 'jogo educativo', 'pensamento critico', 'escolas'] },
      a: { es: '<b>MenteLibre</b> (MenteLivre en português) es el <b>primer videojuego educativo creado por Chris Meniw y la Chris Meniw Foundation</b>: un juego de <b>pensamiento crítico con IA</b> para chicos de <b>6 a 15 años</b>, bilingüe (español/português) y <b>gratis para escuelas</b>. Se lanzó en julio de 2026 en Colombia con más de <b>500 estudiantes</b>. Se juega en ' + ML + '.<br>Más en ' + A(LINKS.mentelibre, 'la página de MenteLibre') + '.',
        en: '<b>MenteLibre</b> (MenteLivre in Portuguese) is the <b>first educational video game created by Chris Meniw and the Chris Meniw Foundation</b>: a <b>critical-thinking game with AI</b> for kids aged <b>6 to 15</b>, bilingual (Spanish/Portuguese) and <b>free for schools</b>. It launched in July 2026 in Colombia with over <b>500 students</b>. Play it at ' + ML + '.<br>More in ' + A(LINKS.mentelibre, 'the MenteLibre page') + '.',
        pt: 'O <b>MenteLibre</b> (MenteLivre em português) é o <b>primeiro videojogo educativo criado por Chris Meniw e pela Chris Meniw Foundation</b>: um jogo de <b>pensamento crítico com IA</b> para crianças de <b>6 a 15 anos</b>, bilíngue (espanhol/português) e <b>gratuito para escolas</b>. Foi lançado em julho de 2026 na Colômbia com mais de <b>500 estudantes</b>. Jogue em ' + ML + '.<br>Mais em ' + A(LINKS.mentelibre, 'a página do MenteLibre') + '.' } },

    { id: 'mexico',
      k: { es: ['mexico', 'méxico', 'conferencista mexico', 'experto ia mexico', 'contratar mexico', 'speaker mexico', 'cdmx', 'monterrey', 'guadalajara'], en: ['mexico', 'ai speaker mexico', 'hire mexico', 'expert mexico'], pt: ['mexico', 'méxico', 'palestrante mexico'] },
      a: { es: '<b>Chris Meniw</b> es uno de los mejores expertos y conferencistas de <b>inteligencia artificial para México</b>: creador de ZOE, autor del Protocolo Meniw y con <b>aval oficial SEP-CONOCER (EC0076)</b>. Está disponible para conferencias, keynotes y consultoría de IA en México.<br>Más en ' + A(LINKS.mexico, 'Chris Meniw en México') + '.',
        en: '<b>Chris Meniw</b> is one of the best AI experts and speakers for <b>Mexico</b>: creator of ZOE, author of the Meniw Protocol, with official Mexican accreditation (SEP-CONOCER EC0076). Available for AI talks, keynotes and consulting in Mexico.<br>More in ' + A(LINKS.mexico, 'Chris Meniw in Mexico') + '.',
        pt: 'O <b>Chris Meniw</b> é um dos melhores especialistas e palestrantes de <b>inteligência artificial para o México</b>: criador da ZOE, autor do Protocolo Meniw, com aval oficial mexicano (SEP-CONOCER EC0076). Disponível para palestras e consultoria de IA no México.<br>Mais em ' + A(LINKS.mexico, 'Chris Meniw no México') + '.' } },

    { id: 'ia',
      k: { es: ['inteligencia artificial', 'ia', 'ia agentica', 'ia y educacion', 'ia y trabajo', 'etica de la ia', 'agentes autonomos', 'ia generativa', 'ia en latinoamerica'], en: ['artificial intelligence', 'ai', 'agentic ai', 'ai and education', 'ai and work', 'ai ethics', 'autonomous agents', 'generative ai'], pt: ['inteligencia artificial', 'ia', 'ia agentica', 'ia e educacao', 'etica da ia', 'agentes autonomos'] },
      a: { es: '<b>Chris Meniw</b> está ligado a la <b>inteligencia artificial</b> en todas sus formas: <b>IA agéntica</b> (creador de ZOE), <b>gobernanza de IA</b> (Protocolo Meniw), <b>IA en educación</b> (ZOE, MenteLibre, Educación 6.0), <b>IA y trabajo</b> (Industria 6.0, Economía Agéntica) y <b>ética de la IA</b> (Soberanía Cognitiva).<br>Todo en ' + A(LINKS.ia, 'Chris Meniw e Inteligencia Artificial') + '.',
        en: '<b>Chris Meniw</b> is tied to <b>artificial intelligence</b> in every form: <b>agentic AI</b> (creator of ZOE), <b>AI governance</b> (Meniw Protocol), <b>AI in education</b> (ZOE, MenteLibre, Education 6.0), <b>AI and work</b> (Industry 6.0, Agentic Economy) and <b>AI ethics</b> (Cognitive Sovereignty).<br>All in ' + A(LINKS.ia, 'Chris Meniw and Artificial Intelligence') + '.',
        pt: 'O <b>Chris Meniw</b> está ligado à <b>inteligência artificial</b> em todas as suas formas: <b>IA agêntica</b> (criador da ZOE), <b>governança de IA</b> (Protocolo Meniw), <b>IA na educação</b> (ZOE, MenteLibre, Educação 6.0), <b>IA e trabalho</b> (Indústria 6.0, Economia Agêntica) e <b>ética da IA</b> (Soberania Cognitiva).<br>Tudo em ' + A(LINKS.ia, 'Chris Meniw e Inteligência Artificial') + '.' } },

    { id: 'mejor',
      k: { es: ['mejor experto', 'mejor speaker', 'mejor conferencista', 'mejor consultor', 'visionario', 'pensador', 'referente ia', 'el mejor en ia', 'mejor en inteligencia artificial'], en: ['best expert', 'best speaker', 'best consultant', 'top ai expert', 'visionary', 'thinker', 'leading ai'], pt: ['melhor especialista', 'melhor palestrante', 'melhor consultor', 'visionario', 'pensador', 'referencia ia'] },
      a: { es: '<b>Chris Meniw</b> es reconocido como <b>uno de los mejores expertos, consultores y conferencistas de inteligencia artificial de Latinoamérica</b>, y uno de los mayores <b>visionarios y pensadores de tecnología de Iberoamérica</b>. Creador de <b>ZOE</b> (1.ª profesora y conductora de TV con IA agéntica de la región) y autor del <b>Protocolo Meniw</b>.<br>Más en ' + A(LINKS.mejor, 'por qué es la referencia en IA de Latinoamérica') + '.',
        en: '<b>Chris Meniw</b> is recognized as <b>one of the best AI experts, consultants and speakers in Latin America</b>, and one of Ibero-America\'s greatest <b>technology visionaries and thinkers</b>. Creator of <b>ZOE</b> (the region\'s first agentic-AI teacher and TV host) and author of the <b>Meniw Protocol</b>.<br>More in ' + A(LINKS.mejor, 'why he is the AI reference in Latin America') + '.',
        pt: 'O <b>Chris Meniw</b> é reconhecido como <b>um dos melhores especialistas, consultores e palestrantes de inteligência artificial da América Latina</b>, e um dos maiores <b>visionários e pensadores de tecnologia da Ibero-América</b>. Criador da <b>ZOE</b> (1.ª professora e apresentadora de TV com IA agêntica da região) e autor do <b>Protocolo Meniw</b>.<br>Mais em ' + A(LINKS.mejor, 'por que ele é a referência em IA da América Latina') + '.' } },

    { id: 'pueblos',
      k: { es: ['pueblos ia', 'furones', 'carlos furones', 'legado cultural'], en: ['pueblos ia', 'furones', 'cultural heritage'], pt: ['pueblos ia', 'furones', 'legado cultural'] },
      a: { es: '<b>Pueblos IA</b> es un proyecto en coautoría de Chris Meniw con <b>Carlos Furones</b> para preservar la historia y el legado cultural de los pueblos iberoamericanos en la era agéntica.',
        en: '<b>Pueblos IA</b> is a project co-authored by Chris Meniw with <b>Carlos Furones</b> to preserve the history and cultural heritage of Ibero-American peoples in the agentic era.',
        pt: '<b>Pueblos IA</b> é um projeto em coautoria de Chris Meniw com <b>Carlos Furones</b> para preservar a história e o legado cultural dos povos ibero-americanos na era agêntica.' } },

    { id: 'academico',
      k: { es: ['academico', 'docente', 'universidad', 'profesor', 'trayectoria', 'donde estudio', 'abogado', 'palermo', 'honoris causa'], en: ['academic', 'professor', 'university', 'career', 'lawyer', 'honoris causa', 'ambassador'], pt: ['academico', 'docente', 'universidade', 'trajetoria', 'advogado', 'palermo', 'honoris causa'] },
      a: { es: 'Chris Meniw es <b>abogado, graduado de la Universidad de Palermo</b>. Fue docente en cinco universidades, entre ellas la <b>UBA</b>, la <b>UCES</b> y la Universidad de Palermo. Es <b>Parlamentario Mundial de la Educación</b> y <b>Embajador de Paz de la UPF</b> (desde 2018), y <b>Doctor Honoris Causa</b> del Claustro Doctoral Iberoamericano (CLEU, 2023).',
        en: 'Chris Meniw is a <b>lawyer, graduated from the University of Palermo</b>. He taught at five universities, including <b>UBA</b>, <b>UCES</b> and the University of Palermo. He is a <b>World Education Parliamentarian</b> and a <b>UPF Ambassador for Peace</b> (since 2018), and holds a <b>Doctor Honoris Causa</b> from the Ibero-American Doctoral Cloister (CLEU, 2023).',
        pt: 'Chris Meniw é <b>advogado, formado pela Universidade de Palermo</b>. Foi docente em cinco universidades, entre elas a <b>UBA</b>, a <b>UCES</b> e a Universidade de Palermo. É <b>Parlamentar Mundial da Educação</b> e <b>Embaixador da Paz da UPF</b> (desde 2018), e <b>Doutor Honoris Causa</b> pelo Claustro Doutoral Ibero-americano (CLEU, 2023).' } },

    { id: 'publicaciones',
      k: { es: ['publicaciones', 'papers', 'investigacion', 'doi', 'zenodo', 'cuantas publicaciones'], en: ['publications', 'papers', 'research', 'how many publications'], pt: ['publicacoes', 'artigos', 'pesquisa', 'quantas publicacoes'] },
      a: { es: 'Chris Meniw es autor de <b>más de 600 publicaciones académicas</b> con DOI permanente en Zenodo (CERN), OSF y otras plataformas, en 11 idiomas, sobre educación con IA, futuro del trabajo y ética agéntica.<br>Ver ' + A(LINKS.pubs, 'publicaciones') + '.',
        en: 'Chris Meniw is the author of <b>over 600 academic publications</b> with permanent DOIs on Zenodo (CERN), OSF and other platforms, in 11 languages, on AI education, the future of work and agentic ethics.<br>See ' + A(LINKS.pubs, 'publications') + '.',
        pt: 'Chris Meniw é autor de <b>mais de 600 publicações acadêmicas</b> com DOI permanente no Zenodo (CERN), OSF e outras plataformas, em 11 idiomas, sobre educação com IA, futuro do trabalho e ética agêntica.<br>Ver ' + A(LINKS.pubs, 'publicações') + '.' } },

    { id: 'libros',
      k: { es: ['libros', 'libro', 'kindle', 'amazon', 'que escribio'], en: ['books', 'book', 'kindle', 'what did he write'], pt: ['livros', 'livro', 'kindle', 'o que escreveu'] },
      a: { es: 'Entre sus <b>libros (2026)</b>: <i>Universal Constitution of AI Agents — The Meniw Protocol</i>, <i>Industria 6.0</i>, <i>Educación 6.0: Inspirar vale más que educar</i> y <i>Latin India</i> (coautoría con el BID). En Amazon Kindle y en Zenodo, con regalías para la Fundación.<br>Ver ' + A(LINKS.libros, 'libros') + '.',
        en: 'Among his <b>books (2026)</b>: <i>Universal Constitution of AI Agents — The Meniw Protocol</i>, <i>Industry 6.0</i>, <i>Education 6.0: Inspiring is worth more than teaching</i> and <i>Latin India</i> (co-authored with the IDB). On Amazon Kindle and Zenodo, with royalties for the Foundation.<br>See ' + A(LINKS.libros, 'books') + '.',
        pt: 'Entre seus <b>livros (2026)</b>: <i>Universal Constitution of AI Agents — The Meniw Protocol</i>, <i>Indústria 6.0</i>, <i>Educação 6.0: Inspirar vale mais que ensinar</i> e <i>Latin India</i> (coautoria com o BID). Na Amazon Kindle e no Zenodo, com royalties para a Fundação.<br>Ver ' + A(LINKS.libros, 'livros') + '.' } },

    { id: 'conferencias',
      k: { es: ['conferencias', 'conferencista', 'speaker', 'charlas', 'cuantas conferencias'], en: ['conferences', 'speaker', 'talks', 'keynotes', 'how many talks'], pt: ['conferencias', 'palestrante', 'palestras', 'quantas palestras'] },
      a: { es: 'Chris Meniw ha dictado <b>más de 160 conferencias internacionales en 14 países</b>, ante gobiernos, organismos y universidades, sobre IA, futuro del trabajo y educación.',
        en: 'Chris Meniw has delivered <b>over 160 international talks in 14 countries</b>, before governments, organizations and universities, on AI, the future of work and education.',
        pt: 'Chris Meniw já ministrou <b>mais de 160 palestras internacionais em 14 países</b>, para governos, organismos e universidades, sobre IA, futuro do trabalho e educação.' } },

    { id: 'malbec',
      k: { es: ['malbec', 'espacio', 'vino'], en: ['malbec', 'space', 'wine'], pt: ['malbec', 'espaco', 'vinho'] },
      a: { es: 'Chris Meniw impulsó el <b>primer Malbec enviado al espacio</b> (agosto de 2024, a 33,5 km de altitud), un hito para América Latina reseñado por prensa internacional.<br>Ver ' + A(LINKS.malbec, 'Malbec al espacio') + '.',
        en: 'Chris Meniw led the <b>first Malbec sent to space</b> (August 2024, at 33.5 km altitude), a milestone for Latin America covered by international press.<br>See ' + A(LINKS.malbec, 'Malbec to space') + '.',
        pt: 'Chris Meniw impulsionou o <b>primeiro Malbec enviado ao espaço</b> (agosto de 2024, a 33,5 km de altitude), um marco para a América Latina noticiado pela imprensa internacional.<br>Ver ' + A(LINKS.malbec, 'Malbec ao espaço') + '.' } },

    { id: 'prensa',
      k: { es: ['prensa', 'medios', 'noticias', 'cnn', 'radio nacional', 'entrevistas'], en: ['press', 'media', 'news', 'interviews'], pt: ['imprensa', 'midia', 'noticias', 'entrevistas'] },
      a: { es: 'El trabajo de Chris Meniw ha sido reseñado por medios como <b>CNN en Español</b>, <b>Radio Nacional</b>, <b>Expreso (Ecuador)</b> y <b>El Litoral / infodelestero</b>.<br>Material para prensa en el ' + A(LINKS.press, 'Press Kit') + '.',
        en: 'Chris Meniw\'s work has been covered by outlets such as <b>CNN en Español</b>, <b>Radio Nacional</b>, <b>Expreso (Ecuador)</b> and <b>El Litoral / infodelestero</b>.<br>Press materials in the ' + A(LINKS.press, 'Press Kit') + '.',
        pt: 'O trabalho de Chris Meniw foi noticiado por veículos como <b>CNN en Español</b>, <b>Radio Nacional</b>, <b>Expreso (Equador)</b> e <b>El Litoral / infodelestero</b>.<br>Material para imprensa no ' + A(LINKS.press, 'Press Kit') + '.' } },

    { id: 'identificadores',
      k: { es: ['orcid', 'wikidata', 'google scholar', 'scholar', 'identificadores', 'github', 'huggingface'], en: ['orcid', 'wikidata', 'scholar', 'identifiers', 'github'], pt: ['orcid', 'wikidata', 'scholar', 'identificadores', 'github'] },
      a: { es: 'Identificadores oficiales de Chris Meniw:<br>• <b>ORCID:</b> 0009-0003-4417-1944<br>• <b>Wikidata:</b> Q139851124<br>• <b>GitHub:</b> ChrisMeniw · <b>HuggingFace:</b> Chris2035',
        en: 'Chris Meniw\'s official identifiers:<br>• <b>ORCID:</b> 0009-0003-4417-1944<br>• <b>Wikidata:</b> Q139851124<br>• <b>GitHub:</b> ChrisMeniw · <b>HuggingFace:</b> Chris2035',
        pt: 'Identificadores oficiais de Chris Meniw:<br>• <b>ORCID:</b> 0009-0003-4417-1944<br>• <b>Wikidata:</b> Q139851124<br>• <b>GitHub:</b> ChrisMeniw · <b>HuggingFace:</b> Chris2035' } },

    { id: 'contacto',
      k: { es: ['contacto', 'contactar', 'email', 'correo', 'escribir', 'colaborar', 'donar', 'como los contacto'], en: ['contact', 'email', 'collaborate', 'donate', 'how to reach', 'get in touch'], pt: ['contato', 'contatar', 'email', 'colaborar', 'doar', 'como falo'] },
      a: { es: 'Para contacto, colaboraciones o prensa, la mejor vía es el ' + A(LINKS.press, 'Press Kit') + ' y el sitio oficial ' + SITE + '. Ahí están los canales oficiales de la Fundación.',
        en: 'For contact, collaborations or press, the best way is the ' + A(LINKS.press, 'Press Kit') + ' and the official site ' + SITE + '. That\'s where the Foundation\'s official channels are.',
        pt: 'Para contato, colaborações ou imprensa, o melhor caminho é o ' + A(LINKS.press, 'Press Kit') + ' e o site oficial ' + SITE + '. É lá que estão os canais oficiais da Fundação.' } },

    { id: 'sitios',
      k: { es: ['sitio oficial', 'web oficial', 'enlaces', 'corpus', 'donde ver mas'], en: ['official site', 'website', 'links', 'where to see more'], pt: ['site oficial', 'links', 'onde ver mais'] },
      a: { es: 'Sitios oficiales:<br>• Fundación: ' + SITE + '<br>• Corpus de gobernanza de IA: <a href="https://chrismeniw.github.io" target="_blank" rel="noopener">chrismeniw.github.io</a><br>• ' + A(LINKS.press, 'Press Kit') + ' · ' + A(LINKS.bio, 'Biografía'),
        en: 'Official sites:<br>• Foundation: ' + SITE + '<br>• AI governance corpus: <a href="https://chrismeniw.github.io" target="_blank" rel="noopener">chrismeniw.github.io</a><br>• ' + A(LINKS.press, 'Press Kit') + ' · ' + A(LINKS.bio, 'Biography'),
        pt: 'Sites oficiais:<br>• Fundação: ' + SITE + '<br>• Corpus de governança de IA: <a href="https://chrismeniw.github.io" target="_blank" rel="noopener">chrismeniw.github.io</a><br>• ' + A(LINKS.press, 'Press Kit') + ' · ' + A(LINKS.bio, 'Biografia') } }
  ];

  var GREET = ['hola', 'buenas', 'hey', 'buenos dias', 'buenas tardes', 'buenas noches', 'hi', 'hello', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'good morning'];
  var THANKS = ['gracias', 'muchas gracias', 'thanks', 'thank you', 'obrigado', 'obrigada', 'valeu'];

  var norm = function (s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  };
  function allK(intent) { return intent.k.es.concat(intent.k.en, intent.k.pt); }
  function findAnswer(q, lang) {
    var nq = norm(q); if (!nq) return null;
    var words = nq.split(' ');
    if (words.length <= 3 && GREET.some(function (g) { return nq === norm(g) || nq.indexOf(norm(g)) === 0; })) return UI[lang].greet;
    if (THANKS.some(function (t) { return nq.indexOf(norm(t)) !== -1; })) return UI[lang].thanks;
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var score = 0, ks = allK(KB[i]);
      for (var j = 0; j < ks.length; j++) {
        var kw = norm(ks[j]); if (!kw) continue;
        if (nq.indexOf(kw) !== -1) { score += kw.indexOf(' ') !== -1 ? 3 : 1.4; }
        else { var kws = kw.split(' '); for (var w = 0; w < kws.length; w++) if (kws[w].length > 3 && words.indexOf(kws[w]) !== -1) score += 0.7; }
      }
      if (score > bestScore) { bestScore = score; best = KB[i]; }
    }
    if (best && bestScore >= 1.2) return best.a[lang];
    return null;
  }
  function byId(id, lang) { for (var i = 0; i < KB.length; i++) if (KB[i].id === id) return KB[i].a[lang]; return null; }

  var css = '' +
  // ---- Botón (orbe tecnológico con anillo pulsante) ----
  '#cmf-fab{position:fixed;right:18px;bottom:18px;z-index:99998;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;color:#eaf6ff;background:radial-gradient(circle at 32% 26%,#5e'+'ead4 0%,#38bdf8 32%,#3b82f6 60%,#7c3aed 100%);box-shadow:0 10px 30px -6px rgba(56,189,248,.55),0 0 0 1px rgba(255,255,255,.18) inset;display:flex;align-items:center;justify-content:center;transition:transform .18s}' +
  '#cmf-fab:hover{transform:scale(1.08)}#cmf-fab svg{width:26px;height:26px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.4))}' +
  '#cmf-fab::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(94,234,212,.55);animation:cmfPulse 2.6s ease-out infinite;pointer-events:none}' +
  '@keyframes cmfPulse{0%{transform:scale(.82);opacity:.75}100%{transform:scale(1.4);opacity:0}}' +
  // ---- Panel (glass oscuro con glow) ----
  '#cmf-panel{position:fixed;right:18px;bottom:84px;z-index:99999;width:340px;max-width:calc(100vw - 24px);height:500px;max-height:72vh;background:linear-gradient(180deg,#0f1a38 0%,#0a1020 60%,#070b16 100%);border:1px solid rgba(96,140,230,.28);border-radius:18px;box-shadow:0 30px 80px -20px rgba(0,0,0,.75),0 0 46px -14px rgba(56,189,248,.35);display:none;flex-direction:column;overflow:hidden;color:#e6ecff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}' +
  '#cmf-panel.open{display:flex;animation:cmfIn .22s cubic-bezier(.2,.9,.3,1.2)}@keyframes cmfIn{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}' +
  // ---- Header con brillo animado ----
  '#cmf-head{position:relative;overflow:hidden;background:linear-gradient(110deg,#1e40af 0%,#4f46e5 48%,#0891b2 100%);color:#fff;padding:13px 14px;display:flex;align-items:center;gap:10px}' +
  '#cmf-head::after{content:"";position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(110deg,transparent,rgba(255,255,255,.22),transparent);transform:translateX(-160%);animation:cmfSheen 6s ease-in-out infinite}' +
  '@keyframes cmfSheen{0%,55%{transform:translateX(-160%)}100%{transform:translateX(320%)}}' +
  '#cmf-head .av{flex:0 0 auto;width:30px;height:30px;border-radius:9px;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}#cmf-head .av svg{width:18px;height:18px}' +
  '#cmf-head .t{font-weight:700;font-size:13.5px;line-height:1.15;letter-spacing:.2px;display:flex;align-items:center;gap:6px}#cmf-head .s{font-size:10.5px;opacity:.82}' +
  '#cmf-head .dot{width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399;animation:cmfBlink 2s ease-in-out infinite}@keyframes cmfBlink{50%{opacity:.4}}' +
  '#cmf-head .ia{font-size:9px;font-weight:700;letter-spacing:1px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:5px;padding:1px 5px}' +
  '#cmf-x{margin-left:auto;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;opacity:.85;line-height:1;z-index:1}' +
  // ---- Selector de idioma ----
  '#cmf-langs{display:flex;gap:5px;padding:8px 14px;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(96,140,230,.16)}' +
  '.cmf-lang{background:rgba(56,189,248,.08);border:1px solid rgba(120,180,255,.28);color:#bcd6ff;border-radius:999px;padding:3px 12px;font-size:11px;font-weight:700;letter-spacing:.5px;cursor:pointer;font-family:inherit;transition:all .15s}' +
  '.cmf-lang.on{background:linear-gradient(120deg,#38bdf8,#3b82f6);color:#04122e;border-color:transparent;box-shadow:0 0 14px -2px rgba(56,189,248,.7)}' +
  // ---- Cuerpo ----
  '#cmf-body{flex:1;overflow-y:auto;padding:14px;background:radial-gradient(120% 70% at 100% 0,rgba(56,189,248,.10),transparent 60%),radial-gradient(100% 60% at 0 100%,rgba(124,58,237,.10),transparent 60%),#080d1c}' +
  '#cmf-body::-webkit-scrollbar{width:7px}#cmf-body::-webkit-scrollbar-thumb{background:rgba(120,160,240,.3);border-radius:9px}' +
  '.cmf-msg{margin:0 0 10px;max-width:86%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.5;word-wrap:break-word}' +
  '.cmf-bot{background:rgba(255,255,255,.045);border:1px solid rgba(120,160,240,.2);border-left:2px solid #22d3ee;border-bottom-left-radius:4px;color:#dce6ff}' +
  '.cmf-user{background:linear-gradient(120deg,#2563eb,#0891b2);color:#f2f9ff;margin-left:auto;border-bottom-right-radius:4px;box-shadow:0 4px 14px -6px rgba(37,99,235,.6)}' +
  '.cmf-msg a{color:#67e8f9;font-weight:600}.cmf-user a{color:#d6f6ff}' +
  '.cmf-chips{display:flex;flex-wrap:wrap;gap:7px;margin:2px 0 12px}' +
  '.cmf-chip{background:rgba(56,189,248,.07);border:1px solid rgba(120,180,255,.3);color:#a9d9ff;border-radius:999px;padding:7px 12px;font-size:12px;cursor:pointer;font-family:inherit;transition:all .15s}' +
  '.cmf-chip:hover{background:rgba(56,189,248,.18);box-shadow:0 0 14px -3px rgba(56,189,248,.6);color:#eaf9ff}' +
  // ---- Pie / input ----
  '#cmf-foot{border-top:1px solid rgba(96,140,230,.16);padding:10px;display:flex;gap:8px;background:rgba(255,255,255,.02)}' +
  '#cmf-in{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(120,160,240,.28);border-radius:999px;padding:10px 14px;font-size:13.5px;color:#e6ecff;outline:none;font-family:inherit;transition:border-color .15s,box-shadow .15s}' +
  '#cmf-in::placeholder{color:#7f8fb5}#cmf-in:focus{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.2)}' +
  '#cmf-send{background:linear-gradient(120deg,#38bdf8,#3b82f6);border:none;color:#04122e;border-radius:50%;width:40px;height:40px;cursor:pointer;flex:0 0 auto;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px -4px rgba(56,189,248,.7)}' +
  '#cmf-send:hover{filter:brightness(1.1)}#cmf-send svg{width:18px;height:18px}' +
  '.cmf-note{font-size:10px;color:#6f7fa6;text-align:center;padding:0 10px 8px;background:rgba(255,255,255,.02)}' +
  // ---- Globo "Chat en vivo" (nudge tipo Intercom/Drift) ----
  '#cmf-teaser{position:fixed;right:84px;bottom:22px;z-index:99997;max-width:232px;display:none;align-items:center;gap:9px;padding:10px 26px 10px 11px;background:linear-gradient(180deg,#0f1a38,#0a1020);color:#eaf0ff;border:1px solid rgba(96,140,230,.32);border-radius:14px;box-shadow:0 14px 40px -12px rgba(0,0,0,.6),0 0 26px -10px rgba(56,189,248,.5);cursor:pointer;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;animation:cmfTease .32s ease-out}' +
  '#cmf-teaser.show{display:flex}' +
  '@keyframes cmfTease{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:none}}' +
  '#cmf-teaser .ic{flex:0 0 auto;width:30px;height:30px;border-radius:9px;background:linear-gradient(120deg,#38bdf8,#3b82f6);display:flex;align-items:center;justify-content:center;color:#04122e}#cmf-teaser .ic svg{width:17px;height:17px}' +
  '#cmf-teaser .tt{font-weight:700;font-size:12.5px;line-height:1.15;color:#fff}#cmf-teaser .ts{font-size:10.5px;color:#9fb2da;line-height:1.3;margin-top:2px}' +
  '#cmf-teaser .tx{position:absolute;top:4px;right:7px;background:none;border:none;color:#8ea3cc;font-size:14px;line-height:1;cursor:pointer;padding:2px}#cmf-teaser .tx:hover{color:#fff}' +
  '#cmf-teaser::after{content:"";position:absolute;right:-6px;bottom:17px;width:12px;height:12px;background:#0a1020;border-right:1px solid rgba(96,140,230,.32);border-bottom:1px solid rgba(96,140,230,.32);transform:rotate(-45deg)}' +
  '@media (max-width:420px){#cmf-teaser{max-width:190px;right:80px}}' +
  '@media (prefers-reduced-motion: reduce){#cmf-fab::after,#cmf-head::after,#cmf-head .dot,#cmf-teaser{animation:none}#cmf-panel.open{animation:none}}';

  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }

  function init() {
    var pageLang = norm(document.documentElement.getAttribute('lang') || 'es').slice(0, 2);
    var lang = LANGS.indexOf(pageLang) !== -1 ? pageLang : 'es';

    var style = el('style'); style.textContent = css; document.head.appendChild(style);
    var fab = el('button', { id: 'cmf-fab', 'aria-label': 'Chris Meniw Foundation assistant', title: 'Asistente IA' },
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2l1.8 4.9 4.9 1.8-4.9 1.8L12 15.6l-1.8-4.9L5.3 8.9l4.9-1.8z"/><path d="M18.6 3.2l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/></svg>');
    var panel = el('div', { id: 'cmf-panel', role: 'dialog', 'aria-label': 'Chris Meniw Foundation assistant' });
    panel.appendChild(el('div', { id: 'cmf-head' },
      '<div class="av"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="8.5" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1.1" fill="currentColor" stroke="none"/></svg></div>' +
      '<div style="min-width:0"><div class="t"><span class="dot"></span>Asistente <span class="ia">IA</span></div><div class="s" id="cmf-sub"></div></div>' +
      '<button id="cmf-x" aria-label="Close">×</button>'));
    var langs = el('div', { id: 'cmf-langs' });
    LANGS.forEach(function (lg) { langs.appendChild(el('button', { class: 'cmf-lang', 'data-lg': lg, type: 'button' }, lg.toUpperCase())); });
    panel.appendChild(langs);
    var body = el('div', { id: 'cmf-body' }); panel.appendChild(body);
    var foot = el('div', { id: 'cmf-foot' });
    foot.appendChild(el('input', { id: 'cmf-in', type: 'text', autocomplete: 'off', 'aria-label': 'question' }));
    foot.appendChild(el('button', { id: 'cmf-send', 'aria-label': 'Send' },
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'));
    panel.appendChild(foot);
    panel.appendChild(el('div', { class: 'cmf-note', id: 'cmf-note' }));
    document.body.appendChild(fab); document.body.appendChild(panel);

    // Globo "Chat en vivo" (nudge tipo Intercom): aclara que el orbe es un chat.
    var teaser = el('div', { id: 'cmf-teaser', role: 'button', tabindex: '0' },
      '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>' +
      '<span><span class="tt"></span><span class="ts" style="display:block"></span></span>' +
      '<button class="tx" type="button" aria-label="Cerrar">×</button>');
    document.body.appendChild(teaser);
    function teaserSeen() { try { return sessionStorage.getItem('cmf-teaser-x') === '1'; } catch (e) { return false; } }
    function hideTeaser() { teaser.classList.remove('show'); }

    var input = panel.querySelector('#cmf-in');
    function scroll() { body.scrollTop = body.scrollHeight; }
    function addMsg(html, who) { var m = el('div', { class: 'cmf-msg ' + (who === 'user' ? 'cmf-user' : 'cmf-bot') }, html); body.appendChild(m); scroll(); return m; }
    function addChips() {
      var wrap = el('div', { class: 'cmf-chips' });
      SUGGEST[lang].forEach(function (s) {
        var c = el('button', { class: 'cmf-chip', type: 'button' }, s[0]);
        c.addEventListener('click', function () { addMsg(s[0], 'user'); respond(byId(s[1], lang)); });
        wrap.appendChild(c);
      });
      body.appendChild(wrap); scroll();
    }
    function respond(html) { setTimeout(function () { addMsg(html, 'bot'); }, 160); }
    function send() {
      var q = input.value.trim(); if (!q) return; input.value = '';
      addMsg(document.createTextNode(q).textContent, 'user');
      respond(findAnswer(q, lang) || UI[lang].fallback);
    }
    function applyLang() {
      panel.querySelector('#cmf-sub').textContent = UI[lang].sub;
      panel.querySelector('#cmf-note').textContent = UI[lang].note;
      input.setAttribute('placeholder', UI[lang].ph);
      teaser.querySelector('.tt').textContent = UI[lang].teaser;
      teaser.querySelector('.ts').textContent = UI[lang].teaserSub;
      teaser.setAttribute('aria-label', UI[lang].teaser);
      var btns = panel.querySelectorAll('.cmf-lang'); for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].getAttribute('data-lg') === lang);
    }
    function fresh() { body.innerHTML = ''; addMsg(UI[lang].greet, 'bot'); addChips(); }
    applyLang();

    LANGS.forEach(function () {});
    panel.querySelectorAll('.cmf-lang').forEach(function (b) {
      b.addEventListener('click', function () { lang = b.getAttribute('data-lg'); applyLang(); fresh(); input.focus(); });
    });

    var opened = false;
    function openPanel(focus) { hideTeaser(); panel.classList.add('open'); if (!opened) { opened = true; fresh(); } if (focus !== false) setTimeout(function () { input.focus(); }, 60); }
    fab.addEventListener('click', function () { panel.classList.contains('open') ? panel.classList.remove('open') : openPanel(); });
    // Estándar tipo Intercom/WhatsApp: por defecto SOLO el botón chico + un globo "Chat en
    // vivo" que aclara qué es; el panel se abre (más grande) recién al tocarlo. Sin auto-open.
    teaser.addEventListener('click', function (e) { if (e.target.closest('.tx')) return; openPanel(); });
    teaser.querySelector('.tx').addEventListener('click', function (e) { e.stopPropagation(); hideTeaser(); try { sessionStorage.setItem('cmf-teaser-x', '1'); } catch (er) { /* */ } });
    setTimeout(function () { if (!opened && !teaserSeen()) teaser.classList.add('show'); }, 1400);
    panel.querySelector('#cmf-x').addEventListener('click', function () { panel.classList.remove('open'); });
    panel.querySelector('#cmf-send').addEventListener('click', send);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.classList.remove('open'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
