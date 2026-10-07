# Tinkercad Arduino Enhancer 🧠⚡

A lightweight, DOM-injected browser extension that introduces IDE-level features—such as intelligent autocompletion, bracket matching, and reusable snippets—directly into Tinkercad's native CodeMirror simulation editor.

## 🎯 The Problem vs. The Solution
While Tinkercad is an excellent platform for hardware simulation, its default code editor lacks modern syntax assistance, leading to workflow inefficiencies and syntax errors during prototyping. This extension solves that by acting as a silent middleware layer, reducing manual typing and accelerating script-based simulations without degrading browser performance.

## ⚙️ Technical Architecture
*   **Targeted Injection:** Utilizes a `manifest.json` configuration to strictly limit content script execution to `*://*.tinkercad.com/*`, ensuring zero memory overhead on other web pages.
*   **Asynchronous DOM Polling:** The `content.js` script actively polls the DOM for the `.CodeMirror-lines` class, ensuring Tinkercad's native editor is fully rendered before injecting the custom UI logic.
*   **Event-Driven Syncing:** The `inject.js` module maps custom Arduino C++ commands (e.g., `LiquidCrystal`, `digitalWrite`). Custom keydown listeners handle bracket pairing and immediately dispatch native `input` events to force Tinkercad's backend to sync the injected text.

## ✨ Key Features
*   **Intelligent Autocompletion:** Real-time suggestions for Arduino functions and custom setup snippets (LCD, Keypad, I2C).
*   **Auto-Closing Syntax:** Automatically pairs parentheses `()`, braces `{}`, and quotes `" "` to prevent compilation errors.
*   **Zero-Lag Integration:** Built using CodeMirror dependencies directly to match Tinkercad's underlying infrastructure, ensuring native-feeling performance.

## 🧩 Local Installation
1. Clone or download this repository.
2. Navigate to `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode** in the top right.
4. Click **"Load unpacked"** and select this project directory.
