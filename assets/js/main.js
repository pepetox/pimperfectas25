// assets/js/main.js
import { fetchJSON, render } from "./utils.js";

let allFilms = [];
let filteredFilms = [];
let currentSearchQuery = '';

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

function renderHeroSection(featuredFilm) {
  if (!featuredFilm) return '';
  
  return `
    <div class="flex flex-col gap-10 px-4 py-10 hero-section">
      <div class="flex flex-col gap-4">
        <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
          Cortometrajes Independientes
        </h1>
        <p class="text-white text-base font-normal leading-normal">
          Explora nuestro catálogo de cortometrajes que capturan la esencia de lo humano desde perspectivas únicas.
        </p>
      </div>
      <div class="film-hero">
        <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-3">Destacado</h2>
        ${renderFilmCard(featuredFilm, true)}
      </div>
    </div>
  `;
}

function renderFilmCard(film, isHero = false) {
  const cardClass = isHero ? 'hero-card' : 'film-card';
  const imageClass = isHero ? 'w-full h-60' : 'w-full h-40';
  
  return `
    <div class="${cardClass} flex flex-col gap-3 pb-3 cursor-pointer hover:opacity-80 transition-opacity" onclick="window.location.href='short-film.html?film=${film.id}'">
      <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl ${imageClass}" style="background-image: url('${film.thumbnailUrl}');"></div>
      <div>
        <p class="text-white text-base font-medium leading-normal">${film.title}</p>
        <p class="text-[#9ca3af] text-sm font-normal leading-normal">${film.director} • ${film.duration}</p>
        <p class="text-[#9ca3af] text-sm font-normal leading-normal mt-1">${film.genre.join(', ')}</p>
      </div>
    </div>
  `;
}

function renderFilmGrid(films, showAll = false) {
  const displayFilms = showAll ? films : films.slice(0, 6);
  const hasMore = films.length > 6 && !showAll;
  
  if (displayFilms.length === 0) {
    return `
      <div class="flex flex-col gap-4">
        <h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Resultados de búsqueda</h2>
        <div class="text-center py-8">
          <p class="text-[#9ca3af] text-lg">No se encontraron cortometrajes que coincidan con tu búsqueda.</p>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="flex flex-col gap-4">
      <h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
        ${currentSearchQuery ? `Resultados (${displayFilms.length})` : 'Catálogo'}
      </h2>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 film-grid">
        ${displayFilms.map(film => renderFilmCard(film)).join('')}
      </div>
      ${hasMore ? `
        <div class="flex justify-center pt-4">
          <button id="load-more-btn" class="bg-[#293038] hover:bg-[#3a4048] text-white px-6 py-2 rounded-lg transition-colors">
            Ver todos los cortometrajes
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function handleSearch(query) {
  currentSearchQuery = query;
  
  if (!query.trim()) {
    filteredFilms = [...allFilms];
  } else {
    const searchTerm = query.toLowerCase();
    filteredFilms = allFilms.filter(film => 
      film.title.toLowerCase().includes(searchTerm) ||
      film.director.toLowerCase().includes(searchTerm) ||
      film.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
      film.description.toLowerCase().includes(searchTerm)
    );
  }
  renderPage();
}

function renderPage(showAll = false) {
  const app = document.getElementById("app");
  const featuredFilm = allFilms.find(f => f.featured) || allFilms[0];

  const html = `
    <div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
      <div class="layout-container flex h-full grow flex-col">
        ${renderHeader()}
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4">
              <div class="flex min-w-72 flex-col gap-3">
                <p class="text-white tracking-light text-[32px] font-bold leading-tight">Buscar cortometrajes</p>
                <div class="flex w-full items-center gap-4 bg-[#293038] px-4 py-2 rounded-xl">
                  <div class="text-[#9ca3af]" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input 
                    id="search-input" 
                    value="${currentSearchQuery}" 
                    placeholder="Busca por título, director o género..." 
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-transparent text-sm font-normal leading-normal placeholder:text-[#9ca3af]" 
                  />
                </div>
              </div>
            </div>
            ${filteredFilms.length === allFilms.length ? renderHeroSection(featuredFilm) : ''}
            ${renderFilmGrid(filteredFilms, showAll)}
          </div>
        </div>
      </div>
    </div>
  `;
  render(app, html);

  // Re-añadir event listeners después del render
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    // Mantener el foco si había una búsqueda activa
    if (currentSearchQuery) {
      searchInput.focus();
      // Colocar el cursor al final
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
    
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
    
    // También escuchar el evento 'keyup' para mayor responsividad
    searchInput.addEventListener('keyup', (e) => {
      handleSearch(e.target.value);
    });
  }
  
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => renderPage(true));
  }
}

(async function () {
  const app = document.getElementById("app");
  const data = await fetchJSON("data/films.json");

  if (!data || !data.films) {
    render(app, `<p class="p-4 text-red-400">No se pudo cargar la información de los cortometrajes.</p>`);
    return;
  }
  
  allFilms = data.films;
  filteredFilms = [...allFilms];
  renderPage();
})(); 