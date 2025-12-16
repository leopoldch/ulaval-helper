function withActiveTab(fn) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs && tabs[0];
    if (!tab || !tab.id) {
      statusEl.textContent = "Aucun onglet actif.";
      return;
    }
    fn(tab.id);
  });
}

function sum(results, key) {
  return (results || []).reduce((n, r) => n + ((r && r.result && r.result[key]) || 0), 0);
}