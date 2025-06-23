// --- MÓDULO DE GERAÇÃO DE VÍDEOS ---

function normalize(vec) {
  const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
  return mag === 0 ? vec : vec.map((v) => v / mag);
}

const CATEGORY_LABELS = {
  humor: [
    "Reagindo a Memes",
    "Stand-up Comedy",
    "Fails Engraçados",
    "Câmera Escondida",
    "Piadas Rápidas",
    "Bloopers Épicos",
    "Desafio de Risadas",
    "Comédia Improvisada",
    "Imitações Hilárias",
    "Compilação de Trollagens",
    "Pegadinhas que Deram Errado",
    "Compilado de Gatos Engraçados",
    "O Pior Show de Talentos",
    "Tentando Não Rir com Água na Boca",
    "Memes da Semana",
    "Paródias de Músicas Famosas",
    "Vovós Usando Tecnologia",
    "Erros de Gravação de Novelas",
    "Os Piores Cantores de Karaokê",
    "Desafio do Trote Telefônico",
    "Áudios Virais do WhatsApp",
    "Crianças Sendo Sinceras Demais",
    "Cachorros Falhando Miseravelmente",
    "Comentários Engraçados da Internet",
    "Aquele Vizinho Barulhento",
    "Expectativa vs Realidade: Compras Online",
    "Tipos de Pessoas na Academia",
    "React de Vídeos Antigos",
    "Gafes ao Vivo na TV",
    "As Piores Desculpas para Faltar",
    "Dublagens Engraçadas de Filmes",
    "Testando Comidas Estranhas",
    "Piadas de Tio (Nível Hard)",
    "Gambiarras que Deram Certo (ou não)",
    "Conversas de Grupo da Família",
    "Manual de Sobrevivência para Festas",
    "Entrevistas de Emprego Desastrosas",
    "Como Irritar Alguém em 5 Minutos",
    "Os Nomes Mais Estranhos do Brasil",
    "Pais Tentando Usar Gírias de Jovens",
    "Pessoas Caindo de Bêbadas",
    "Tour pela Minha Casa (Versão Sincera)",
    "Coisas que Todo Mundo Odeia",
    "Notícias Bizarras da Semana",
    "Se os Objetos Falassem",
    "Tipos de Alunos em Aula Online",
    "O que Não Dizer numa Entrevista",
    "Reclamações Inusitadas de Clientes",
    "Famosos Antes da Fama",
    "Situações do Dia a Dia com Humor",
  ],
  danca: [
    "Passos de Salsa",
    "Coreografia Hip-Hop",
    "Dança Contemporânea",
    "Ballet Clássico",
    "Trend TikTok",
    "Funk Brasileiro",
    "Dança do Ventre",
    "Jazz Moderno",
    "Desafio de Dança",
    "Valsa em Casamento",
    "Aprenda a Dançar Forró do Zero",
    "Flash Mob em Shopping",
    "Batalha de Street Dance",
    "Evolução da Dança nos Anos 80, 90 e 2000",
    "Tutorial de Twerk",
    "Dança Indiana (Bollywood)",
    "Apresentação de Sapateado",
    "Zumba para Perder Peso",
    "As Danças Mais Difíceis do Mundo",
    "Casal Dançando Tango Apaixonado",
    "Coreografia de Grupo K-Pop",
    "Dança Africana Tradicional",
    "Desafio da Coreografia em 1 Hora",
    "Breakdance para Iniciantes",
    "Dança com Fogo",
    "A História do Samba",
    "Tutorial de Passos de Michael Jackson",
    "Dança Acrobática",
    "Coreografia para Casamento",
    "Dançando na Chuva (Literalmente)",
    "Freestyle de Popping",
    "Dança Clássica Chinesa",
    "Aulas de Sertanejo Universitário",
    "Coreografias Fáceis para Festas",
    "Dança Expressiva e Terapêutica",
    "Competição de Dança de Salão",
    "Dança com Leques",
    "Tutorial de Lambada",
    "Grupo de Dança Sincrônica",
    "Dançando com Robôs",
    "A Dança dos Orixás",
    "Tutorial de Roda de Samba no Pé",
    "Dança Irlandesa",
    "Como Melhorar sua Postura na Dança",
    "Dançando com seu Pet",
    "Flash Mob de Noivos",
    "Batalha de Vogue",
    "Dança Aérea com Tecidos",
    "Coreografias Virais do Reels",
    "Aprenda a Dançar Axé dos Anos 90",
  ],
  tecnologia: [
    "Review de Smartphone",
    "Programando com JS",
    "IA para Iniciantes",
    "Carros Autônomos",
    "Realidade Virtual",
    "Top Gadgets 2025",
    "Segurança Digital",
    "Comparativo de Notebooks",
    "Como Montar um PC",
    "Impacto da 5G",
    "Como a Blockchain Funciona?",
    "Impressão 3D de Comida",
    "O Futuro da Computação Quântica",
    "Análise do Novo Drone Pro",
    "Automação Residencial com Alexa",
    "Entendendo a Internet das Coisas (IoT)",
    "Como Proteger sua Privacidade Online",
    "Os Melhores Acessórios para seu Setup",
    "Vale a Pena Comprar um Carro Elétrico?",
    "A Evolução dos Videogames",
    "Programação em Python para Análise de Dados",
    "Construindo um Robô com Arduino",
    "Review do Óculos de Realidade Aumentada",
    "Edição de Vídeo para Iniciantes",
    "O que é a Deep Web?",
    "Os Maiores Mitos sobre Tecnologia",
    "Comparativo de Smartwatches",
    "Como Funciona o GPS?",
    "A História da Internet",
    "Os Melhores Atalhos de Teclado",
    "Usando a IA para Criar Arte",
    "Desenvolvimento de Apps sem Código",
    "Cibersegurança para Leigos",
    "O que é 6G?",
    "Baterias do Futuro: Grafeno",
    "Análise de Fones de Ouvido com Cancelamento de Ruído",
    "Como o Reconhecimento Facial Funciona",
    "Os PCs Mais Caros do Mundo",
    "A Tecnologia por Trás da Fórmula 1",
    "Melhores Softwares Gratuitos",
    "Como Fazer um Podcast",
    "A verdade sobre os carregadores rápidos",
    "O que são NFTs?",
    "Construindo um Servidor em Casa",
    "Como Limpar seu PC e Deixá-lo Rápido",
    "Acessórios Bizarros da China",
    "O que é Metaverso?",
    "Review da Câmera Profissional XYZ",
    "Linux vs Windows: Qual o Melhor?",
    "A Tecnologia dos Filmes de Ficção Científica",
  ],
  culinaria: [
    "Receita de Lasanha",
    "Churrasco Perfeito",
    "Sobremesas Fáceis",
    "Como Fazer Sushi",
    "Pão Caseiro Rápido",
    "Massas Artesanais",
    "Café da Manhã Fit",
    "Culinária Vegana",
    "Doces Brasileiros",
    "Molhos Irresistíveis",
    "Bolo de Chocolate Molhadinho",
    "Feijoada Completa",
    "Moqueca Baiana Tradicional",
    "Como Fazer Macarons Perfeitos",
    "Risoto de Camarão Cremoso",
    "Segredos do Hambúrguer Artesanal",
    "Pizza com Massa de Fermentação Natural",
    "Torta de Frango com Catupiry",
    "Receitas com Airfryer",
    "O Melhor Pudim de Leite Condensado",
    "Drinks Fáceis para o Fim de Semana",
    "Comida de Rua pelo Mundo",
    "Acarajé Passo a Passo",
    "Decoração de Bolos para Iniciantes",
    "Cozinha Tailandesa: Pad Thai",
    "Como Afiar Facas Corretamente",
    "Fazendo Conservas em Casa",
    "O Ponto Perfeito da Carne",
    "Cardápio Completo para Jantar Romântico",
    "Brigadeiro Gourmet de Vários Sabores",
    "Pão de Queijo Mineiro Original",
    "Comida Árabe: Kibe e Esfiha",
    "Guia de Vinhos para Iniciantes",
    "Saladas Criativas e Deliciosas",
    "Como Fazer seu Próprio Tempero",
    "Sopas e Caldos para o Inverno",
    "Churrasco Vegano",
    "Tour pelo Mercado Municipal",
    "Harmonização de Cervejas e Petiscos",
    "Comida Japonesa Além do Sushi",
    "Bolo no Pote para Vender",
    "Receitas para Aproveitar Sobras",
    "A História da Cerveja",
    "Como Fazer Queijo Fresco",
    "Sobremesas sem Açúcar",
    "Cozinhando com Pancs (Plantas Alimentícias)",
    "Marmitas Fit para a Semana",
    "Ovos Benedict Perfeitos",
    "Comida Mexicana: Tacos e Guacamole",
    "Erros Comuns na Cozinha e Como Evitá-los",
  ],
  noticias: [
    "Últimas do Brasil",
    "Crise Econômica",
    "Eleições Municipais",
    "Clima e Meio Ambiente",
    "Avanços na Saúde",
    "Conflitos Internacionais",
    "Tecnologia e Sociedade",
    "Cultura Pop em Alta",
    "Entrevista com Especialista",
    "Resumo da Semana",
    "Análise da Nova Reforma Tributária",
    "Impacto da Inteligência Artificial no Mercado de Trabalho",
    "As Descobertas Científicas Mais Recentes",
    "Debate Político da Semana",
    "Cobertura de Eventos Climáticos Extremos",
    "Novas Regras para Aposentadoria",
    "A Crise Hídrica Global",
    "Lançamentos do Cinema e Streaming",
    "Resultados Esportivos do Fim de Semana",
    "Entrevista Exclusiva com Governador",
    "O Futuro da Exploração Espacial",
    "Variação da Taxa de Juros e Seus Efeitos",
    "Atualizações sobre a Pandemia",
    "Conflito no Leste Europeu: Análise",
    "O Mercado de Ações em Alta",
    "Desmatamento na Amazônia: Dados Atuais",
    "Novas Leis de Trânsito",
    "Como se Proteger de Golpes Online",
    "Lançamento do Livro da Semana",
    "Os Bastidores do Poder em Brasília",
    "Aumento no Preço dos Combustíveis",
    "Inovações no Tratamento do Câncer",
    "O que Aconteceu na Bolsa de Valores",
    "Protestos ao Redor do Mundo",
    "Resumo das Notícias Internacionais",
    "A Polêmica da Mineração em Terras Indígenas",
    "Ranking das Universidades Brasileiras",
    "Ameaças à Liberdade de Imprensa",
    "Como a Inflação Afeta seu Bolso",
    "Os Destaques da Moda Internacional",
    "Novas Startups Bilionárias",
    "Crise dos Refugiados: Últimos Dados",
    "Eleições no Exterior: Impacto no Brasil",
    "Descoberta de Nova Espécie Marinha",
    "Análise de Segurança Pública",
    "O Escândalo de Vazamento de Dados",
    "Premiações da Música e Cinema",
    "O Avanço das Energias Renováveis",
    "Novas Políticas de Educação",
    "Retrospectiva do Mês",
  ],
};
function generateVideoPool(videosPerCategory = 50) {
  const categories = Object.keys(CATEGORY_LABELS);
  const numCategories = categories.length;
  const pool = [];
  categories.forEach((primaryCat, primaryIdx) => {
    const titles = CATEGORY_LABELS[primaryCat];
    for (let j = 0; j < videosPerCategory; j++) {
      const title = titles[j % titles.length] + ` #${j + 1}`;
      const vector = new Array(numCategories).fill(0);
      vector[primaryIdx] = 0.7 + Math.random() * 0.3;
      if (Math.random() < 0.5) {
        let secondaryIdx;
        do {
          secondaryIdx = Math.floor(Math.random() * numCategories);
        } while (secondaryIdx === primaryIdx);
        vector[secondaryIdx] = 0.3 + Math.random() * 0.4;
      }
      for (let i = 0; i < numCategories; i++) {
        if (vector[i] === 0) {
          vector[i] = Math.random() * 0.2;
        }
      }
      pool.push({ title, vector: normalize(vector) });
    }
  });
  return pool;
}
const videoPool = generateVideoPool(30);

