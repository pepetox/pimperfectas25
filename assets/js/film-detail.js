// assets/js/film-detail.js
import { fetchJSON, render } from "./utils.js";

let allFilms = [];
let currentFilm = null;

// Extraer ID de Vimeo de la URL
function extractVimeoId(url) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

// Renderizar header con navegación
function renderHeader() {
  return `
    <div class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293038] px-10 py-3">
      <div class="flex items-center gap-4 text-white">
        <div class="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 4H4V44H44V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Producciones Imperfectas</h2>
      </div>
      <div class="flex flex-1 justify-end gap-8">
        <div class="flex items-center gap-9">
          <a href="index.html" class="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors">Inicio</a>
        </div>
      </div>
    </div>
  `;
}

// Renderizar breadcrumbs
function renderBreadcrumbs(film) {
  return `
    <nav class="flex text-sm text-[#9ca3af] mb-6">
      <a href="index.html" class="hover:text-white transition-colors">Inicio</a>
      <span class="mx-2">></span>
      <span class="text-white">${film.title}</span>
    </nav>
  `;
}

// Renderizar player de Vimeo
function renderVimeoPlayer(vimeoId) {
  if (!vimeoId) {
    return `
      <div class="w-full aspect-video bg-[#293038] rounded-lg flex items-center justify-center">
        <p class="text-[#9ca3af]">Video no disponible</p>
      </div>
    `;
  }

  return `
    <div class="w-full aspect-video rounded-lg overflow-hidden">
      <iframe 
        src="https://player.vimeo.com/video/${vimeoId}?h=0&title=0&byline=0&portrait=0&responsive=1" 
        width="100%" 
        height="100%" 
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen
        class="w-full h-full">
      </iframe>
    </div>
  `;
}

// Renderizar información del film
function renderFilmInfo(film) {
  const vimeoId = extractVimeoId(film.vimeoUrl);
  
  return `
    <div class="flex flex-col gap-6">
      ${renderVimeoPlayer(vimeoId)}
      
      <div class="flex flex-col gap-4">
        <h1 class="text-white text-3xl font-bold leading-tight">${film.title}</h1>
        
        <div class="metadata-grid grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#293038] rounded-lg">
          <div>
            <span class="text-[#9ca3af] text-sm block">Director</span>
            <span class="text-white font-medium">${film.director}</span>
          </div>
          <div>
            <span class="text-[#9ca3af] text-sm block">Duración</span>
            <span class="text-white font-medium">${film.duration}</span>
          </div>
          <div>
            <span class="text-[#9ca3af] text-sm block">Fecha</span>
            <span class="text-white font-medium">${new Date(film.releaseDate).getFullYear()}</span>
          </div>
          <div>
            <span class="text-[#9ca3af] text-sm block">Género</span>
            <span class="text-white font-medium">${film.genre.join(', ')}</span>
          </div>
        </div>
        
        <div class="flex flex-col gap-3">
          <h2 class="text-white text-xl font-semibold">Descripción</h2>
          <p class="text-[#9ca3af] leading-relaxed">${film.description}</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <a 
            href="${film.vimeoUrl}" 
            target="_blank" 
            class="action-button flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.001 20h-10c-1.103 0-2-.897-2-2V6c0-1.103.897-2 2-2h10c1.103 0 2 .897 2 2v12c0 1.103-.897 2-2 2zM7.001 6v12h10V6h-10z"/>
              <path d="M12.001 7l-6 5 6 5z"/>
            </svg>
            Ver en Vimeo
          </a>
          
          <button 
            onclick="shareFilm('${film.id}', '${film.title}')" 
            class="action-button flex items-center justify-center gap-2 bg-[#293038] hover:bg-[#3a4048] text-white px-6 py-3 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            Compartir
          </button>
        </div>
      </div>
    </div>
  `;
}

// Renderizar cortometrajes recomendados
function renderRecommendedFilms(currentFilmId, allFilms) {
  const currentFilm = allFilms.find(f => f.id === currentFilmId);
  const recommendedIds = currentFilm ? currentFilm.recommendedFilms : [];
  const recommendedFilms = allFilms.filter(f => recommendedIds.includes(f.id));
  
  if (recommendedFilms.length === 0) {
    return '';
  }
  
  return `
    <div class="flex flex-col gap-4 mt-8">
      <h2 class="text-white text-xl font-semibold">Cortometrajes Relacionados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${recommendedFilms.map(film => `
          <div class="recommended-film flex flex-col gap-3 cursor-pointer hover:opacity-80 transition-opacity" onclick="navigateToFilm('${film.id}')">
            <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style="background-image: url('${film.thumbnailUrl}');"></div>
            <div>
              <h3 class="text-white text-base font-medium">${film.title}</h3>
              <p class="text-[#9ca3af] text-sm">${film.director} • ${film.duration}</p>
              <p class="text-[#9ca3af] text-sm mt-1">${film.genre.join(', ')}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Renderizar navegación entre films
function renderFilmNavigation(currentFilmId, allFilms) {
  const currentIndex = allFilms.findIndex(f => f.id === currentFilmId);
  const prevFilm = currentIndex > 0 ? allFilms[currentIndex - 1] : null;
  const nextFilm = currentIndex < allFilms.length - 1 ? allFilms[currentIndex + 1] : null;
  
  return `
    <div class="film-navigation flex justify-between items-center mt-8 pt-6 border-t border-[#293038]">
      ${prevFilm ? `
        <button onclick="navigateToFilm('${prevFilm.id}')" class="flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
          <span class="text-sm">Anterior: ${prevFilm.title}</span>
        </button>
      ` : '<div></div>'}
      
      ${nextFilm ? `
        <button onclick="navigateToFilm('${nextFilm.id}')" class="flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors">
          <span class="text-sm">Siguiente: ${nextFilm.title}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      ` : '<div></div>'}
    </div>
  `;
}

// Función para compartir cortometraje
window.shareFilm = function(filmId, title) {
  const url = `${window.location.origin}${window.location.pathname}?film=${filmId}`;
  
  if (navigator.share) {
    navigator.share({
      title: `${title} - Producciones Imperfectas`,
      text: `Mira este cortometraje: ${title}`,
      url: url
    });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      const notification = document.createElement('div');
      notification.className = 'copy-notification fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50 slideInRight';
      notification.textContent = 'Enlace copiado al portapapeles';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.classList.add('slideOutRight');
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
        }
      }, 3000);
    }).catch(() => {
      const notification = document.createElement('div');
      notification.className = 'copy-notification fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 slideInRight';
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <span>Enlace: ${url}</span>
          <button onclick="this.parentNode.parentNode.remove()" class="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 10000);
    });
  }
};

