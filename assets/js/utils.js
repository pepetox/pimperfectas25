// assets/js/utils.js

/**
 * Fetch JSON helper con manejo de errores.
 * @param {string} url
 * @returns {Promise<any>}
 */
export async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
  } catch (err) {
    console.error("fetchJSON error:", err);
    return null;
  }
}

/**
 * Renderiza en un contenedor.
 * @param {Element} target
 * @param {string} html
 */
export function render(target, html) {
  target.innerHTML = html;
} 