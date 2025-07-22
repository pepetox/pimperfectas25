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
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293038] px-10 py-3">
      <div class="flex items-center gap-4 text-white">
        <div class="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Producciones Imperfectas</h2>
      </div>
      <div class="flex flex-1 justify-end gap-8">
        <div class="flex items-center gap-9">
          <a class="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors" href="index.html">Cortometrajes</a>
          <a class="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors" href="about.html">Sobre Nosotros</a>
        </div>
      </div>
    </header>
  `;
}

// Renderizar breadcrumbs
function renderBreadcrumbs(film) {
  return `
    <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
      <a href="index.html" class="hover:text-white transition-colors">Inicio</a>
      <span>›</span>
      <a href="index.html" class="hover:text-white transition-colors">Cortometrajes</a>
      <span>›</span>
      <span class="text-white">${film.title}</span>
    </nav>
  `;
}

// Renderizar player de Vimeo
function renderVimeoPlayer(film) {
  const vimeoId = extractVimeoId(film.vimeoUrl);
  
  if (!vimeoId) {
    return `
      <div class="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-6">
        <p class="text-gray-400">Video no disponible</p>
      </div>
    `;
  }

  return `
    <div class="aspect-video mb-6">
      <iframe 
        src="https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen
        class="w-full h-full rounded-lg"
        title="${film.title}">
      </iframe>
    </div>
  `;
}

// Renderizar información del film
function renderFilmInfo(film) {
  const releaseYear = new Date(film.releaseDate).getFullYear();
  const genres = film.genre.join(', ');
  
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Información principal -->
      <div class="lg:col-span-2">
        <h1 class="text-4xl font-bold text-white mb-4">${film.title}</h1>
        <p class="text-gray-300 text-lg leading-relaxed mb-6">${film.description}</p>
        
        <!-- Metadatos -->
        <div class="metadata-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <h3 class="text-sm font-medium text-gray-400 mb-1">Director</h3>
            <p class="text-white">${film.director}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-400 mb-1">Duración</h3>
            <p class="text-white">${film.duration}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-400 mb-1">Año</h3>
            <p class="text-white">${releaseYear}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-400 mb-1">Género</h3>
            <p class="text-white">${genres}</p>
          </div>
        </div>
        
        <!-- Botones de acción -->
        <div class="flex flex-wrap gap-4">
          <a 
            href="${film.vimeoUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="action-button inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.814l-.013.011z"/>
            </svg>
            Ver en Vimeo
          </a>
          
          <button 
            onclick="shareFilm('${film.id}', '${film.title}')"
            class="action-button inline-flex items-center px-6 py-3 bg-[#293038] hover:bg-[#3a4048] text-white font-medium rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
            </svg>
            Compartir
          </button>
        </div>
      </div>
      
      <!-- Thumbnail del film -->
      <div class="lg:col-span-1">
        <img 
          src="${film.thumbnailUrl}" 
          alt="${film.title}"
          class="w-full aspect-video object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  `;
}

// Renderizar cortometrajes recomendados
function renderRecommendedFilms(currentFilmId, recommendedIds) {
  if (!recommendedIds || recommendedIds.length === 0) {
    return '';
  }

  const recommendedFilms = allFilms.filter(film => 
    recommendedIds.includes(film.id) && film.id !== currentFilmId
  );

  if (recommendedFilms.length === 0) {
    return '';
  }

  const filmsHTML = recommendedFilms.map(film => `
    <div class="recommended-film group cursor-pointer" onclick="navigateToFilm('${film.id}')">
      <img 
        src="${film.thumbnailUrl}" 
        alt="${film.title}"
        class="w-full aspect-video object-cover rounded-lg mb-3 transition-transform duration-300 group-hover:scale-105"
      />
      <h4 class="text-white font-medium mb-1 group-hover:text-gray-300 transition-colors">${film.title}</h4>
      <p class="text-gray-400 text-sm">${film.director} • ${film.duration}</p>
    </div>
  `).join('');

  return `
    <div class="border-t border-[#293038] pt-8">
      <h2 class="text-2xl font-bold text-white mb-6">Cortometrajes Recomendados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filmsHTML}
      </div>
    </div>
  `;
}

