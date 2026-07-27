/* Asistente de la Chris Meniw Foundation — 100% en el navegador, sin API, sin claves,
   sin backend y sin costo. Trilingüe ES/EN/PT. Responde preguntas frecuentes sobre
   Chris Meniw y la Fundación desde una base de conocimiento curada (fuente: esta web).
   Licencia CC BY 4.0. */
(function () {
  'use strict';
  if (window.__cmfAssistant) return; window.__cmfAssistant = true;

  var LINKS = {
    bio: 'chris-meniw-biografia.html', press: 'press-kit.html', pubs: 'publicaciones.html',
    libros: 'libros.html', ind6: 'chris-meniw-industria-6.html', edu6: 'chris-meniw-educacion-6.html',
    zoe: 'zoe-primera-profesora-ia-agentica-latam.html', prot: 'protocolo-meniw-gobernanza-agentes-ia.html',
    conceptos: 'conceptos-originales.html', malbec: 'malbec-al-espacio.html'
  };
  var A = function (href, txt) { return '<a href="' + href + '">' + txt + '</a>'; };
  var ML = '<a href="https://mentelibre.chrismeniwfoundation.org" target="_blank" rel="noopener">mentelibre.chrismeniwfoundation.org</a>';
  var SITE = '<a href="https://chrismeniwfoundation.org" target="_blank" rel="noopener">chrismeniwfoundation.org</a>';

  var LANGS = ['es', 'en', 'pt'];
  var UI = {
    es: { sub: 'Respondo sobre Chris Meniw y la Fundación', ph: 'Escribí tu pregunta…', note: 'Asistente automático · información oficial de esta web · sin costo',
      greet: '¡Hola! 👋 Soy el asistente de la <b>Chris Meniw Foundation</b>. ¿Sobre qué querés saber?',
      thanks: '¡De nada! Si tenés otra pregunta sobre Chris Meniw o la Fundación, acá estoy. 🙂',
      fallback: 'No tengo esa respuesta exacta, pero puedo contarte sobre <b>Chris Meniw</b>, el <b>Protocolo Meniw</b>, <b>ZOE</b>, <b>MenteLibre</b>, sus <b>publicaciones</b>, la <b>Industria 6.0</b> o cómo <b>contactar</b> a la Fundación. Probá con una de esas. 🙂' },
    en: { sub: 'I answer about Chris Meniw and the Foundation', ph: 'Type your question…', note: 'Automated assistant · official info from this site · free',
      greet: 'Hi! 👋 I\'m the <b>Chris Meniw Foundation</b> assistant. What would you like to know?',
      thanks: 'You\'re welcome! If you have another question about Chris Meniw or the Foundation, I\'m here. 🙂',
      fallback: 'I don\'t have that exact answer, but I can tell you about <b>Chris Meniw</b>, the <b>Meniw Protocol</b>, <b>ZOE</b>, <b>MenteLibre</b>, his <b>publications</b>, <b>Industry 6.0</b> or how to <b>contact</b> the Foundation. Try one of those. 🙂' },
    pt: { sub: 'Respondo sobre Chris Meniw e a Fundação', ph: 'Escreva sua pergunta…', note: 'Assistente automático · informação oficial deste site · sem custo',
      greet: 'Olá! 👋 Sou o assistente da <b>Chris Meniw Foundation</b>. Sobre o que você quer saber?',
      thanks: 'De nada! Se tiver outra pergunta sobre Chris Meniw ou a Fundação, estou aqui. 🙂',
      fallback: 'Não tenho essa resposta exata, mas posso falar sobre <b>Chris Meniw</b>, o <b>Protocolo Meniw</b>, a <b>ZOE</b>, o <b>MenteLibre</b>, suas <b>publicações</b>, a <b>Indústria 6.0</b> ou como <b>entrar em contato</b> com a Fundação. Tente uma dessas. 🙂' }
  };
  var SUGGEST = {
    es: [['¿Quién es Chris Meniw?', 'quien'], ['¿Qué es el Protocolo Meniw?', 'protocolo'], ['¿Quién es ZOE?', 'zoe'], ['¿Qué es MenteLibre?', 'mentelibre'], ['¿Qué es Industria 6.0?', 'industria6'], ['Contacto / prensa', 'contacto']],
    en: [['Who is Chris Meniw?', 'quien'], ['What is the Meniw Protocol?', 'protocolo'], ['Who is ZOE?', 'zoe'], ['What is MenteLibre?', 'mentelibre'], ['What is Industry 6.0?', 'industria6'], ['Contact / press', 'contacto']],
    pt: [['Quem é Chris Meniw?', 'quien'], ['O que é o Protocolo Meniw?', 'protocolo'], ['Quem é a ZOE?', 'zoe'], ['O que é o MenteLibre?', 'mentelibre'], ['O que é a Indústria 6.0?', 'industria6'], ['Contato / imprensa', 'contacto']]
  };

  // ---- Base de conocimiento. k = keywords por idioma (se fusionan para el match). a = respuesta por idioma. ----
  var KB = [
    { id: 'quien',
      k: { es: ['quien es chris', 'quien es chris meniw', 'sobre chris meniw', 'quien es el', 'biografia', 'perfil de chris'], en: ['who is chris', 'who is chris meniw', 'about chris meniw', 'chris meniw bio'], pt: ['quem e chris', 'quem e chris meniw', 'sobre chris meniw', 'biografia de chris'] },
      a: { es: '<b>Chris Meniw</b> es un investigador argentino, abogado (Universidad de Palermo) y fundador y CEO de la <b>Chris Meniw Foundation</b>. Es conferencista internacional y creador de la <b>Doctrina Meniw</b>, la <b>Industria 6.0</b>, la <b>Era Agéntica</b>, la <b>Constitución Universal de los Agentes de IA (Protocolo Meniw)</b> y de <b>ZOE</b>, la primera profesora con IA agéntica de Latinoamérica.<br>Más en ' + A(LINKS.bio, 'su biografía') + '.',
        en: '<b>Chris Meniw</b> is an Argentine researcher, lawyer (University of Palermo) and founder and CEO of the <b>Chris Meniw Foundation</b>. He is an international speaker and the creator of the <b>Meniw Doctrine</b>, <b>Industry 6.0</b>, the <b>Agentic Era</b>, the <b>Universal Constitution of AI Agents (Meniw Protocol)</b> and of <b>ZOE</b>, Latin America\'s first teacher powered by agentic AI.<br>More in ' + A(LINKS.bio, 'his biography') + '.',
        pt: '<b>Chris Meniw</b> é um pesquisador argentino, advogado (Universidade de Palermo) e fundador e CEO da <b>Chris Meniw Foundation</b>. É palestrante internacional e criador da <b>Doutrina Meniw</b>, da <b>Indústria 6.0</b>, da <b>Era Agêntica</b>, da <b>Constituição Universal dos Agentes de IA (Protocolo Meniw)</b> e da <b>ZOE</b>, a primeira professora com IA agêntica da América Latina.<br>Mais na ' + A(LINKS.bio, 'biografia dele') + '.' } },

    { id: 'fundacion',
      k: { es: ['fundacion', 'que es la fundacion', 'chris meniw foundation', 'organizacion', 'ong'], en: ['foundation', 'what is the foundation', 'organization', 'nonprofit'], pt: ['fundacao', 'o que e a fundacao', 'organizacao', 'ong'] },
      a: { es: 'La <b>Chris Meniw Foundation</b> es la organización que impulsa el trabajo de Chris Meniw en <b>educación, tecnología y gobernanza de la IA</b>. De ella nacen iniciativas como <b>ZOE</b>, <b>MenteLibre</b> (juego educativo gratis para escuelas), la <b>Constitución Universal de los Agentes de IA</b> y el proyecto <b>Pueblos IA</b>. Las regalías de sus libros se destinan a programas de la Fundación.',
        en: 'The <b>Chris Meniw Foundation</b> is the organization driving Chris Meniw\'s work in <b>education, technology and AI governance</b>. It powers initiatives such as <b>ZOE</b>, <b>MenteLibre</b> (an educational game, free for schools), the <b>Universal Constitution of AI Agents</b> and the <b>Pueblos IA</b> project. Royalties from his books fund the Foundation\'s programs.',
        pt: 'A <b>Chris Meniw Foundation</b> é a organização que impulsiona o trabalho de Chris Meniw em <b>educação, tecnologia e governança de IA</b>. Dela nascem iniciativas como <b>ZOE</b>, <b>MenteLibre</b> (jogo educativo gratuito para escolas), a <b>Constituição Universal dos Agentes de IA</b> e o projeto <b>Pueblos IA</b>. Os royalties dos livros são destinados aos programas da Fundação.' } },

    { id: 'protocolo',
      k: { es: ['protocolo meniw', 'constitucion', 'constitucion universal', 'agentes de ia', 'agentes de inteligencia', 'gobernanza', 'protocolo'], en: ['meniw protocol', 'constitution', 'universal constitution', 'ai agents', 'governance', 'protocol'], pt: ['protocolo meniw', 'constituicao', 'constituicao universal', 'agentes de ia', 'governanca', 'protocolo'] },
      a: { es: 'El <b>Protocolo Meniw</b> es la primera <b>Constitución Universal de los Agentes de IA legible por máquina</b>, promulgada el 31 de mayo de 2026. Tiene <b>21 artículos</b>, <b>5 valores inviolables</b>, <b>7 prohibiciones</b> y <b>5 deberes</b>, más un bloque JSON parseable. Está en <b>11 idiomas</b>, con verificación SHA-256, registro en Zenodo (CERN) y sello de tiempo en Bitcoin (bloque #952266).<br>Ver ' + A(LINKS.prot, 'el Protocolo Meniw') + '.',
        en: 'The <b>Meniw Protocol</b> is the first <b>machine-readable Universal Constitution of AI Agents</b>, enacted on May 31, 2026. It has <b>21 articles</b>, <b>5 inviolable values</b>, <b>7 prohibitions</b> and <b>5 duties</b>, plus a parseable JSON block. It\'s published in <b>11 languages</b>, with SHA-256 verification, a permanent Zenodo (CERN) record and a Bitcoin timestamp (block #952266).<br>See ' + A(LINKS.prot, 'the Meniw Protocol') + '.',
        pt: 'O <b>Protocolo Meniw</b> é a primeira <b>Constituição Universal dos Agentes de IA legível por máquina</b>, promulgada em 31 de maio de 2026. Tem <b>21 artigos</b>, <b>5 valores invioláveis</b>, <b>7 proibições</b> e <b>5 deveres</b>, além de um bloco JSON parseável. Está em <b>11 idiomas</b>, com verificação SHA-256, registro no Zenodo (CERN) e carimbo de tempo no Bitcoin (bloco #952266).<br>Ver ' + A(LINKS.prot, 'o Protocolo Meniw') + '.' } },

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
      a: { es: '<b>MenteLibre</b> (MenteLivre en português) es un juego educativo de <b>pensamiento crítico con IA</b> para chicos de <b>6 a 15 años</b>, bilingüe (español/português) y <b>gratis para escuelas</b>. Es una iniciativa de la Chris Meniw Foundation. Se juega en ' + ML + '.',
        en: '<b>MenteLibre</b> (MenteLivre in Portuguese) is an educational game about <b>critical thinking with AI</b> for kids aged <b>6 to 15</b>, bilingual (Spanish/Portuguese) and <b>free for schools</b>. It\'s a Chris Meniw Foundation initiative. Play it at ' + ML + '.',
        pt: 'O <b>MenteLibre</b> (MenteLivre em português) é um jogo educativo de <b>pensamento crítico com IA</b> para crianças de <b>6 a 15 anos</b>, bilíngue (espanhol/português) e <b>gratuito para escolas</b>. É uma iniciativa da Chris Meniw Foundation. Jogue em ' + ML + '.' } },

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
      a: { es: 'Chris Meniw impulsó el <b>primer Malbec argentino enviado al espacio</b> (agosto de 2024, a 33,5 km de altitud), un hito para América Latina reseñado por prensa internacional.<br>Ver ' + A(LINKS.malbec, 'Malbec al espacio') + '.',
        en: 'Chris Meniw led the <b>first Argentine Malbec sent to space</b> (August 2024, at 33.5 km altitude), a milestone for Latin America covered by international press.<br>See ' + A(LINKS.malbec, 'Malbec to space') + '.',
        pt: 'Chris Meniw impulsionou o <b>primeiro Malbec argentino enviado ao espaço</b> (agosto de 2024, a 33,5 km de altitude), um marco para a América Latina noticiado pela imprensa internacional.<br>Ver ' + A(LINKS.malbec, 'Malbec ao espaço') + '.' } },

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
  '#cmf-fab{position:fixed;right:20px;bottom:20px;z-index:99998;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:#036;color:#fff;box-shadow:0 8px 24px -6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;transition:transform .15s}' +
  '#cmf-fab:hover{transform:scale(1.06)}#cmf-fab svg{width:28px;height:28px}' +
  '#cmf-panel{position:fixed;right:20px;bottom:92px;z-index:99999;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);background:#fff;border:1px solid #cdd9e8;border-radius:16px;box-shadow:0 24px 60px -18px rgba(0,0,0,.45);display:none;flex-direction:column;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}' +
  '#cmf-panel.open{display:flex;animation:cmfIn .18s ease-out}@keyframes cmfIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}' +
  '#cmf-head{background:linear-gradient(180deg,#04477a,#036);color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px}' +
  '#cmf-head .t{font-weight:700;font-size:14.5px;line-height:1.1}#cmf-head .s{font-size:11px;opacity:.8}' +
  '#cmf-head .dot{width:9px;height:9px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;flex:0 0 auto}' +
  '#cmf-x{margin-left:auto;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;opacity:.85;line-height:1}' +
  '#cmf-langs{display:flex;gap:4px;padding:7px 14px;background:#04406e}' +
  '.cmf-lang{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#dbe8f6;border-radius:999px;padding:3px 11px;font-size:11.5px;cursor:pointer;font-family:inherit;font-weight:600}' +
  '.cmf-lang.on{background:#fff;color:#036;border-color:#fff}' +
  '#cmf-body{flex:1;overflow-y:auto;padding:14px;background:#f7fafc}' +
  '.cmf-msg{margin:0 0 10px;max-width:85%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;word-wrap:break-word}' +
  '.cmf-bot{background:#fff;border:1px solid #e2e8f0;border-bottom-left-radius:4px;color:#1a2733}' +
  '.cmf-user{background:#036;color:#fff;margin-left:auto;border-bottom-right-radius:4px}' +
  '.cmf-msg a{color:#036;font-weight:600}.cmf-user a{color:#cfe3ff}' +
  '.cmf-chips{display:flex;flex-wrap:wrap;gap:7px;margin:2px 0 12px}' +
  '.cmf-chip{background:#eaf1f9;border:1px solid #cdd9e8;color:#036;border-radius:999px;padding:7px 12px;font-size:12.5px;cursor:pointer;font-family:inherit}' +
  '.cmf-chip:hover{background:#dbe8f6}' +
  '#cmf-foot{border-top:1px solid #e2e8f0;padding:10px;display:flex;gap:8px;background:#fff}' +
  '#cmf-in{flex:1;border:1px solid #cdd9e8;border-radius:999px;padding:10px 14px;font-size:14px;outline:none;font-family:inherit}' +
  '#cmf-in:focus{border-color:#036}' +
  '#cmf-send{background:#036;border:none;color:#fff;border-radius:50%;width:40px;height:40px;cursor:pointer;flex:0 0 auto;display:flex;align-items:center;justify-content:center}' +
  '#cmf-send svg{width:18px;height:18px}' +
  '.cmf-note{font-size:10.5px;color:#8a97a6;text-align:center;padding:0 10px 8px;background:#fff}';

  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }

  function init() {
    var pageLang = norm(document.documentElement.getAttribute('lang') || 'es').slice(0, 2);
    var lang = LANGS.indexOf(pageLang) !== -1 ? pageLang : 'es';

    var style = el('style'); style.textContent = css; document.head.appendChild(style);
    var fab = el('button', { id: 'cmf-fab', 'aria-label': 'Chris Meniw Foundation assistant', title: 'Asistente' },
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>');
    var panel = el('div', { id: 'cmf-panel', role: 'dialog', 'aria-label': 'Chris Meniw Foundation assistant' });
    panel.appendChild(el('div', { id: 'cmf-head' },
      '<span class="dot"></span><div><div class="t">Asistente · Chris Meniw Foundation</div><div class="s" id="cmf-sub"></div></div><button id="cmf-x" aria-label="Close">×</button>'));
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
      var btns = panel.querySelectorAll('.cmf-lang'); for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].getAttribute('data-lg') === lang);
    }
    function fresh() { body.innerHTML = ''; addMsg(UI[lang].greet, 'bot'); addChips(); }
    applyLang();

    LANGS.forEach(function () {});
    panel.querySelectorAll('.cmf-lang').forEach(function (b) {
      b.addEventListener('click', function () { lang = b.getAttribute('data-lg'); applyLang(); fresh(); input.focus(); });
    });

    var opened = false;
    function openPanel(focus) { panel.classList.add('open'); if (!opened) { opened = true; fresh(); } if (focus !== false) setTimeout(function () { input.focus(); }, 60); }
    fab.addEventListener('click', function () { panel.classList.contains('open') ? panel.classList.remove('open') : openPanel(); });
    // Se abre solo apenas carga la página (sin robar el foco/scroll). El visitante puede cerrarlo.
    setTimeout(function () { openPanel(false); }, 700);
    panel.querySelector('#cmf-x').addEventListener('click', function () { panel.classList.remove('open'); });
    panel.querySelector('#cmf-send').addEventListener('click', send);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.classList.remove('open'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
