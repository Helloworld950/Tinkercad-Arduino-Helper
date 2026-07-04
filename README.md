# Tinkercad Code Editor Enhancer 🧠⚡

A browser extension that supercharges the Tinkercad code editor with features like autocompletion, intelligent bracket pairing, and Arduino code snippets — making your coding experience smoother and smarter.

---

## ✨ Features

- 🧠 **Intelligent Autocompletion**  
  Arduino functions and custom code snippets appear as you type.

- 🔁 **Auto-Closing Brackets & Quotes**  
  Automatically inserts matching parentheses `()`, braces `{}`, quotes `" "` and more.

- ⚙️ **Snippets for Arduino Setup**  
  Includes common patterns like `setup/loop`, `LCD`, `Keypad`, and I2C setups.

- 💾 **Persistent and Synced Edits**  
  Ensures your autocompleted code is properly saved and reflected by Tinkercad.

---

## 🧩 Installation

### Option 1: Load as Unpacked Extension
1. Clone or download this repository.
2. Open your browser and go to `chrome://extensions` or `edge://extensions`.
3. Enable **Developer mode**.
4. Click **"Load unpacked"** and select the project folder.

> 📁 Make sure the folder contains:
> - `manifest.json`
> - `content.js`
> - `inject.js`
> - `icon.png`

---

## 🛠 Usage

1. Open [Tinkercad](https://www.tinkercad.com) and go to a code project.
2. Start typing an Arduino command like `digitalW...` or `Serial.`  
   The autocompletion dropdown will appear.
3. Press `Tab` or click on a suggestion to insert it.
4. Use quotes, parentheses, or brackets — they'll auto-close!

---

## 📦 Snippet Examples

- `setup_loop`  
  ```cpp
  void setup() {
    // Initialization code here
  }

  void loop() {
    // Main code here
  }
  ```

---

## 🙌 Author & Credits

Developed with ❤️ by Mohit Raj
Idea, code, integration, and enhancement system are original and created from scratch.


---

## 🚫 License

This project and its contents are © 2025 Helloworld950.  
All rights reserved.  
Copying, distribution, or use outside personal, non-commercial Tinkercad projects is strictly prohibited.  
See the LICENSE file for details.

---
