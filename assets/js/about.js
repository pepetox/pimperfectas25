// assets/js/about.js
import { fetchJSON, render } from "./utils.js";

let teamMembers = [];
let companyInfo = {};

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

// Renderizar hero section de About Us
function renderAboutHero() {
  return `
    <div class="relative mb-12">
      <div class="bg-gradient-to-r from-[#111418] via-[#1a1d23] to-[#111418] rounded-lg p-8 md:p-12">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Sobre Nosotros</h1>
          <p class="text-xl text-gray-300 leading-relaxed mb-8">
            ${companyInfo.description || 'Somos una productora independiente dedicada al arte del cortometraje.'}
          </p>
          <div class="flex flex-wrap justify-center gap-8 text-sm">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-gray-300">Fundada en ${companyInfo.founded || '2022'}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-gray-300">${companyInfo.location || 'Madrid, España'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Renderizar misión y valores
function renderMissionSection() {
  return `
    <div class="mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-white mb-6">Nuestra Misión</h2>
          <p class="text-gray-300 text-lg leading-relaxed mb-6">
            ${companyInfo.mission || 'Creemos en la belleza de lo imperfecto y en el poder de las historias pequeñas para generar grandes emociones.'}
          </p>
          <p class="text-gray-400 leading-relaxed">
            En Producciones Imperfecta, cada proyecto es una oportunidad para explorar nuevas formas de narrativa visual. 
            Nos especializamos en cortometrajes que desafían las convenciones y abrazan la experimentación artística.
          </p>
        </div>
        <div class="relative">
          <div class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg p-8 backdrop-blur-sm border border-gray-700">
            <h3 class="text-xl font-semibold text-white mb-4">Nuestros Valores</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-300">Creatividad sin límites</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-300">Autenticidad en cada historia</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-300">Colaboración y experimentación</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-300">Impacto emocional profundo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Renderizar tarjeta de miembro del equipo
function renderTeamMemberCard(member, index) {
  return `
    <div class="team-member-card bg-[#1a1d23] rounded-lg p-6 hover:bg-[#1f2328] transition-all duration-300 hover:transform hover:scale-105">
      <div class="flex flex-col items-center text-center">
        <img 
          src="${member.image}" 
          alt="${member.name}"
          class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-600 hover:border-blue-400 transition-colors duration-300"
        />
        <h3 class="text-xl font-bold text-white mb-2">${member.name}</h3>
        <p class="text-blue-400 font-medium mb-4">${member.role}</p>
        <p class="text-gray-300 text-sm leading-relaxed mb-6">${member.bio}</p>
        
        <!-- Enlaces sociales -->
        <div class="flex gap-4">
          ${member.social.instagram ? `
            <a href="https://instagram.com/${member.social.instagram.replace('@', '')}" target="_blank" rel="noopener noreferrer" 
               class="text-gray-400 hover:text-pink-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          ` : ''}
          
          ${member.social.twitter ? `
            <a href="https://twitter.com/${member.social.twitter.replace('@', '')}" target="_blank" rel="noopener noreferrer" 
               class="text-gray-400 hover:text-blue-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          ` : ''}
          
          ${member.social.vimeo ? `
            <a href="https://${member.social.vimeo}" target="_blank" rel="noopener noreferrer" 
               class="text-gray-400 hover:text-green-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.814l-.013.011z"/>
              </svg>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Renderizar sección del equipo
function renderTeamSection() {
  if (!teamMembers || teamMembers.length === 0) {
    return '';
  }

  const teamHTML = teamMembers.map((member, index) => renderTeamMemberCard(member, index)).join('');

  return `
    <div class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4">Nuestro Equipo</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Conoce a los artistas y creativos que dan vida a nuestros cortometrajes. 
          Cada miembro aporta su visión única y experiencia para crear historias inolvidables.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        ${teamHTML}
      </div>
    </div>
  `;
}

// Renderizar formulario de contacto
function renderContactSection() {
  return `
    <div class="bg-[#1a1d23] rounded-lg p-8 md:p-12">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">¿Tienes una historia que contar?</h2>
          <p class="text-gray-400 text-lg">
            Estamos siempre abiertos a nuevas colaboraciones y proyectos. ¡Contacta con nosotros!
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Formulario -->
          <div>
            <form id="contact-form" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  class="w-full px-4 py-3 bg-[#111418] border border-gray-600 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  class="w-full px-4 py-3 bg-[#111418] border border-gray-600 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">Asunto</label>
                <select 
                  id="subject" 
                  name="subject"
                  class="w-full px-4 py-3 bg-[#111418] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="colaboracion">Propuesta de Colaboración</option>
                  <option value="proyecto">Nuevo Proyecto</option>
                  <option value="distribucion">Distribución</option>
                  <option value="prensa">Prensa y Medios</option>
                  <option value="general">Consulta General</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Mensaje *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  required
                  class="w-full px-4 py-3 bg-[#111418] border border-gray-600 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Cuéntanos sobre tu idea, proyecto o consulta..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1a1d23]"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
          
          <!-- Información de contacto -->
          <div class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold text-white mb-6">Información de Contacto</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <svg class="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <p class="text-white font-medium">Ubicación</p>
                    <p class="text-gray-400">${companyInfo.location || 'Madrid, España'}</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-4">
                  <svg class="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p class="text-white font-medium">Email</p>
                    <p class="text-gray-400">contacto@produccionesimperfectas.com</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-4">
                  <svg class="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p class="text-white font-medium">Horario de Respuesta</p>
                    <p class="text-gray-400">24-48 horas hábiles</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="text-lg font-medium text-white mb-4">Síguenos</h4>
              <div class="flex gap-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.814l-.013.011z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Manejar envío del formulario
function handleFormSubmission() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Mostrar estado de carga
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (en producción, aquí iría la integración con Formspree, EmailJS, etc.)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
      
      // Mostrar mensaje de éxito
      showNotification('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
      form.reset();
      
    } catch (error) {
      showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-50 max-w-md ${
    type === 'success' ? 'bg-green-600' : 
    type === 'error' ? 'bg-red-600' : 'bg-blue-600'
  } notification-slide-in`;
  
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <span>${message}</span>
      <button onclick="this.parentNode.parentNode.remove()" class="text-white hover:text-gray-200 ml-auto">×</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Renderizar página completa
function renderPage() {
  const app = document.getElementById("app");
  
  const html = `
    <div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
      <div class="layout-container flex h-full grow flex-col">
        ${renderHeader()}
        <div class="px-40 flex flex-1 justify-center py-8">
          <div class="about-container layout-content-container flex flex-col max-w-[960px] flex-1">
            ${renderAboutHero()}
            ${renderMissionSection()}
            ${renderTeamSection()}
            ${renderContactSection()}
          </div>
        </div>
      </div>
    </div>
  `;
  
  render(app, html);
  
  // Configurar manejo del formulario
  handleFormSubmission();
  
  // Actualizar título de la página
  document.title = 'Sobre Nosotros - Producciones Imperfecta';
}

// Inicialización principal
(async function () {
  const app = document.getElementById("app");
  const data = await fetchJSON("data/films.json");
  
  if (!data) {
    render(app, `
      <div class="error-container min-h-screen bg-[#111418] flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-white mb-4">Error al cargar datos</h1>
          <p class="text-gray-400 mb-6">No se pudo cargar la información de la productora.</p>
          <a href="index.html" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Volver al inicio
          </a>
        </div>
      </div>
    `);
    return;
  }

  teamMembers = data.teamMembers || [];
  companyInfo = data.companyInfo || {};
  
  renderPage();
})(); 