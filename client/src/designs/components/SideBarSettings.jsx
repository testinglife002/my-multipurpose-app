// src/app/design/_components/SideBarSettings.jsx


import "./sidebar.css";

export default function SideBarSettings({ selectedOption }) {
  if (!selectedOption) return null;

  return (
    <div className="editor-sidebar-settings">
      <h2>{selectedOption.name}</h2>
      <p>{selectedOption.desc}</p>

      <div className="settings-content">
        <span>
          Controls and tools for <strong>{selectedOption.name}</strong> will
          appear here.
        </span>
      </div>

      <div style={{marginTop:'2%'}} >
        {selectedOption?.component}
      </div>
    </div>
  );
}