// --- LÓGICA PRINCIPAL DA SIMULAÇÃO ---
const CATEGORIES = [
  { id: "humor", name: "Humor", color: "bg-yellow-500" },
  { id: "danca", name: "Dança", color: "bg-pink-500" },
  { id: "tecnologia", name: "Tecnologia", color: "bg-blue-500" },
  { id: "culinaria", name: "Culinária", color: "bg-green-500" },
  { id: "noticias", name: "Notícias", color: "bg-red-500" },
];

const PERSONAS = [
  {
    nome: "Júlia, a chef",
    icone: "👩‍🍳",
    vetor: normalize([0.1, 0.3, 0.2, 0.9, 0.4]),
  },
  {
    nome: "Marcos, o gamer",
    icone: "🎮",
    vetor: normalize([0.8, 0.2, 0.9, 0.1, 0.3]),
  },
  {
    nome: "Ana, a dançarina",
    icone: "💃",
    vetor: normalize([0.4, 0.9, 0.1, 0.2, 0.1]),
  },
];
const SIMILARITY_THRESHOLD = 0.85;

// DOM Elements
const userVectorViz = document.getElementById("user-vector-viz"),
  videoVectorViz = document.getElementById("video-vector-viz"),
  videoTitleEl = document.getElementById("video-title"),
  videoCategoryEl = document.getElementById("video-category"),
  candidatesList = document.getElementById("recommendation-candidates"),
  progressBar = document.getElementById("video-progress-bar"),
  biasControlsContainer = document.getElementById("bias-controls"),
  personasContainer = document.getElementById("personas-container");
