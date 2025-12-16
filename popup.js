const statusEl = document.getElementById('status');

document.getElementById('filter').addEventListener('click', () => {
  withActiveTab(tabId => {
    chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      files: ["src/filter.js"]
    }).then(results => {
      const totalRemoved = sum(results, "removed");
      statusEl.textContent = `${totalRemoved} carte(s) cachée(s).`;
    }).catch(err => {
      statusEl.textContent = "Erreur: " + err.message;
    });
  });
});

document.getElementById('reset').addEventListener('click', () => {
  withActiveTab(tabId => {
    chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      files: ["src/unfilter.js"]
    }).then(results => {
      const lists = sum(results, "restoredLists");
      const items = sum(results, "restoredItems");
      statusEl.textContent = `${items} carte(s) restaurée(s) sur ${lists} liste(s).`;
    }).catch(err => {
      statusEl.textContent = "Erreur: " + err.message;
    });
  });
});
