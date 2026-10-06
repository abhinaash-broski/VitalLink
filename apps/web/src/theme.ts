// Appearance setting (Settings › Appearance). tokens.css switches on
// <html data-theme>; with no attribute it follows the OS.
export type Theme = "light" | "dark" | "system";

const KEY = "vl.theme";

export function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" || t === "system" ? t : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme, persist = true) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  if (!persist) return;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
}