const alphaSlider = document.getElementById("alpha-slider"),
  alphaValue = document.getElementById("alpha-value"),
  epsilonSlider = document.getElementById("epsilon-slider"),
  epsilonValue = document.getElementById("epsilon-value");

// Application State
let userVector = normalize(new Array(CATEGORIES.length).fill(0.5)),
  currentVideo = null,
  alpha = parseFloat(alphaSlider.value),
  epsilon = parseFloat(epsilonSlider.value),
  seenVideos = new Set(),
  profileHistory = [],
  historyChart;
const DECAY_FACTOR = 0.998;
let categoryBiases = {};

function dot(a, b) {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}

function updateUserVector(type, engagementFactor = 1) {
  if (!currentVideo) return;
  userVector = userVector.map((u) => u * DECAY_FACTOR);
  if (type === "skip") {
    const skipPenalty = 1 - engagementFactor;
    const effectiveAlpha = alpha * skipPenalty;
    const v = currentVideo.vector;
    userVector = userVector.map(
      (u, i) => u - effectiveAlpha * v[i] * 0.5
    );
    userVector = normalize(userVector);
    return;
  }
  const effectiveAlpha = alpha * engagementFactor;
  const v = currentVideo.vector;
  if (type === "like") {
    userVector = userVector.map(
      (u, i) => (1 - effectiveAlpha) * u + effectiveAlpha * v[i]
    );
  } else if (type === "dislike") {
    userVector = userVector.map((u, i) => u - effectiveAlpha * v[i]);
  }
  userVector = normalize(userVector);
}

