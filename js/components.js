/* =========================================================
   components.js
   Sistema mínimo para cargar HTML reutilizable (header/footer)
   mediante el atributo data-include="ruta.html".
   ========================================================= */

(function () {
  'use strict';

  /**
   * Carga el contenido HTML indicado en data-include
   * y lo inyecta en el contenedor.
   */
  async function loadIncludes() {
    const nodes = document.querySelectorAll('[data-include]');
    const tasks = Array.from(nodes).map(async (node) => {
      const url = node.getAttribute('data-include');
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        node.innerHTML = await res.text();
      } catch (err) {
        console.error(`No se pudo cargar ${url}:`, err);
        node.innerHTML = `<!-- Error cargando ${url} -->`;
      }
    });
    await Promise.all(tasks);
    // Notificar a otros módulos que los includes están listos
    document.dispatchEvent(new CustomEvent('includes:loaded'));
  }

  document.addEventListener('DOMContentLoaded', loadIncludes);
})();
