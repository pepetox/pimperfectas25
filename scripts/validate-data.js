#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

// Esquema para validar la estructura de films.json
const filmSchema = {
  type: "object",
  properties: {
    films: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          id: { type: "string", minLength: 1 },
          title: { type: "string", minLength: 1 },
          description: { type: "string", minLength: 10 },
          vimeoUrl: { 
            type: "string",
            pattern: "^https://vimeo\\.com/\\d+$"
          },
          thumbnailUrl: { 
            type: "string",
            format: "uri"
          },
          releaseDate: { 
            type: "string",
            pattern: "^\\d{4}-\\d{2}-\\d{2}$"
          },
          duration: { 
            type: "string",
            pattern: "^\\d{1,2}:\\d{2}$"
          },
          director: { type: "string", minLength: 1 },
          genre: {
            type: "array",
            minItems: 1,
            items: { type: "string" }
          },
          featured: { type: "boolean" },
          recommendedFilms: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["id", "title", "description", "vimeoUrl", "thumbnailUrl", "releaseDate", "duration", "director", "genre", "featured", "recommendedFilms"],
        additionalProperties: false
      }
    },
    teamMembers: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1 },
          role: { type: "string", minLength: 1 },
          bio: { type: "string", minLength: 10 },
          image: { 
            type: "string",
            format: "uri"
          },
          social: {
            type: "object",
            properties: {
              instagram: { type: "string" },
              twitter: { type: "string" },
              vimeo: { type: "string" }
            },
            additionalProperties: false
          }
        },
        required: ["name", "role", "bio", "image", "social"],
        additionalProperties: false
      }
    },
    companyInfo: {
      type: "object",
      properties: {
        description: { type: "string", minLength: 10 },
        mission: { type: "string", minLength: 10 },
        founded: { type: "number", minimum: 2000, maximum: 2030 },
        location: { type: "string", minLength: 1 }
      },
      required: ["description", "mission", "founded", "location"],
      additionalProperties: false
    }
  },
  required: ["films", "teamMembers", "companyInfo"],
  additionalProperties: false
};

// Función para validar JSON
function validateJSON(filePath, schema) {
  try {
    console.log(`🔍 Validando ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`);
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    if (!valid) {
      console.error(`❌ Errores de validación en ${filePath}:`);
      validate.errors.forEach((error, index) => {
        console.error(`  ${index + 1}. ${error.instancePath || 'root'}: ${error.message}`);
        if (error.data !== undefined) {
          console.error(`     Valor actual: ${JSON.stringify(error.data)}`);
        }
      });
      return false;
    }
    
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
  
  // Verificar que los recommendedFilms referencian IDs válidos
  data.films.forEach(film => {
    film.recommendedFilms.forEach(recId => {
      if (!filmIds.includes(recId)) {
        errors.push(`Film '${film.id}' referencia un ID inexistente: '${recId}'`);
      }
      if (recId === film.id) {
        errors.push(`Film '${film.id}' se recomienda a sí mismo`);
      }
    });
  });
  
  // Verificar que hay al menos un film destacado
  const featuredFilms = data.films.filter(f => f.featured);
  if (featuredFilms.length === 0) {
    errors.push('Debe haber al menos un film marcado como destacado (featured: true)');
  }
  
  // Verificar fechas válidas
  data.films.forEach(film => {
    const date = new Date(film.releaseDate);
    if (isNaN(date.getTime())) {
      errors.push(`Fecha inválida en film '${film.id}': ${film.releaseDate}`);
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
  if (!validateJSON(dataFile, filmSchema)) {
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

module.exports = { validateJSON, validateCustomRules, filmSchema }; 