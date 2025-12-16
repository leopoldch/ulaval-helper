# uLaval Helper 🎓

[![Version](https://img.shields.io/badge/Version-1.3.1-green)](https://github.com/your-user/your-repo/releases) 
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A simple and efficient browser extension designed to filter Laval University courses by session on the official website.

## Features

This extension adds two convenient buttons to your browser when you are on the Université Laval course pages:

* **Filter (session)**: Hides all course cards that do not display visible session information, allowing you to focus on currently planned courses.
* **Unfilter (Défiltrer)**: Restores all hidden course cards to return to the original display.

## Installation

The extension is available for both Chrome and Firefox.

### Google Chrome (Chrome Web Store)

[Link to the Chrome Web Store]

### Mozilla Firefox (Mozilla Add-ons)

[Link to Mozilla Add-ons (AMO)]

---

## How to Use ?

1.  **Open the course page:** Navigate to the Université Laval course page (the extension is restricted to the domain `https://www.ulaval.ca/*`).
2.  **Click the icon:** Click on the **uLaval Helper** extension icon in your toolbar. The popup will open.
3.  **Filter:** Click the **Filter (session)** button. The content script (`src/filter.js`) is executed in the active tab to hide non-session-specific cards.
4.  **Unfilter:** Click the **Unfilter** button to restore all courses.

The operation status is displayed at the bottom of the popup, for example: "15 card(s) hidden."

---

## Development and Structure

The project is split into several files for improved maintainability:

* `popup.html` and `popup.js`: Handle the popup UI and event listeners.
* `src/utils.js`: Contains utility functions like `withActiveTab` (for interacting with the active tab) and `sum` (for aggregating results from injected scripts).
* `src/filter.js`: The injected script that executes the course filtering logic.
* `src/unfilter.js`: The injected script that restores hidden courses by checking for the `data-cours-filter-backup` attribute.

### Build and Deployment

This project uses a CI/CD pipeline via GitHub Actions to automatically update the version number and publish to both the Chrome Web Store and Firefox Add-ons (AMO).

---

## Contact

For any questions, suggestions, or to report bugs, please open an issue on this repository.

> Copyright (c) 2025 Léopold Chappuis
