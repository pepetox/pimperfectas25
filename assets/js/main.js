// assets/js/main.js
import { fetchJSON, render } from "./utils.js";

let allFilms = [];
let filteredFilms = [];

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
        <div class="relative">
          <input
            id="search-input"
            type="text"
            placeholder="Buscar cortometrajes..."
            class="flex max-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#293038] text-white gap-2 text-sm leading-normal tracking-[0.015em] min-w-0 px-10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" data-icon="MagnifyingGlass" data-size="16px">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Renderizar hero section con film destacado
function renderHeroSection(featuredFilm) {
  if (!featuredFilm) return '';
  
  return `
    <div class="@container">
      <div class="@[480px]:px-4 @[480px]:py-3">
        <div
          class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#111418] @[480px]:rounded-lg min-h-80 relative group cursor-pointer"
          style="background-image: url('${featuredFilm.thumbnailUrl}');"
          onclick="window.location.href='short-film.html?film=${featuredFilm.id}'"
        >
          <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
          <div class="relative z-10 p-6">
            <h1 class="text-white text-3xl font-bold mb-2">${featuredFilm.title}</h1>
            <p class="text-gray-200 text-sm mb-4">${featuredFilm.description}</p>
            <div class="flex items-center gap-4 text-sm text-gray-300">
              <span>${featuredFilm.director}</span>
              <span>•</span>
              <span>${featuredFilm.duration}</span>
              <span>•</span>
              <span>${new Date(featuredFilm.releaseDate).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Renderizar una tarjeta de cortometraje
function renderFilmCard(film) {
  return `
    <div class="flex flex-col gap-3 group cursor-pointer film-card" onclick="window.location.href='short-film.html?film=${film.id}'">
      <div
        class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        style="background-image: url('${film.thumbnailUrl}');"
        loading="lazy"
      ></div>
      <div class="px-1">
        <h3 class="text-white text-sm font-medium leading-tight mb-1 group-hover:text-gray-300 transition-colors">${film.title}</h3>
        <p class="text-gray-400 text-xs">${film.director} • ${film.duration}</p>
      </div>
    </div>
  `;
}

// Renderizar grid de cortometrajes
function renderFilmGrid(films, showAll = false) {
  const displayFilms = showAll ? films : films.slice(0, 6);
  
  if (displayFilms.length === 0) {
    return `
      <div class="text-center py-12">
        <p class="text-gray-400 text-lg">No se encontraron cortometrajes</p>
      </div>
    `;
  }

  const cardsHTML = displayFilms.map(renderFilmCard).join('');
  const hasMore = !showAll && films.length > 6;
  
  return `
    <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      ${filteredFilms.length !== allFilms.length ? `Resultados de búsqueda (${displayFilms.length})` : 'Cortometrajes Destacados'}
    </h2>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      ${cardsHTML}
    </div>
    ${hasMore ? `
      <div class="flex px-4 py-3 justify-center">
        <button
          id="load-more-btn"
          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#293038] hover:bg-[#3a4048] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
        >
          <span class="truncate">Ver Todos los Cortometrajes</span>
        </button>
      </div>
    ` : ''}
  `;
}

// Función de búsqueda
function handleSearch(query) {
  if (!query.trim()) {
    filteredFilms = allFilms;
  } else {
    filteredFilms = allFilms.filter(film => 
      film.title.toLowerCase().includes(query.toLowerCase()) ||
      film.director.toLowerCase().includes(query.toLowerCase()) ||
      film.description.toLowerCase().includes(query.toLowerCase()) ||
      film.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
  }
  renderPage();
}

// Renderizar página completa
function renderPage(showAll = false) {
  const app = document.getElementById("app");
  const featuredFilm = allFilms.find(f => f.featured) || allFilms[0];
  
  const html = `
    <div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
      <div class="layout-container flex h-full grow flex-col">
        ${renderHeader()}
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            ${filteredFilms.length === allFilms.length ? renderHeroSection(featuredFilm) : ''}
            ${renderFilmGrid(filteredFilms, showAll)}
          </div>
        </div>
      </div>
    </div>
  `;
  
  render(app, html);
  
  // Agregar event listeners
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }
  
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => renderPage(true));
  }
}

// Inicialización principal
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