// Función para navegar a otro film
window.navigateToFilm = function(filmId) {
  window.location.href = `short-film.html?film=${filmId}`;
};

// Manejar teclas de navegación
function handleKeyboardNavigation(currentFilmId) {
  const currentIndex = allFilms.findIndex(f => f.id === currentFilmId);
  
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          navigateToFilm(allFilms[currentIndex - 1].id);
        }
        break;
      case 'ArrowRight':
        if (currentIndex < allFilms.length - 1) {
          navigateToFilm(allFilms[currentIndex + 1].id);
        }
        break;
      case 'Escape':
        window.location.href = 'index.html';
        break;
    }
  });
}

// Renderizar página completa
function renderPage(film) {
  const app = document.getElementById("app");
  
  const html = `
    <div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
      <div class="layout-container flex h-full grow flex-col">
        ${renderHeader()}
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="film-detail-container layout-content-container flex flex-col max-w-[960px] flex-1">
            ${renderBreadcrumbs(film)}
            ${renderFilmInfo(film)}
            ${renderRecommendedFilms(film.id, allFilms)}
            ${renderFilmNavigation(film.id, allFilms)}
          </div>
        </div>
      </div>
    </div>
  `;
  
  render(app, html);
  
  // Configurar navegación por teclado
  handleKeyboardNavigation(film.id);
  
  // Actualizar título de la página
  document.title = `${film.title} - Producciones Imperfectas`;
  
  // Añadir meta tags dinámicos para SEO
  updateMetaTags(film);
}

// Actualizar meta tags para SEO
function updateMetaTags(film) {
  document.title = `${film.title} - Producciones Imperfectas`;
  
  updateOrCreateMetaTag('name', 'description', `${film.description} Dirigido por ${film.director}. Duración: ${film.duration}.`);
  updateOrCreateMetaTag('property', 'og:title', `${film.title} - Producciones Imperfectas`);
  updateOrCreateMetaTag('property', 'og:description', film.description);
  updateOrCreateMetaTag('property', 'og:url', `${window.location.origin}${window.location.pathname}${window.location.search}`);
  updateOrCreateMetaTag('property', 'og:image', film.thumbnailUrl);
  updateOrCreateMetaTag('name', 'twitter:title', `${film.title} - Producciones Imperfectas`);
  updateOrCreateMetaTag('name', 'twitter:description', film.description);
  updateOrCreateMetaTag('name', 'twitter:image', film.thumbnailUrl);
}

function updateOrCreateMetaTag(attribute, value, content) {
  let meta = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

// Inicialización principal
(async function () {
  const app = document.getElementById("app");
  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("film");
  
  if (!filmId) {
    render(app, `
      <div class="error-container flex flex-col items-center justify-center min-h-screen bg-[#111418] text-white">
        <h1 class="text-2xl font-bold mb-4">Cortometraje no especificado</h1>
        <p class="text-[#9ca3af] mb-6">No se ha especificado qué cortometraje mostrar.</p>
        <a href="index.html" class="bg-[#293038] hover:bg-[#3a4048] text-white px-6 py-3 rounded-lg transition-colors">
          Volver al inicio
        </a>
      </div>
    `);
    return;
  }
  
  const data = await fetchJSON("data/films.json");
  
  if (!data || !data.films) {
    render(app, `
      <div class="error-container flex flex-col items-center justify-center min-h-screen bg-[#111418] text-white">
        <h1 class="text-2xl font-bold mb-4">Error al cargar datos</h1>
        <p class="text-[#9ca3af] mb-6">No se pudo cargar la información de los cortometrajes.</p>
        <a href="index.html" class="bg-[#293038] hover:bg-[#3a4048] text-white px-6 py-3 rounded-lg transition-colors">
          Volver al inicio
        </a>
      </div>
    `);
    return;
  }
  
  allFilms = data.films;
  currentFilm = allFilms.find(f => f.id === filmId);
  
  if (!currentFilm) {
    render(app, `
      <div class="error-container flex flex-col items-center justify-center min-h-screen bg-[#111418] text-white">
        <h1 class="text-2xl font-bold mb-4">Cortometraje no encontrado</h1>
        <p class="text-[#9ca3af] mb-6">El cortometraje "${filmId}" no existe en nuestro catálogo.</p>
        <a href="index.html" class="bg-[#293038] hover:bg-[#3a4048] text-white px-6 py-3 rounded-lg transition-colors">
          Volver al inicio
        </a>
      </div>
    `);
    return;
  }
  
  renderPage(currentFilm);
})(); 