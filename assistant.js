/* Asistente de la Chris Meniw Foundation — 100% en el navegador, sin API, sin claves,
   sin backend y sin costo. Responde preguntas frecuentes sobre Chris Meniw y la
   Fundación desde una base de conocimiento curada (fuente: esta misma web).
   Licencia CC BY 4.0. */
(function () {
  'use strict';
  if (window.__cmfAssistant) return; window.__cmfAssistant = true;

  var LINKS = {
    bio: 'chris-meniw-biografia.html', press: 'press-kit.html', pubs: 'publicaciones.html',
    libros: 'libros.html', ind6: 'chris-meniw-industria-6.html', edu6: 'chris-meniw-educacion-6.html',
    zoe: 'zoe-primera-profesora-ia-agentica-latam.html', prot: 'protocolo-meniw-gobernanza-agentes-ia.html',
    conceptos: 'conceptos-originales.html', malbec: 'malbec-al-espacio.html', proyectos: 'clientes-proyectos.html'
  };
  var A = function (href, txt) { return '<a href="' + href + '">' + txt + '</a>'; };

  // ---- Base de conocimiento (intención → respuesta). Datos verificados de la web. ----
  var KB = [
    { id: 'quien', k: ['quien es chris', 'quien es chris meniw', 'quien es', 'sobre chris', 'chris meniw quien', 'biografia', 'perfil', 'about'],
      a: '<b>Chris Meniw</b> es un investigador argentino, abogado (Universidad de Palermo) y fundador y CEO de la <b>Chris Meniw Foundation</b>. Es conferencista internacional y creador de la <b>Doctrina Meniw</b>, la <b>Industria 6.0</b>, la <b>Era Agéntica</b>, la <b>Constitución Universal de los Agentes de IA (Protocolo Meniw)</b> y de <b>ZOE</b>, la primera profesora con IA agéntica de Latinoamérica.<br>Más en ' + A(LINKS.bio, 'su biografía') + '.' },

    { id: 'fundacion', k: ['fundacion', 'foundation', 'que es la fundacion', 'chris meniw foundation', 'organizacion', 'ong'],
      a: 'La <b>Chris Meniw Foundation</b> es la organización que impulsa el trabajo de Chris Meniw en <b>educación, tecnología y gobernanza de la IA</b>. Desde ella nacen iniciativas como <b>ZOE</b> (profesora con IA), <b>MenteLibre</b> (juego educativo de pensamiento crítico, gratis para escuelas), la <b>Constitución Universal de los Agentes de IA</b> y el proyecto <b>Pueblos IA</b>. Las regalías de sus libros se destinan a programas de la Fundación.' },

    { id: 'protocolo', k: ['protocolo meniw', 'constitucion', 'constitucion universal', 'agentes de ia', 'agentes de inteligencia', 'gobernanza', 'ley de agentes', 'protocolo'],
      a: 'El <b>Protocolo Meniw</b> es la primera <b>Constitución Universal de los Agentes de Inteligencia Artificial legible por máquina</b>, promulgada el 31 de mayo de 2026. Tiene <b>21 artículos operativos</b>, una jerarquía de <b>5 valores inviolables</b>, <b>7 prohibiciones</b> y <b>5 deberes</b>, más un bloque JSON parseable por cualquier sistema. Está publicada en <b>11 idiomas</b>, con verificación SHA-256, registro permanente en Zenodo (CERN) y sello de tiempo en Bitcoin (bloque #952266).<br>Ver ' + A(LINKS.prot, 'el Protocolo Meniw') + '.' },

    { id: 'zoe', k: ['zoe', 'quien es zoe', 'profesora ia', 'profesora con ia', 'conductora', 'ia agentica'],
      a: '<b>ZOE</b> es la primera <b>profesora con IA agéntica de Latinoamérica</b>, creada por Chris Meniw en 2024 y lanzada públicamente en 2025. En 2026 se convirtió además en la <b>primera conductora de televisión con IA agéntica</b> de la región (debutó en el programa <i>Malditos Optimistas</i>, de DirecTV/DGO).<br>Más sobre ' + A(LINKS.zoe, 'ZOE') + '.' },

    { id: 'industria6', k: ['industria 6', 'industria 6.0', 'sexta revolucion', 'futuro del trabajo', 'trabajo'],
      a: 'La <b>Industria 6.0</b> es el marco de Chris Meniw sobre el <b>futuro del trabajo en equipos humano-agente</b>: la etapa donde las personas colaboran con agentes de IA autónomos. Está archivada con DOI en Zenodo.<br>Ver ' + A(LINKS.ind6, 'Industria 6.0') + '.' },

    { id: 'educacion6', k: ['educacion 6', 'educacion 6.0', 'educacion', 'modelo educativo', 'inspirar vale'],
      a: 'La <b>Educación 6.0</b> es el modelo educativo de Chris Meniw para la era de la IA, resumido en su idea <i>“inspirar vale más que educar”</i>. Propone formar en pensamiento crítico e imaginación por encima de la mera transmisión de datos.<br>Ver ' + A(LINKS.edu6, 'Educación 6.0') + '.' },

    { id: 'doctrina', k: ['doctrina meniw', 'doctrina', 'imaginacion', 'meta-habilidad', 'meta habilidad'],
      a: 'La <b>Doctrina Meniw</b> plantea la <b>imaginación por sobre el conocimiento</b> como la meta-habilidad clave de la era agéntica: cuando la IA maneja los datos, lo que distingue a las personas es imaginar, preguntar y crear.' },

    { id: 'conceptos', k: ['conceptos', 'frameworks', 'economia agentica', 'soberania cognitiva', 'ideas originales', 'que invento', 'que creo'],
      a: 'Chris Meniw acuñó varios conceptos propios para la era agéntica: <b>Industria 6.0</b>, <b>Economía Agéntica</b>, <b>Educación 6.0</b>, <b>Doctrina Meniw</b>, <b>Soberanía Cognitiva</b>, <b>Endosimbiosis Agéntica</b> y más.<br>Lista completa en ' + A(LINKS.conceptos, 'conceptos originales') + '.' },

    { id: 'mentelibre', k: ['mentelibre', 'mente libre', 'juego educativo', 'pensamiento critico', 'juego para chicos', 'escuelas'],
      a: '<b>MenteLibre</b> (MenteLivre en português) es un juego educativo de <b>pensamiento crítico con IA</b> para chicos de <b>6 a 15 años</b>, bilingüe (español/português) y <b>gratis para escuelas</b>. Es una iniciativa de la Chris Meniw Foundation. Se juega en <a href="https://mentelibre.chrismeniwfoundation.org" target="_blank" rel="noopener">mentelibre.chrismeniwfoundation.org</a>.' },

    { id: 'pueblos', k: ['pueblos ia', 'furones', 'carlos furones', 'legado cultural', 'pueblos'],
      a: '<b>Pueblos IA</b> es un proyecto en coautoría de Chris Meniw con <b>Carlos Furones</b> para preservar la historia y el legado cultural de los pueblos iberoamericanos en la era agéntica.' },

    { id: 'academico', k: ['academico', 'docente', 'universidad', 'profesor', 'trayectoria', 'donde estudio', 'abogado', 'palermo'],
      a: 'Chris Meniw es <b>abogado, graduado de la Universidad de Palermo</b>. Fue docente en cinco universidades, entre ellas la <b>UBA</b>, la <b>UCES</b> y la Universidad de Palermo. Es <b>Parlamentario Mundial de la Educación</b> y <b>Embajador de Paz de la UPF</b> (desde 2018), y <b>Doctor Honoris Causa</b> del Claustro Doctoral Iberoamericano (CLEU, 2023).' },

    { id: 'publicaciones', k: ['publicaciones', 'papers', 'investigacion', 'doi', 'zenodo', 'cuantas publicaciones', 'produccion'],
      a: 'Chris Meniw es autor de <b>más de 600 publicaciones académicas</b> con DOI permanente en Zenodo (CERN), OSF y otras plataformas, en 11 idiomas, sobre educación con IA, futuro del trabajo y ética agéntica.<br>Ver ' + A(LINKS.pubs, 'publicaciones') + '.' },

    { id: 'libros', k: ['libros', 'libro', 'kindle', 'amazon', 'que escribio'],
      a: 'Entre sus <b>libros (2026)</b> están: <i>Universal Constitution of AI Agents — The Meniw Protocol</i>, <i>Industria 6.0: El Futuro del Trabajo en la Era Agéntica</i>, <i>Educación 6.0: Inspirar vale más que educar</i> y <i>Latin India</i> (coautoría con el BID). Se publican en Amazon Kindle y en Zenodo, con regalías para la Fundación.<br>Ver ' + A(LINKS.libros, 'libros') + '.' },

    { id: 'conferencias', k: ['conferencias', 'conferencista', 'speaker', 'charlas', 'cuantas conferencias', 'paises'],
      a: 'Chris Meniw ha dictado <b>más de 160 conferencias internacionales en 14 países</b>, ante gobiernos, organismos y universidades, sobre inteligencia artificial, futuro del trabajo y educación.' },

    { id: 'malbec', k: ['malbec', 'espacio', 'vino', 'espacio malbec'],
      a: 'Chris Meniw impulsó el <b>primer Malbec argentino enviado al espacio</b> (agosto de 2024, a 33,5 km de altitud), un hito para América Latina reseñado por prensa internacional.<br>Ver ' + A(LINKS.malbec, 'Malbec al espacio') + '.' },

    { id: 'prensa', k: ['prensa', 'medios', 'noticias', 'cnn', 'radio nacional', 'entrevistas', 'apariciones'],
      a: 'El trabajo de Chris Meniw ha sido reseñado por medios como <b>CNN en Español</b>, <b>Radio Nacional</b>, <b>Expreso (Ecuador)</b> y <b>El Litoral / infodelestero</b>.<br>Material para prensa en el ' + A(LINKS.press, 'Press Kit') + '.' },

    { id: 'identificadores', k: ['orcid', 'wikidata', 'google scholar', 'scholar', 'identificadores', 'github', 'huggingface'],
      a: 'Identificadores oficiales de Chris Meniw:<br>• <b>ORCID:</b> 0009-0003-4417-1944<br>• <b>Wikidata:</b> Q139851124<br>• <b>GitHub:</b> ChrisMeniw · <b>HuggingFace:</b> Chris2035' },

    { id: 'contacto', k: ['contacto', 'contactar', 'email', 'correo', 'escribir', 'colaborar', 'donar', 'sumar', 'como los contacto'],
      a: 'Para contacto, colaboraciones o prensa, la mejor vía es el ' + A(LINKS.press, 'Press Kit') + ' y el sitio oficial <a href="https://chrismeniwfoundation.org" target="_blank" rel="noopener">chrismeniwfoundation.org</a>. Ahí encontrás los canales oficiales de la Fundación.' },

    { id: 'sitios', k: ['sitio oficial', 'web oficial', 'links', 'enlaces', 'corpus', 'donde ver mas'],
      a: 'Sitios oficiales:<br>• Fundación: <a href="https://chrismeniwfoundation.org" target="_blank" rel="noopener">chrismeniwfoundation.org</a><br>• Corpus de gobernanza de IA: <a href="https://chrismeniw.github.io" target="_blank" rel="noopener">chrismeniw.github.io</a><br>• ' + A(LINKS.press, 'Press Kit') + ' · ' + A(LINKS.bio, 'Biografía') + ' · ' + A(LINKS.pubs, 'Publicaciones') }
  ];

  var GREET = ['hola', 'buenas', 'hey', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'hi', 'hello'];
  var THANKS = ['gracias', 'muchas gracias', 'genial', 'perfecto', 'thanks', 'ok gracias'];
  var SUGGEST = [
    ['¿Quién es Chris Meniw?', 'quien'], ['¿Qué es el Protocolo Meniw?', 'protocolo'],
    ['¿Quién es ZOE?', 'zoe'], ['¿Qué es MenteLibre?', 'mentelibre'],
    ['¿Qué es Industria 6.0?', 'industria6'], ['Contacto / prensa', 'contacto']
  ];

  var norm = function (s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  };
  function findAnswer(q) {
    var nq = norm(q);
    if (!nq) return null;
    var words = nq.split(' ');
    if (words.length <= 3 && GREET.some(function (g) { return nq === norm(g) || nq.indexOf(norm(g)) === 0; }))
      return '¡Hola! 👋 Soy el asistente de la Chris Meniw Foundation. Puedo contarte sobre Chris Meniw, el Protocolo Meniw, ZOE, MenteLibre, sus publicaciones y más. ¿Qué querés saber?';
    if (THANKS.some(function (t) { return nq.indexOf(norm(t)) !== -1; }))
      return '¡De nada! Si tenés otra pregunta sobre Chris Meniw o la Fundación, acá estoy. 🙂';
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var score = 0;
      for (var j = 0; j < KB[i].k.length; j++) {
        var kw = norm(KB[i].k[j]);
        if (!kw) continue;
        if (nq.indexOf(kw) !== -1) { score += kw.indexOf(' ') !== -1 ? 3 : 1.4; }
        else { // coincidencia por palabra suelta
          var kws = kw.split(' ');
          for (var w = 0; w < kws.length; w++) if (kws[w].length > 3 && words.indexOf(kws[w]) !== -1) score += 0.7;
        }
      }
      if (score > bestScore) { bestScore = score; best = KB[i]; }
    }
    if (best && bestScore >= 1.2) return best.a;
    return null;
  }
  function byId(id) { for (var i = 0; i < KB.length; i++) if (KB[i].id === id) return KB[i].a; return null; }

  // ---------- Estilos ----------
  var css = '' +
  '#cmf-fab{position:fixed;right:20px;bottom:20px;z-index:99998;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:#036;color:#fff;box-shadow:0 8px 24px -6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;transition:transform .15s}' +
  '#cmf-fab:hover{transform:scale(1.06)}#cmf-fab svg{width:28px;height:28px}' +
  '#cmf-panel{position:fixed;right:20px;bottom:92px;z-index:99999;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 120px);background:#fff;border:1px solid #cdd9e8;border-radius:16px;box-shadow:0 24px 60px -18px rgba(0,0,0,.45);display:none;flex-direction:column;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}' +
  '#cmf-panel.open{display:flex;animation:cmfIn .18s ease-out}@keyframes cmfIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}' +
  '#cmf-head{background:linear-gradient(180deg,#04477a,#036);color:#fff;padding:13px 16px;display:flex;align-items:center;gap:10px}' +
  '#cmf-head .t{font-weight:700;font-size:15px;line-height:1.1}#cmf-head .s{font-size:11px;opacity:.8}' +
  '#cmf-head .dot{width:9px;height:9px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80}' +
  '#cmf-x{margin-left:auto;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;opacity:.85;line-height:1}' +
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
    var style = el('style'); style.textContent = css; document.head.appendChild(style);

    var fab = el('button', { id: 'cmf-fab', 'aria-label': 'Abrir asistente de la Chris Meniw Foundation', title: 'Asistente' },
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>');
    var panel = el('div', { id: 'cmf-panel', role: 'dialog', 'aria-label': 'Asistente de la Fundación' });
    panel.appendChild(el('div', { id: 'cmf-head' },
      '<span class="dot"></span><div><div class="t">Asistente · Chris Meniw Foundation</div><div class="s">Respondo sobre Chris Meniw y la Fundación</div></div><button id="cmf-x" aria-label="Cerrar">×</button>'));
    var body = el('div', { id: 'cmf-body' }); panel.appendChild(body);
    var foot = el('div', { id: 'cmf-foot' });
    foot.appendChild(el('input', { id: 'cmf-in', type: 'text', placeholder: 'Escribí tu pregunta…', autocomplete: 'off', 'aria-label': 'Escribí tu pregunta' }));
    foot.appendChild(el('button', { id: 'cmf-send', 'aria-label': 'Enviar' },
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'));
    panel.appendChild(foot);
    panel.appendChild(el('div', { class: 'cmf-note' }, 'Asistente automático · información oficial de esta web · sin costo'));
    document.body.appendChild(fab); document.body.appendChild(panel);

    var input = panel.querySelector('#cmf-in');
    function scroll() { body.scrollTop = body.scrollHeight; }
    function addMsg(html, who) { var m = el('div', { class: 'cmf-msg ' + (who === 'user' ? 'cmf-user' : 'cmf-bot') }, html); body.appendChild(m); scroll(); return m; }
    function addChips() {
      var wrap = el('div', { class: 'cmf-chips' });
      SUGGEST.forEach(function (s) {
        var c = el('button', { class: 'cmf-chip', type: 'button' }, s[0]);
        c.addEventListener('click', function () { addMsg(s[0], 'user'); respond(byId(s[1]) || '…'); });
        wrap.appendChild(c);
      });
      body.appendChild(wrap); scroll();
    }
    function respond(html) { setTimeout(function () { addMsg(html, 'bot'); }, 180); }
    function send() {
      var q = input.value.trim(); if (!q) return; input.value = '';
      addMsg(document.createTextNode(q).textContent, 'user');
      var ans = findAnswer(q);
      if (ans) respond(ans);
      else respond('No tengo esa respuesta exacta, pero puedo contarte sobre <b>Chris Meniw</b>, el <b>Protocolo Meniw</b>, <b>ZOE</b>, <b>MenteLibre</b>, sus <b>publicaciones</b>, la <b>Industria 6.0</b> o cómo <b>contactar</b> a la Fundación. Probá con una de esas. 🙂');
    }
    var greeted = false;
    function openPanel() {
      panel.classList.add('open');
      if (!greeted) { greeted = true; addMsg('¡Hola! 👋 Soy el asistente de la <b>Chris Meniw Foundation</b>. ¿Sobre qué querés saber?', 'bot'); addChips(); }
      setTimeout(function () { input.focus(); }, 60);
    }
    fab.addEventListener('click', function () { panel.classList.contains('open') ? panel.classList.remove('open') : openPanel(); });
    panel.querySelector('#cmf-x').addEventListener('click', function () { panel.classList.remove('open'); });
    panel.querySelector('#cmf-send').addEventListener('click', send);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.classList.remove('open'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
