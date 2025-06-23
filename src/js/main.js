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
      const title = titles[j % titles.length];
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

const videoPool = generateVideoPool(50);

// --- LÓGICA PRINCIPAL DA SIMULAÇÃO ---

const CATEGORIES = [
  { id: "humor", name: "Humor", color: "bg-yellow-500" },
  { id: "danca", name: "Dança", color: "bg-pink-500" },
  { id: "tecnologia", name: "Tecnologia", color: "bg-blue-500" },
  { id: "culinaria", name: "Culinária", color: "bg-green-500" },
  { id: "noticias", name: "Notícias", color: "bg-red-500" },
];

const alphaSlider = document.getElementById("alpha-slider");
const alphaValue = document.getElementById("alpha-value");
const epsilonSlider = document.getElementById("epsilon-slider");
const epsilonValue = document.getElementById("epsilon-value");
const affinityBar = document.getElementById("affinity-bar");
const affinityScoreEl = document.getElementById("affinity-score");
const userVectorViz = document.getElementById("user-vector-viz");
const videoVectorViz = document.getElementById("video-vector-viz");
const videoTitleEl = document.getElementById("video-title");
const videoCategoryEl = document.getElementById("video-category");

let userVector = normalize(new Array(CATEGORIES.length).fill(0.5));
let currentVideo = null;
let alpha = parseFloat(alphaSlider.value);
let epsilon = parseFloat(epsilonSlider.value);
let seenVideos = new Set(); // NOVO: A "memória" do algoritmo

function dot(a, b) {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}

function updateUserVector(type) {
  if (!currentVideo || type === "skip") return;
  const v = currentVideo.vector;
  if (type === "like") {
    userVector = userVector.map((u, i) => (1 - alpha) * u + alpha * v[i]);
  } else if (type === "dislike") {
    userVector = userVector.map((u, i) => u - alpha * v[i]);
  }
  userVector = normalize(userVector);
}

/**
 * Recomenda o próximo vídeo, evitando os que já foram vistos.
 * // MODIFICADO
 */
function recommend() {
  // 1. Filtra os vídeos para pegar apenas os que não foram vistos
  let availableVideos = videoPool.filter(
    (video) => !seenVideos.has(video.title)
  );

  // 2. Se não houver vídeos disponíveis, limpa a memória e recomeça
  if (availableVideos.length === 0) {
    console.log(
      "Todos os vídeos foram vistos! Reiniciando o ciclo de recomendações."
    );
    seenVideos.clear();
    availableVideos = videoPool;
  }

  // 3. Calcula a afinidade e ordena os vídeos DISPONÍVEIS
  const scoredVideos = availableVideos
    .map((video) => ({
      ...video,
      affinity: dot(userVector, video.vector),
    }))
    .sort((a, b) => b.affinity - a.affinity);

  // 4. Lógica de Exploração (Epsilon-Greedy)
  let selection;
  if (Math.random() < epsilon && scoredVideos.length > 1) {
    const randomIndex =
      Math.floor(Math.random() * (scoredVideos.length - 1)) + 1;
    selection = scoredVideos[randomIndex];
  } else {
    selection = scoredVideos[0];
  }

  return selection;
}

function renderVector(container, vec) {
  container.innerHTML = "";
  vec.forEach((val, i) => {
    const percentage = Math.max(0, Math.min(100, val * 100));
    const category = CATEGORIES[i];
    const el = document.createElement("div");
    el.innerHTML = `
                    <div class="flex justify-between text-sm">
                        <span class="font-medium">${category.name}</span>
                        <span class="font-mono">${val.toFixed(2)}</span>
                    </div>
                    <div class="vector-bar-container mt-1">
                        <div class="vector-bar ${category.color
      }" style="width:${percentage}%"></div>
                    </div>`;
    container.appendChild(el);
  });
}

/**
 * Exibe o vídeo e o adiciona à lista de vistos.
 * // MODIFICADO
 */
function displayVideo(video) {
  currentVideo = video;
  seenVideos.add(video.title); // NOVO: Adiciona o vídeo à memória

  const affinity = dot(userVector, video.vector);
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

  affinityBar.style.width = `${Math.max(0, affinity) * 100}%`;
  affinityScoreEl.textContent = affinity.toFixed(2);
}

// --- MANIPULADORES DE EVENTOS ---

window.handleInteraction = (type) => {
  updateUserVector(type);
  const nextVideo = recommend();
  displayVideo(nextVideo);
};

/**
 * Reseta o perfil e também a memória de vídeos vistos.
 * // MODIFICADO
 */
window.resetProfile = () => {
  userVector = normalize(new Array(CATEGORIES.length).fill(0.5));
  seenVideos.clear(); // NOVO: Limpa a memória
  const nextVideo = recommend();
  displayVideo(nextVideo);
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
  const firstVideo = recommend();
  displayVideo(firstVideo);
};