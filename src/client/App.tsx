import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <div>Hello World</div>;
}

function render() {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found in the document");
    }
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error("Failed to render the application:", error);
    document.body.innerHTML = "<h1>Application Error: Could not initialize</h1>";
  }
}

render();
