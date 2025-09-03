const els = {
  searchBtn: document.getElementById("search"),
  input: document.getElementById("keyword"),
  resultsSection: document.getElementById("results-section"),
  resultsGrid: document.getElementById("results-grid"),
  resultCount: document.getElementById("result-count"),
  downloadBtn: document.getElementById("download-json"),
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  empty: document.getElementById("empty-state"),
};

let lastResults = [];
let currentController = null;

function setLoading(isLoading) {
  els.loading.classList.toggle("hidden", !isLoading);
  els.searchBtn.disabled = isLoading;
}

function hideResults() {
  els.resultsSection.classList.add("hidden");
}

function resetResultsUI() {
  lastResults = [];
  els.resultsGrid.innerHTML = "";
  els.resultCount.textContent = "0";
  els.downloadBtn.disabled = true;
  els.empty.classList.add("hidden");
}

function beginNewSearchUI() {
  hideResults();
  resetResultsUI();
  els.error.classList.add("hidden");
  setLoading(true);
}

function showError(msg) {
  els.error.textContent = msg;
  els.error.classList.remove("hidden");
}

function renderResults(results) {
  lastResults = results || [];
  els.resultsGrid.innerHTML = "";
  els.resultCount.textContent = lastResults.length;
  els.downloadBtn.disabled = lastResults.length === 0;

  if (lastResults.length === 0) {
    els.empty.classList.remove("hidden");
    els.resultsSection.classList.remove("hidden");
    return;
  } else {
    els.empty.classList.add("hidden");
  }

  const frag = document.createDocumentFragment();
  lastResults.forEach((r, i) => {
    const card = document.createElement("article");
    card.className = "result-card";
    card.setAttribute("role", "listitem");

    const title = document.createElement("a");
    title.className = "result-title";
    title.href = r.link;
    title.target = "_blank";
    title.rel = "noopener noreferrer";
    title.textContent = r.title || `Result ${i + 1}`;

    const url = document.createElement("p");
    url.className = "result-url";
    url.textContent = r.link;

    const snippet = document.createElement("p");
    snippet.className = "result-snippet";
    snippet.textContent = r.snippet || "No description available.";

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const openBtn = document.createElement("a");
    openBtn.className = "btn small";
    openBtn.href = r.link;
    openBtn.target = "_blank";
    openBtn.rel = "noopener noreferrer";
    openBtn.textContent = "Open";
    actions.appendChild(openBtn);

    card.appendChild(title);
    card.appendChild(url);
    card.appendChild(snippet);
    card.appendChild(actions);
    frag.appendChild(card);
  });

  els.resultsGrid.appendChild(frag);
  els.resultsSection.classList.remove("hidden");
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(lastResults, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "search_results.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function fetchResults(keyword, signal) {
  try {
    const response = await fetch("./fetch-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
      signal,
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error || "Failed to fetch results");
    }

    renderResults(data.results);
  } catch (err) {
    if (err.name !== "AbortError") {
      showError(err.message || "Unexpected error");
    }
  } finally {
    setLoading(false);
  }
}

function startSearch() {
  const keyword = els.input.value.trim();
  if (!keyword) {
    showError("Please enter a keyword");
    return;
  }

  if (currentController) currentController.abort();
  currentController = new AbortController();

  beginNewSearchUI();
  fetchResults(keyword, currentController.signal);
}

els.searchBtn.addEventListener("click", startSearch);

els.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    startSearch();
  }
});

els.downloadBtn.addEventListener("click", downloadJSON);
