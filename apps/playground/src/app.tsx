import { useState } from "react";
import { COMPONENTS } from "./component-registry";

type ComponentId = (typeof COMPONENTS)[number]["id"];

export function App() {
  const [activeId, setActiveId] = useState<ComponentId>(COMPONENTS[0].id);
  const [copied, setCopied] = useState(false);

  const active = COMPONENTS.find((c) => c.id === activeId)!;
  const { controls, preview, code } = active.component();

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="playground">
      <header className="playground-header">
        <h1>
          <span>react-kino</span> playground
        </h1>
        <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
          docs &uarr;
        </a>
      </header>

      <div className="playground-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>Component</h2>
            <div className="component-list">
              {COMPONENTS.map((c) => (
                <button
                  key={c.id}
                  className={`component-btn${c.id === activeId ? " active" : ""}`}
                  onClick={() => setActiveId(c.id)}
                >
                  &lt;{c.label} /&gt;
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h2>Props</h2>
            <div className="controls">{controls}</div>
          </div>

          {code && (
            <div className="sidebar-section">
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy JSX"}
              </button>
            </div>
          )}
        </aside>

        <main className="preview">
          <div className="preview-inner">{preview}</div>
        </main>
      </div>
    </div>
  );
}