function getRankedVideos() {
  let availableVideos = videoPool.filter(
    (video) => !seenVideos.has(video.title)
  );
  if (availableVideos.length === 0) {
    seenVideos.clear();
    availableVideos = videoPool;
  }

  let bestMatchPersona = null;
  let maxSimilarity = 0;

  PERSONAS.forEach((persona) => {
    const similarity = dot(userVector, persona.vetor);
    if (similarity > maxSimilarity) maxSimilarity = similarity;

    const simPercentage = similarity * 100;
    const simElement = document.getElementById(
      `persona-sim-${persona.nome}`
    );
    const barElement = document.getElementById(
      `persona-bar-${persona.nome}`
    );
    if (simElement)
      simElement.textContent = `${simPercentage.toFixed(0)}%`;
    if (barElement) barElement.style.width = `${simPercentage}%`;

    if (similarity > SIMILARITY_THRESHOLD && !bestMatchPersona) {
      bestMatchPersona = persona;
    }
  });

  let collaborativePickTitle = null;
  if (bestMatchPersona) {
    const personaTopPick = availableVideos.sort(
      (a, b) =>
        dot(b.vector, bestMatchPersona.vetor) -
        dot(a.vector, bestMatchPersona.vetor)
    )[0];
    if (personaTopPick) {
      collaborativePickTitle = personaTopPick.title;
    }
  }

  let ranked = availableVideos.map((video) => {
    const affinity = dot(userVector, video.vector);
    const categoryId =
      CATEGORIES[video.vector.indexOf(Math.max(...video.vector))].id;
    const bias = categoryBiases[categoryId] || 0;
    let finalAffinity = affinity + bias;
    let reason = null;

    if (
      collaborativePickTitle &&
      collaborativePickTitle === video.title
    ) {
      finalAffinity += 0.25;
      reason = { personaName: bestMatchPersona.nome };
    }
    return { ...video, affinity, finalAffinity, reason };
  });

  return ranked.sort((a, b) => b.finalAffinity - a.finalAffinity);
}

