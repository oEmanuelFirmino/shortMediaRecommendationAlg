// --- ARQUITETURA DE FEATURES (CATEGORIAS + TAGS) ---
const CATEGORIES = [
  { id: "humor", name: "Humor", color: "bg-yellow-500" },
  { id: "danca", name: "Dança", color: "bg-pink-500" },
  { id: "tecnologia", name: "Tecnologia", color: "bg-blue-500" },
  { id: "culinaria", name: "Culinária", color: "bg-green-500" },
  { id: "noticias", name: "Notícias", color: "bg-red-500" },
  { id: "esportes", name: "Esportes", color: "bg-indigo-500" },
];
const TAGS = [
  { id: "rapido", name: "Rápido", color: "bg-orange-500" },
  { id: "tutorial", name: "Tutorial", color: "bg-orange-500" },
  { id: "iniciante", name: "Iniciante", color: "bg-orange-500" },
  { id: "avancado", name: "Avançado", color: "bg-orange-500" },
  { id: "review", name: "Review", color: "bg-orange-500" },
  { id: "inspirador", name: "Inspirador", color: "bg-orange-500" },
  { id: "analise", name: "Análise", color: "bg-orange-500" },
  { id: "desafio", name: "Desafio", color: "bg-orange-500" },
];
const ALL_FEATURES = [...CATEGORIES, ...TAGS];
const TAG_MAPPING = {
  humor: ["rapido", "desafio"],
  danca: ["inspirador", "tutorial", "desafio"],
  tecnologia: ["review", "iniciante", "avancado", "analise"],
  culinaria: ["rapido", "tutorial", "iniciante"],
  noticias: ["analise", "inspirador"],
  esportes: ["rapido", "desafio", "analise", "inspirador"],
};

// --- MÓDULO DE GERAÇÃO DE VÍDEOS (CORRIGIDO E SIMPLIFICADO) ---
function normalize(vec) {
  const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
  return mag === 0 ? vec : vec.map((v) => v / mag);
}

function generateVideoPool(videosPerCategory = 10) {
  const pool = [];
  CATEGORIES.forEach((cat) => {
    for (let j = 0; j < videosPerCategory; j++) {
      const vector = new Array(ALL_FEATURES.length).fill(0);
      // 1. Categoria Principal
      const catIndex = ALL_FEATURES.findIndex((f) => f.id === cat.id);
      if (catIndex !== -1) vector[catIndex] = 0.6 + Math.random() * 0.4;

      // 2. Tags Relevantes
      const videoTags = [];
      const possibleTags = TAG_MAPPING[cat.id];
      if (possibleTags && possibleTags.length > 0) {
        const tagId =
          possibleTags[Math.floor(Math.random() * possibleTags.length)];
        const tagIndex = ALL_FEATURES.findIndex((f) => f.id === tagId);
        if (tagIndex !== -1) {
          vector[tagIndex] = 0.5 + Math.random() * 0.3;
          videoTags.push(ALL_FEATURES[tagIndex].name);
        }
      }

      // 3. Ruído
      vector.forEach((val, i) => {
        if (val === 0) vector[i] = Math.random() * 0.1;
      });
      const title = `Vídeo sobre ${cat.name} ${videoTags.length > 0 ? `(${videoTags[0]})` : ""
        } #${j + 1}`;
      pool.push({
        title: title,
        vector: normalize(vector),
        tags: videoTags,
      });
    }
  });
  return pool;
}
const videoPool = generateVideoPool(30);

// --- LÓGICA PRINCIPAL DA SIMULAÇÃO ---
const userVectorViz = document.getElementById("user-vector-viz"),
  videoVectorViz = document.getElementById("video-vector-viz"),
  videoTagsEl = document.getElementById("video-tags"),
  videoTitleEl = document.getElementById("video-title"),
  candidatesList = document.getElementById("recommendation-candidates"),
  progressBar = document.getElementById("video-progress-bar"),
  controlsContainer = document.getElementById("controls-container");

let userVector,
  currentVideo,
  alpha,
  epsilon,
  seenVideos,
  profileHistory,
  historyChart,
  featureBiases;

function initializeState() {
  userVector = normalize(new Array(ALL_FEATURES.length).fill(0.5));
  currentVideo = null;
  seenVideos = new Set();
  profileHistory = [];
  featureBiases = {};
  ALL_FEATURES.forEach((f) => (featureBiases[f.id] = 0));
}

function dot(a, b) {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}

