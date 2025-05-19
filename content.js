function waitForEditorLoad(callback) {
    const checkInterval = setInterval(() => {
        if (document.querySelector(".CodeMirror-lines")) {  
            clearInterval(checkInterval);
            callback();
        }
    }, 500); // Checks every 500ms
}

waitForEditorLoad(() => {
    console.log("Editor Loaded!");
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js");
    document.head.appendChild(script);
});
