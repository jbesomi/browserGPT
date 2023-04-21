function createPanel() {
  const panel = document.createElement("div");
  panel.id = "my-chrome-extension-panel";
  panel.style.width = "20%";
  panel.style.height = "100%";
  panel.style.backgroundColor = "#f5f5f5";
  panel.style.position = "fixed";
  panel.style.top = "0";
  panel.style.right = "0";
  panel.style.zIndex = "10000";
  panel.style.overflowY = "scroll";
  panel.style.padding = "10px";
  panel.style.boxSizing = "border-box";
  document.body.appendChild(panel);
}

function injectReactApp() {
  const appContainer = document.createElement("div");
  appContainer.id = "my-chrome-extension-root";
  document
    .getElementById("my-chrome-extension-panel")
    .appendChild(appContainer);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "toggle") {
    const panel = document.getElementById("my-chrome-extension-panel");
    if (panel) {
      panel.remove();
    } else {
      createPanel();
      injectReactApp();
    }
  }
});
