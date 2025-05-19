let script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/hint/show-hint.js";
document.head.appendChild(script);

let css = document.createElement("link");
css.rel = "stylesheet";
css.href = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/hint/show-hint.css";
document.head.appendChild(css);

let editors = document.querySelectorAll('.CodeMirror');
console.log("Editors found:", editors);

let cm = editors[0].CodeMirror;
console.log("CodeMirror instance:", cm);

cm.setOption("hintOptions", { completeSingle: false });

// --- AUTOCOMPLETION COMMANDS ---
let commands = [
    "pinMode();", "digitalWrite();", "delay();", "bitRead();", "lcd.begin();",
    "lcd.setCursor();", "lcd.print();", "lcd.clear();", "lcd.scrollDisplayLeft();",
    "lcd.rightToLeft();", "lcd.write();", "Serial.available();", "Serial.begin();",
    "Serial.read();","Serial.print();", "keyy.getKey();", "lcd.init();", "lcd.backlight();",
    "Wire.begin();", "Wire.onReceive();", "Wire.available();", "Wire.read();",
    "Wire.beginTransmission();", "Wire.write();", "Wire.endTransmission();",
    "tone();", "lcd.createChar();", "randomSeed();", "analogRead();", "millis();"
];

// --- CODE SNIPPETS ---
let snippets = {
    "lcd_setup": "LiquidCrystal lcd(7, 8, 9, 10, 11, 12);\nvoid setup() {\n  lcd.begin(16, 2);\n}\n",
    "lcd_i2c_setup": "#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27, 16, 2);\nvoid setup() {\n  lcd.init();\n  lcd.backlight();\n}\n",
    "keypad_setup": "#include <Keypad.h>\nconst byte ROWS = 4;\nconst byte COLS = 4;\nchar keys[ROWS][COLS] = {\n  {'1', '2', '3', 'A'},\n  {'4', '5', '6', 'B'},\n  {'7', '8', '9', 'C'},\n  {'*', '0', '#', 'D'}\n};\nbyte rowPins[ROWS] = {9, 8, 7, 6};\nbyte colPins[COLS] = {5, 4, 3, 2};\nKeypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);\nvoid setup() {\n  Serial.begin(9600);\n}\n",
    "setup_loop": "void setup() {\n  // Initialization code here\n}\nvoid loop() {\n  // Main code here\n}\n",
    "for_loop": "for (int i = 0; i < N; i++) {\n  // Loop body\n}\n",
    "while_loop": "while () {\n  // Loop body\n}\n",
    "do_while_loop": "do {\n  // Loop body\n} while ();",
    "if_condition": "if () {\n  // Condition body\n}\n",
    "if_else_condition": "if () {\n  // Condition body\n} else {\n  // Else body\n}\n",
    "if_else_if": "if () {\n  // Condition body\n} else if () {\n  // Else-if body\n} else {\n  // Else body\n}\n",
    "define_directive": "#define ",
    "include_directive": "#include<>",
    "freeze": "while(1) {}"
};

CodeMirror.registerHelper("hint", "arduino", function (editor) {
    let cursor = editor.getCursor();
    let token = editor.getTokenAt(cursor);

    // Merge commands and snippets
    let keywords = [...commands, ...Object.keys(snippets)];

    let list = keywords.filter(k => k.startsWith(token.string)).map(k => ({
        text: snippets[k] || k,
        displayText: k,  
        from: CodeMirror.Pos(cursor.line, token.start),
        to: CodeMirror.Pos(cursor.line, token.end),
        hint: function(cm, data, completion) {
    // Select the word being autocompleted
    cm.setSelection(completion.from, completion.to);

    // Replace it using replaceSelection so it triggers internal syncing
    cm.replaceSelection(completion.text);

    // Dispatch an 'input' event to sync with Tinkercad backend
    const inputField = cm.getInputField();
    inputField.dispatchEvent(new Event("input", { bubbles: true }));

    // Move cursor inside parentheses if present
    const openBracketIndex = completion.text.indexOf("(");
    if (openBracketIndex !== -1) {
        const cursor = cm.getCursor();
        cm.setCursor({
            line: cursor.line,
            ch: cursor.ch - (completion.text.length - openBracketIndex - 1)
        });
    }
}




    }));

    return { list, from: CodeMirror.Pos(cursor.line, token.start), to: CodeMirror.Pos(cursor.line, token.end) };
});

cm.setOption("extraKeys", {
    "Tab": function(cm) { cm.showHint({ hint: CodeMirror.hint.arduino }); }
});

cm.on("change", function(editor, change) {
    const isTyping = change.origin === "+input" && change.text.length === 1 && change.text[0].length === 1;
    if (isTyping) {
        setTimeout(() => editor.showHint({ hint: CodeMirror.hint.arduino }), 100);
    }
});



setTimeout(() => {
    let editors = document.querySelectorAll('.CodeMirror');
    editors.forEach(editor => {
        let cm = editor.CodeMirror;
        if (cm) {
            cm.on("keydown", (cm, event) => {
                let cursor = cm.getCursor();
                let ch = cursor.ch;
                let line = cm.getLine(cursor.line);

                // Auto-closing brackets logic
                const pairs = {
                    "(": ")",
                    "{": "}",
                    "[": "]",
                    "\"": "\"",
                    "'": "'"
                };

                if (pairs[event.key]) {
                    event.preventDefault();
                
                    const closeChar = pairs[event.key];
                
                    cm.replaceSelection(event.key + closeChar);
                    cm.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
                
                    // Force Tinkercad to sync the insert
                    const inputField = cm.getInputField();
                    inputField.dispatchEvent(new Event("input", { bubbles: true }));
                }
                

                // CTRL + ENTER: Add semicolon if missing, then move to next line
                if (event.ctrlKey && event.key === "Enter") {
                    if (!line.trim().endsWith(";")) {
                        cm.replaceRange(";", { line: cursor.line, ch: line.length });
                    }
                    cm.replaceRange("\n", { line: cursor.line, ch: line.length + 1 });
                    cm.setCursor({ line: cursor.line + 1, ch: 0 });
                    event.preventDefault();
                }

                
            });
        }
    });
}, 2000);