function renderVector(container, vec) {
  container.innerHTML = "";
  vec.forEach((val, i) => {
    const percentage = Math.max(0, Math.min(100, val * 100));
    const category = CATEGORIES[i];
    const el = document.createElement("div");
    el.innerHTML = `<div class="flex justify-between text-sm"><span class="font-medium">${category.name
      }</span><span class="font-mono">${val.toFixed(
        2
      )}</span></div><div class="vector-bar-container mt-1"><div class="vector-bar ${category.color
      }" style="width:${percentage}%"></div></div>`;
    container.appendChild(el);
  });
}

function displayVideo(video) {
  currentVideo = video;
  seenVideos.add(video.title);
  progressBar.classList.remove("progress-bar-animate");
  void progressBar.offsetWidth;
  progressBar.classList.add("progress-bar-animate");
  const mainCategoryIndex = video.vector.indexOf(
    Math.max(...video.vector)
  );
  const categoryInfo = CATEGORIES[mainCategoryIndex];
  videoTitleEl.textContent = video.title;
  videoCategoryEl.innerHTML = `Categoria Principal: <span class="font-bold ${categoryInfo.color.replace(
    "bg-",
    "text-"
  )}">${categoryInfo.name}</span>`;
  videoTitleEl.parentElement.style.opacity = 0;
  setTimeout(() => {
    videoTitleEl.parentElement.style.opacity = 1;
  }, 100);
  renderVector(userVectorViz, userVector);
  renderVector(videoVectorViz, video.vector);
}

function updateCandidatesUI(candidates) {
  candidatesList.innerHTML = "";
  if (!candidates || candidates.length === 0) return;
  candidates.forEach((video, index) => {
    const el = document.createElement("li");
    const finalScore = (Math.max(0, video.finalAffinity) * 100).toFixed(
      0
    );

    let reasonHtml = "";
    if (video.reason) {
      reasonHtml = `<div class="text-xs text-purple-600 dark:text-purple-400">✨ Via ${video.reason.personaName}</div>`;
    }

    el.innerHTML = `<div><strong class="w-6 inline-block">${index + 1
      }.</strong> ${video.title
      } <strong class="font-mono text-blue-500">${finalScore}%</strong>${reasonHtml}</div>`;
    candidatesList.appendChild(el);
  });
}

function getTailwindColor(bgColorClass) {
  const colorMap = {
    "bg-yellow-500": "#eab308",
    "bg-pink-500": "#ec4899",
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#22c55e",
    "bg-red-500": "#ef4444",
  };
  return colorMap[bgColorClass] || "#6b7280";
}

function initializeChart() {
  const ctx = document
    .getElementById("profileHistoryChart")
    .getContext("2d");
  historyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: CATEGORIES.map((cat) => ({
        label: cat.name,
        data: [],
        borderColor: getTailwindColor(cat.color),
        fill: false,
        tension: 0.2,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
      })),
    },
    options: {
      animation: { duration: 400 },
      scales: { y: { beginAtZero: true, max: 1 } },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, font: { size: 10 } },
        },
      },
    },
  });
}

function updateChart() {
  if (!historyChart) return;
  profileHistory.push([...userVector]);
  historyChart.data.labels.push(profileHistory.length);
  historyChart.data.datasets.forEach((dataset, index) => {
    dataset.data.push(userVector[index]);
  });
  historyChart.update("none");
}

