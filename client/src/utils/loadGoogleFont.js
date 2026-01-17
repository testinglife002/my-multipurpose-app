// src/utils/loadGoogleFont.js
export function loadGoogleFont(fontFamily) {
  if (!fontFamily) return Promise.resolve();

  const isSystemFont = !fontFamily.includes(" ");
  if (isSystemFont) return Promise.resolve(); // skip system fonts

  const fontId = `google-font-${fontFamily.replace(/\s+/g, "-")}`;

  if (document.getElementById(fontId)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      /\s+/g,
      "+"
    )}:wght@300;400;500;600;700&display=swap`;

    link.onload = resolve;
    document.head.appendChild(link);
  });
}

