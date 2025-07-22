#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Función para validar JSON básica (sin AJV para evitar dependencias)
function validateJSON(filePath) {
  try {
    console.log(`🔍 Validando ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`);
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Validaciones básicas
    if (!data.films || !Array.isArray(data.films)) {
      throw new Error('El archivo debe contener un array "films"');
    }
    
    if (!data.teamMembers || !Array.isArray(data.teamMembers)) {
      throw new Error('El archivo debe contener un array "teamMembers"');
    }
    
    if (!data.companyInfo || typeof data.companyInfo !== 'object') {
      throw new Error('El archivo debe contener un objeto "companyInfo"');
    }
    
    // Validar que cada film tenga campos requeridos
    data.films.forEach((film, index) => {
      const requiredFields = ['id', 'title', 'description', 'vimeoUrl', 'director', 'genre'];
      requiredFields.forEach(field => {
        if (!film[field]) {
          throw new Error(`Film ${index + 1}: Falta el campo requerido "${field}"`);
        }
      });
      
      // Validar URL de Vimeo
      if (!film.vimeoUrl.includes('vimeo.com/')) {
        throw new Error(`Film "${film.title}": URL de Vimeo inválida`);
      }
    });
    
    console.log(`✅ ${filePath} es válido`);
    return true;
  } catch (error) {
    console.error(`❌ Error al validar ${filePath}:`, error.message);
    return false;
  }
}

// Validaciones adicionales personalizadas
function validateCustomRules(data) {
  let errors = [];
  
  // Verificar que no hay IDs duplicados en films
  const filmIds = data.films.map(f => f.id);
  const duplicateIds = filmIds.filter((id, index) => filmIds.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    errors.push(`IDs de films duplicados: ${duplicateIds.join(', ')}`);
  }
  
  // Verificar que hay al menos un film destacado
  const featuredFilms = data.films.filter(f => f.featured);
  if (featuredFilms.length === 0) {
    errors.push('Debe haber al menos un film marcado como destacado (featured: true)');
  }
  
  // Verificar fechas válidas
  data.films.forEach(film => {
    if (film.releaseDate) {
      const date = new Date(film.releaseDate);
      if (isNaN(date.getTime())) {
        errors.push(`Fecha inválida en film '${film.id}': ${film.releaseDate}`);
      }
    }
  });
  
  return errors;
}

// Función principal
function main() {
  console.log('🚀 Iniciando validación de datos...\n');
  
  const dataFile = path.join(__dirname, '../data/films.json');
  let isValid = true;
  
  // Validar esquema JSON
  if (!validateJSON(dataFile)) {
    isValid = false;
  }
  
  // Validaciones personalizadas
  if (isValid) {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const customErrors = validateCustomRules(data);
      
      if (customErrors.length > 0) {
        console.error('\n❌ Errores de validación personalizados:');
        customErrors.forEach((error, index) => {
          console.error(`  ${index + 1}. ${error}`);
        });
        isValid = false;
      } else {
        console.log('✅ Validaciones personalizadas pasaron correctamente');
      }
    } catch (error) {
      console.error('❌ Error al leer datos para validaciones personalizadas:', error.message);
      isValid = false;
    }
  }
  
  // Estadísticas
  if (isValid) {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      console.log('\n📊 Estadísticas del proyecto:');
      console.log(`   • ${data.films.length} cortometrajes total`);
      console.log(`   • ${data.films.filter(f => f.featured).length} cortometrajes destacados`);
      console.log(`   • ${data.teamMembers.length} miembros del equipo`);
      console.log(`   • Fundada en ${data.companyInfo.founded}`);
      console.log(`   • Ubicación: ${data.companyInfo.location}`);
    } catch (error) {
      console.warn('⚠️  No se pudieron generar estadísticas');
    }
  }
  
  console.log('\n' + '='.repeat(50));
  if (isValid) {
    console.log('🎉 ¡Todos los datos son válidos! El sitio está listo para deployment.');
  } else {
    console.log('💥 La validación falló. Por favor, corrige los errores antes del deployment.');
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { validateJSON, validateCustomRules }; 