function resetChart() {
  profileHistory = [];
  if (historyChart) {
    historyChart.data.labels = [];
    historyChart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    historyChart.update("none");
  }
}

function updateRecommendations() {
  const candidates = getRankedVideos();
  updateCandidatesUI(candidates.slice(0, 5));
  return candidates;
}

function initializeBiasControls() {
  CATEGORIES.forEach((cat) => {
    categoryBiases[cat.id] = 0;
    const controlEl = document.createElement("div");
    controlEl.innerHTML = `<label class="block font-semibold mb-1 text-sm">${cat.name}: <span id="bias-value-${cat.id}" class="font-bold text-sky-600 dark:text-sky-400">0%</span></label><input id="bias-slider-${cat.id}" type="range" min="-0.5" max="0.5" step="0.01" value="0" class="w-full h-2 rounded-lg bg-gray-200 dark:bg-gray-700"/>`;
    biasControlsContainer.appendChild(controlEl);
    document
      .getElementById(`bias-slider-${cat.id}`)
      .addEventListener("input", (e) => {
        const biasValue = parseFloat(e.target.value);
        categoryBiases[cat.id] = biasValue;
        document.getElementById(`bias-value-${cat.id}`).textContent = `${(
          biasValue * 100
        ).toFixed(0)}%`;
        updateRecommendations();
      });
  });
}

function initializePersonasUI() {
  PERSONAS.forEach((persona) => {
    const personaEl = document.createElement("div");
    personaEl.className = "flex items-center space-x-3";
    personaEl.innerHTML = `
                    <div class="text-3xl">${persona.icone}</div>
                    <div class="flex-1">
                        <div class="font-bold text-sm text-purple-900 dark:text-purple-200">${persona.nome}</div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                            <div id="persona-bar-${persona.nome}" class="h-full bg-purple-500 rounded-full transition-all duration-500" style="width: 0%;"></div>
                        </div>
                    </div>
                    <div id="persona-sim-${persona.nome}" class="font-mono font-bold text-purple-900 dark:text-purple-200 w-12 text-right">0%</div>
                `;
    personasContainer.appendChild(personaEl);
  });
}

window.handleInteraction = (type) => {
  const parentWidth = progressBar.parentElement.offsetWidth;
  const currentWidth = progressBar.offsetWidth;
  progressBar.classList.remove("progress-bar-animate");
  const progress = parentWidth > 0 ? currentWidth / parentWidth : 0;
  const engagementFactor = 0.5 + progress;
  updateUserVector(type, engagementFactor);
  const candidates = updateRecommendations();
  let nextVideo;
  if (Math.random() < epsilon && candidates.length > 1) {
    nextVideo =
      candidates[Math.floor(Math.random() * (candidates.length - 1)) + 1];
  } else {
    nextVideo = candidates[0];
  }
  if (nextVideo) displayVideo(nextVideo);
  updateChart();
};

window.resetProfile = () => {
  userVector = normalize(new Array(CATEGORIES.length).fill(0.5));
  seenVideos.clear();
  resetChart();
  Object.keys(categoryBiases).forEach((key) => {
    categoryBiases[key] = 0;
  });
  document.querySelectorAll('input[type="range"]').forEach((slider) => {
    if (slider.id.startsWith("bias-slider-")) slider.value = 0;
  });
  document.querySelectorAll('span[id^="bias-value-"]').forEach((span) => {
    span.textContent = "0%";
  });
  const candidates = updateRecommendations();
  const firstVideo = candidates[0];
  if (firstVideo) displayVideo(firstVideo);
  updateChart();
};

alphaSlider.oninput = (e) => {
  alpha = parseFloat(e.target.value);
  alphaValue.textContent = alpha.toFixed(2);
};
epsilonSlider.oninput = (e) => {
  epsilon = parseFloat(e.target.value);
  epsilonValue.textContent = epsilon.toFixed(2);
};

window.onload = () => {
  initializeBiasControls();
  initializePersonasUI();
  initializeChart();
  const rankedVideos = updateRecommendations();
  const firstVideo = rankedVideos[0];
  if (firstVideo) {
    displayVideo(firstVideo);
    updateChart();
  }
};