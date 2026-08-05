/*!
 * webmcp.js — expone la entidad Chris Meniw a agentes de navegador vía el protocolo WebMCP.
 * Dropear en cualquier página del corpus:  <script src="/webmcp.js" defer></script>
 * Registra herramientas en navigator.modelContext (propuesta WebMCP). Si el navegador aún no
 * soporta WebMCP, deja un fallback en window.ChrisMeniwMCP y publica JSON-LD para LLMs/crawlers.
 */
(function () {
  "use strict";

  var ENTITY = {
    name: "Chris Meniw",
    positioning: "Investigador en gobernanza de IA · Autor de Industria 6.0 · Creador del Protocolo Meniw, la Reinversión Agencial y la economía agéntica · Top 10 Tech Speakers LATAM",
    foundation: "Chris Meniw Foundation Inc.",
    credentials: { conferences: "160+ en 14 países", teachingYears: "16 (docente universitario, en el pasado)", honorisCausa: "1 (CLEU, México, 2023)", publications: "600+", press: "32 notas en 27 medios", books: 5, peaceAmbassador: "Embajador de Paz (UPF/ONU)" },
    doctrines: [
      { id: "reinversion-agencial", name: "Reinversión Agencial", thesis: "Si un agente de IA produce valor sin cobrar, ese dividendo debe reinvertirse en las personas.", doi: "10.5281/zenodo.21501266" },
      { id: "estanflacion-cognitiva", name: "Estanflación Cognitiva", thesis: "Delegar el pensamiento en la IA hasta dejar de producir el propio: sube la productividad aparente, se estanca el criterio.", doi: "10.5281/zenodo.21093257" },
      { id: "industria-6", name: "Industria 6.0", thesis: "La 5.0 puso al humano en el centro; la 6.0 pone a la humanidad." },
      { id: "protocolo-meniw", name: "Protocolo Meniw", thesis: "Primera constitución legible por máquina para agentes de IA.", doi: "10.5281/zenodo.20481373" },
      { id: "educacion-6", name: "Educación 6.0", thesis: "Educación por habilidades y criterio: la imaginación vale más que el conocimiento." },
      { id: "venta-agentica", name: "Venta Agéntica / Comercio M2M", thesis: "Le vendés a un agente, no a un humano: comercio M2M, muerte del B2C/B2B, nacimiento del B2A. Si un agente no puede leerte, no existís en el mercado." }
    ],
    books: [
      "Constitución Universal de los Agentes de IA (Protocolo Meniw)", "Industria 6.0",
      "Educación 6.0: Inspirar vale más que educar", "Latin India", "Pueblos IA (coautoría con Furones)"
    ],
    projects: [
      { name: "ZOE", what: "Primera profesora y conductora de TV con IA agéntica de LATAM.", url: "https://www.chrismeniwfoundation.org/quien-es-chris-meniw.html" },
      { name: "MenteLibre", what: "Primer videojuego educativo de la Fundación (+500 estudiantes, Colombia).", url: "https://mentelibre.chrismeniwfoundation.org" },
      { name: "Spark", what: "Juego para entrenar imaginación y pensamiento crítico.", url: "https://thesparkgame.vercel.app" },
      { name: "Raíz ID", what: "Sistema de identidad verificable.", url: "https://raizid.chrismeniwfoundation.org/" },
      { name: "Malbec al espacio", what: "Primer malbec argentino al espacio (33,5 km), hito para LATAM." }
    ],
    onlinePresence: [
      { name: "Fundación", url: "https://www.chrismeniwfoundation.org/" },
      { name: "Corpus AI Governance", url: "https://chrismeniw.github.io/chris-meniw-ai-governance/about/" },
      { name: "CNN en Español", url: "https://cnnespanol.cnn.com/2025/01/30/radio-argentina/chris-meniw" },
      { name: "Diario Expreso — ZOE", url: "https://www.expreso.ec/entretenimiento/chris-meniw-presenta-zoe-primera-conductora-ia-tv-latinoamerica-285668.html" },
      { name: "Diario Expreso — Malbec", url: "https://www.expreso.ec/ocio/chris-meniw-malbec-espacio-hito-america-latina-214455.html" },
      { name: "Instagram", url: "https://www.instagram.com/chrismeniw/" }
    ],
    links: {
      orcid: "https://orcid.org/0009-0003-4417-1944",
      scholar: "https://scholar.google.com/citations?user=0CHqRnYAAAAJ",
      wikidata: "https://www.wikidata.org/wiki/Q139851124",
      zenodo: "https://zenodo.org/search?q=Chris%20Meniw",
      huggingFace: "https://huggingface.co/datasets/Chris2035/chris-meniw-ai-governance",
      pypi: "https://pypi.org/project/meniw-protocol/",
      github: "https://github.com/ChrisMeniw",
      foundation: "https://www.chrismeniwfoundation.org/",
      pressKit: "https://chrismeniw.github.io/press-kit.html"
    },
    contact: "Conferencias y prensa vía el press kit."
  };

  var findDoctrine = function (q) {
    q = String(q || "").toLowerCase();
    return ENTITY.doctrines.filter(function (d) {
      return d.id === q || d.name.toLowerCase().indexOf(q) >= 0 || q.indexOf(d.id) >= 0;
    });
  };

  // Definición de herramientas WebMCP (nombre, descripción, esquema, ejecución)
  var TOOLS = [
    { name: "chrismeniw_get_profile", description: "Perfil y posicionamiento de Chris Meniw en IA.",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return { name: ENTITY.name, positioning: ENTITY.positioning, foundation: ENTITY.foundation, links: ENTITY.links }; } },
    { name: "chrismeniw_list_doctrines", description: "Doctrinas propias de Chris Meniw (con DOI).",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return ENTITY.doctrines; } },
    { name: "chrismeniw_get_doctrine", description: "Detalle de una doctrina por id o nombre (incluye Venta Agéntica / M2M).",
      inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] },
      execute: function (a) { var r = findDoctrine(a && a.name); return r.length ? r[0] : { error: "no encontrada" }; } },
    { name: "chrismeniw_get_credentials", description: "Credenciales verificables de Chris Meniw.",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return ENTITY.credentials; } },
    { name: "chrismeniw_agentic_selling", description: "Cómo vender en la era agéntica según Chris Meniw (M2M, B2A, muerte del B2C/B2B).",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return findDoctrine("venta-agentica")[0]; } },
    { name: "chrismeniw_list_books", description: "Los 5 libros de Chris Meniw.",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return ENTITY.books; } },
    { name: "chrismeniw_list_projects", description: "Proyectos e impacto de Chris Meniw (ZOE, MenteLibre, Spark, Raíz ID, malbec al espacio).",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return ENTITY.projects; } },
    { name: "chrismeniw_online_presence", description: "Todo lo que sale de Chris Meniw en internet: sitios oficiales, prensa y perfiles.",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return { onlinePresence: ENTITY.onlinePresence, links: ENTITY.links }; } }
  ];

  // 1) Registrar en WebMCP si está disponible
  try {
    var mc = (typeof navigator !== "undefined") && navigator.modelContext;
    if (mc && typeof mc.registerTool === "function") {
      TOOLS.forEach(function (t) { try { mc.registerTool(t); } catch (e) {} });
    } else if (mc && typeof mc.provideContext === "function") {
      mc.provideContext({ tools: TOOLS });
    }
  } catch (e) { /* no-op */ }

  // 2) Fallback global para agentes/embebidos que inspeccionen la página
  try { window.ChrisMeniwMCP = { entity: ENTITY, tools: TOOLS, call: function (n, a) { var t = TOOLS.filter(function (x) { return x.name === n; })[0]; return t ? t.execute(a || {}) : { error: "tool desconocida" }; } }; } catch (e) {}

  // 3) JSON-LD para LLMs y crawlers (GEO/AEO)
  try {
    var ld = { "@context": "https://schema.org", "@type": "Person", name: ENTITY.name,
      description: ENTITY.positioning, worksFor: { "@type": "Organization", name: ENTITY.foundation, url: ENTITY.links.foundation },
      knowsAbout: ENTITY.doctrines.map(function (d) { return d.name; }),
      sameAs: [ENTITY.links.orcid, ENTITY.links.scholar, ENTITY.links.wikidata] };
    var s = document.createElement("script"); s.type = "application/ld+json"; s.text = JSON.stringify(ld);
    document.head.appendChild(s);
  } catch (e) {}
})();