// Renderizar navegación entre films
function renderFilmNavigation(currentFilmId) {
  const currentIndex = allFilms.findIndex(film => film.id === currentFilmId);
  const prevFilm = currentIndex > 0 ? allFilms[currentIndex - 1] : null;
  const nextFilm = currentIndex < allFilms.length - 1 ? allFilms[currentIndex + 1] : null;

  return `
    <div class="film-navigation flex justify-between items-center border-t border-[#293038] pt-8 mt-8">
      ${prevFilm ? `
        <button 
          onclick="navigateToFilm('${prevFilm.id}')"
          class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
        >
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <div class="text-left">
            <p class="text-sm">Anterior</p>
            <p class="font-medium">${prevFilm.title}</p>
          </div>
        </button>
      ` : '<div></div>'}
      
      ${nextFilm ? `
        <button 
          onclick="navigateToFilm('${nextFilm.id}')"
          class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
        >
          <div class="text-right">
            <p class="text-sm">Siguiente</p>
            <p class="font-medium">${nextFilm.title}</p>
          </div>
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
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
      title: `${title} - Producciones Imperfecta`,
      text: `Mira este cortometraje: ${title}`,
      url: url
    });
  } else {
    // Fallback: copiar al portapapeles
    navigator.clipboard.writeText(url).then(() => {
      // Mostrar notificación temporal
      const notification = document.createElement('div');
      notification.className = 'copy-notification fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
      notification.textContent = 'Enlace copiado al portapapeles';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    }).catch(() => {
      // Fallback para navegadores que no soportan clipboard
      const notification = document.createElement('div');
      notification.className = 'copy-notification fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50';
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
  document.addEventListener('keydown', (e) => {
    const currentIndex = allFilms.findIndex(film => film.id === currentFilmId);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      navigateToFilm(allFilms[currentIndex - 1].id);
    } else if (e.key === 'ArrowRight' && currentIndex < allFilms.length - 1) {
      navigateToFilm(allFilms[currentIndex + 1].id);
    } else if (e.key === 'Escape') {
      window.location.href = 'index.html';
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
        <div class="px-40 flex flex-1 justify-center py-8">
          <div class="film-detail-container layout-content-container flex flex-col max-w-[960px] flex-1">
            ${renderBreadcrumbs(film)}
            ${renderVimeoPlayer(film)}
            ${renderFilmInfo(film)}
            ${renderRecommendedFilms(film.id, film.recommendedFilms)}
            ${renderFilmNavigation(film.id)}
          </div>
        </div>
      </div>
    </div>
  `;
  
  render(app, html);
  
  // Configurar navegación por teclado
  handleKeyboardNavigation(film.id);
  
  // Actualizar título de la página
  document.title = `${film.title} - Producciones Imperfecta`;
  
  // Añadir meta tags dinámicos para SEO
  updateMetaTags(film);
}

// Actualizar meta tags para SEO
function updateMetaTags(film) {
  // Meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = `${film.description} - Dirigido por ${film.director}. Producciones Imperfecta.`;
  
  // Open Graph tags
  updateOrCreateMetaTag('property', 'og:title', `${film.title} - Producciones Imperfecta`);
  updateOrCreateMetaTag('property', 'og:description', film.description);
  updateOrCreateMetaTag('property', 'og:image', film.thumbnailUrl);
  updateOrCreateMetaTag('property', 'og:type', 'video.other');
  
  // Twitter Card tags
  updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateOrCreateMetaTag('name', 'twitter:title', `${film.title} - Producciones Imperfecta`);
  updateOrCreateMetaTag('name', 'twitter:description', film.description);
  updateOrCreateMetaTag('name', 'twitter:image', film.thumbnailUrl);
}

function updateOrCreateMetaTag(attribute, value, content) {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

// Inicialización principal
(async function () {
  const app = document.getElementById("app");
  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("film");

  if (!filmId) {
    render(app, `
      <div class="error-container min-h-screen bg-[#111418] flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white mb-4">Cortometraje no especificado</h1>
          <p class="text-gray-400 mb-6">No se ha proporcionado ningún ID de cortometraje.</p>
          <a href="index.html" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Volver al inicio
          </a>
        </div>
      </div>
    `);
    return;
  }

  const data = await fetchJSON("data/films.json");
  if (!data || !data.films) {
    render(app, `
      <div class="error-container min-h-screen bg-[#111418] flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white mb-4">Error al cargar datos</h1>
          <p class="text-gray-400 mb-6">No se pudo cargar la información de los cortometrajes.</p>
          <a href="index.html" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Volver al inicio
          </a>
        </div>
      </div>
    `);
    return;
  }

  allFilms = data.films;
  currentFilm = allFilms.find(f => f.id === filmId);
  
  if (!currentFilm) {
    render(app, `
      <div class="error-container min-h-screen bg-[#111418] flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white mb-4">Cortometraje no encontrado</h1>
          <p class="text-gray-400 mb-6">El cortometraje solicitado no existe o ha sido eliminado.</p>
          <a href="index.html" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Volver al inicio
          </a>
        </div>
      </div>
    `);
    return;
  }

  renderPage(currentFilm);
})(); 