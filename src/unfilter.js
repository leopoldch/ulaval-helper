function unfilter() {
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

unfilter();