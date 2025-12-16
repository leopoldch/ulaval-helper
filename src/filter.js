function filter() {
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

filter();