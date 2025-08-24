const statusEl = document.getElementById('status');

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

function FILTER_FUNC() {
  const LIST_SELECTOR = ".fe--liste-cours";
  const ITEM_SELECTOR = ".fe--liste-cours > li";
  const CARD_SELECTOR = ".cours-carte";
  const SESSION_SELECTOR = ".cours-carte--avantages .session";
  const BACKUP_ATTR = "data-cours-filter-backup";

  let removed = 0;

  document.querySelectorAll(LIST_SELECTOR).forEach(ul => {
    if (!ul.hasAttribute(BACKUP_ATTR)) {
      ul.setAttribute(BACKUP_ATTR, ul.innerHTML);
    }

    ul.querySelectorAll(ITEM_SELECTOR).forEach(li => {
      const carte = li.querySelector(CARD_SELECTOR);
      const hasSession = carte && carte.querySelector(SESSION_SELECTOR);
      if (!hasSession) {
        li.remove();
        removed++;
      }
    });
  });

  return { removed };
}

function UNFILTER_FUNC() {
  const LIST_SELECTOR = ".fe--liste-cours";
  const BACKUP_ATTR = "data-cours-filter-backup";
  let restoredLists = 0;
  let restoredItems = 0;

  document.querySelectorAll(LIST_SELECTOR).forEach(ul => {
    const backup = ul.getAttribute(BACKUP_ATTR);
    if (backup != null) {
      const tmp = document.createElement("ul");
      tmp.innerHTML = backup;
      restoredItems += tmp.querySelectorAll(":scope > li").length;

      ul.innerHTML = backup;
      ul.removeAttribute(BACKUP_ATTR);
      restoredLists++;
    }
  });

  return { restoredLists, restoredItems };
}

document.getElementById('filter').addEventListener('click', () => {
  withActiveTab(tabId => {
    chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      func: FILTER_FUNC
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
      func: UNFILTER_FUNC
    }).then(results => {
      const lists = sum(results, "restoredLists");
      const items = sum(results, "restoredItems");
      statusEl.textContent = `${items} carte(s) restaurée(s) sur ${lists} liste(s).`;
    }).catch(err => {
      statusEl.textContent = "Erreur: " + err.message;
    });
  });
});