function updateUserVector(type, engagementFactor = 1) {
  if (!currentVideo) return;
  const decayFactor = 0.998;
  userVector = userVector.map((u) => u * decayFactor);
  if (type === "skip") {
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
  const ranked = availableVideos.map((video) => {
    const affinity = dot(userVector, video.vector);
    let finalAffinity = affinity;
    video.vector.forEach((value, index) => {
      if (value > 0.1) {
        const featureId = ALL_FEATURES[index].id;
        finalAffinity += featureBiases[featureId] || 0;
      }
    });
    return { ...video, affinity, finalAffinity };
  });
  return ranked.sort((a, b) => b.finalAffinity - a.finalAffinity);
}

function renderVector(container, vec) {
  container.innerHTML = "";
  const catContainer = document.createElement("div");
  const tagContainer = document.createElement("div");
  catContainer.innerHTML = `<h4 class="font-bold text-sm mt-2">Categorias</h4>`;
  tagContainer.innerHTML = `<h4 class="font-bold text-sm mt-2">Tags</h4>`;

  vec.forEach((val, i) => {
    const feature = ALL_FEATURES[i];
    const el = document.createElement("div");
    el.innerHTML = `<div class="flex justify-between text-xs"><span class="font-medium">${feature.name
      }</span><span class="font-mono">${val.toFixed(
        2
      )}</span></div><div class="vector-bar-container mt-1"><div class="vector-bar ${feature.color
      }" style="width:${Math.max(0, val * 100)}%"></div></div>`;
    if (i < CATEGORIES.length) catContainer.appendChild(el);
    else tagContainer.appendChild(el);
  });
  container.appendChild(catContainer);
  container.appendChild(tagContainer);
}

function displayVideo(video) {
  currentVideo = video;
  seenVideos.add(video.title);
  progressBar.classList.remove("progress-bar-animate");
  void progressBar.offsetWidth;
  progressBar.classList.add("progress-bar-animate");
  videoTitleEl.textContent = video.title;
  videoTagsEl.textContent = video.tags.join(" • ");
  renderVector(userVectorViz, userVector);
  renderVector(videoVectorViz, video.vector);
}

function updateCandidatesUI(candidates) {
  candidatesList.innerHTML = "";
  if (!candidates || candidates.length === 0) return;
  candidates.slice(0, 5).forEach((video, index) => {
    const el = document.createElement("li");
    const finalScore = (Math.max(0, video.finalAffinity) * 100).toFixed(
      0
    );
    el.innerHTML = `<div><strong class="w-6 inline-block">${index + 1
      }.</strong> ${video.title
      } <strong class="font-mono text-blue-500">${finalScore}%</strong></div>`;
    candidatesList.appendChild(el);
  });
}

function initializeControls() {
  controlsContainer.innerHTML = `
                <div class="mb-4">
                    <label class="block font-semibold mb-1 text-sm">Taxa de Aprendizagem (α): <span id="alpha-value" class="font-bold text-blue-500">0.10</span></label>
                    <input id="alpha-slider" type="range" min="0.01" max="1" step="0.01" value="0.1" class="w-full h-2 rounded-lg bg-gray-200 dark:bg-gray-700"/>
                </div>
                <div class="mb-4">
                    <label class="block font-semibold mb-1 text-sm">Taxa de Exploração (ε): <span id="epsilon-value" class="font-bold text-green-500">0.20</span></label>
                    <input id="epsilon-slider" type="range" min="0" max="1" step="0.01" value="0.2" class="w-full h-2 rounded-lg bg-gray-200 dark:bg-gray-700"/>
                </div>
                <hr class="my-4 border-sky-300 dark:border-sky-700"/>
                <div id="bias-controls"></div>
            `;
  const biasControlsContainer = document.getElementById("bias-controls");
  biasControlsContainer.innerHTML =
    '<h3 class="font-bold text-lg text-sky-800 dark:text-sky-300 mb-2">Painel de Bias</h3>';

  ALL_FEATURES.forEach((feature) => {
    const controlEl = document.createElement("div");
    controlEl.innerHTML = `<label class="block font-semibold text-xs mb-1">${feature.name}: <span id="bias-value-${feature.id}" class="font-bold text-sky-600 dark:text-sky-400">0%</span></label><input id="bias-slider-${feature.id}" type="range" min="-0.5" max="0.5" step="0.01" value="0" class="w-full h-2 rounded-lg bg-gray-200 dark:bg-gray-700"/>`;
    biasControlsContainer.appendChild(controlEl);
    document
      .getElementById(`bias-slider-${feature.id}`)
      .addEventListener("input", (e) => {
        const biasValue = parseFloat(e.target.value);
        featureBiases[feature.id] = biasValue;
        document.getElementById(
          `bias-value-${feature.id}`
        ).textContent = `${(biasValue * 100).toFixed(0)}%`;
        updateRecommendations();
      });
  });

  document
    .getElementById("alpha-slider")
    .addEventListener("input", (e) => {
      alpha = parseFloat(e.target.value);
      document.getElementById("alpha-value").textContent =
        alpha.toFixed(2);
    });
  document
    .getElementById("epsilon-slider")
    .addEventListener("input", (e) => {
      epsilon = parseFloat(e.target.value);
      document.getElementById("epsilon-value").textContent =
        epsilon.toFixed(2);
    });
  alpha = parseFloat(document.getElementById("alpha-slider").value);
  epsilon = parseFloat(document.getElementById("epsilon-slider").value);
}

function getTailwindColor(bgColorClass) {
  const colorMap = {
    "bg-yellow-500": "#eab308",
    "bg-pink-500": "#ec4899",
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#22c55e",
    "bg-red-500": "#ef4444",
    "bg-indigo-500": "#6366f1",
    "bg-purple-500": "#a855f7",
    "bg-teal-500": "#14b8a6",
    "bg-orange-500": "#f97316",
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
      datasets: ALL_FEATURES.map((f) => ({
        label: f.name,
        data: [],
        borderColor: getTailwindColor(f.color),
        hidden: TAGS.some((t) => t.id === f.id),
        fill: false,
        tension: 0.2,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
      })),
    },
    options: {
      animation: false,
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
  updateCandidatesUI(candidates);
  return candidates;
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
  initializeState();
  const biasSliders = document.querySelectorAll(
    '#bias-controls input[type="range"]'
  );
  biasSliders.forEach((slider) => (slider.value = 0));
  const biasValues = document.querySelectorAll(
    '#bias-controls span[id^="bias-value-"]'
  );
  biasValues.forEach((span) => (span.textContent = "0%"));
  resetChart();
  const candidates = updateRecommendations();
  if (candidates[0]) {
    displayVideo(candidates[0]);
    updateChart();
  }
};

window.onload = () => {
  initializeState();
  initializeControls();
  initializeChart();
  const rankedVideos = updateRecommendations();
  const firstVideo = rankedVideos[0];
  if (firstVideo) {
    displayVideo(firstVideo);
    updateChart();
  }
};
