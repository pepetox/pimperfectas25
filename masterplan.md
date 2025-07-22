# 📽️ Masterplan: Producciones Imperfecta Website

## 🎯 Objetivo Principal
Crear una página web para la productora "Producciones Imperfecta" que muestre sus cortometrajes, sea fácil de mantener con datos JSON, y se publique en GitHub Pages.

## 🏗️ Estructura del Proyecto (ampliada)
```
producciones_imperfectas_25/
├── index.html                 # Página principal
├── about.html                 # Página About Us
├── short-film.html            # Plantilla de detalle de cortos
├── assets/
│   ├── css/
│   │   ├── styles.css         # Estilos adicionales personalizados
│   │   └── tailwind.css       # Salida compilada de Tailwind (build)
│   ├── js/
│   │   ├── main.js            # Script principal (home + navegación SPA)
│   │   ├── film-detail.js     # Lógica para página de detalle
│   │   ├── about.js           # Carga dinámica de About Us (opcional)
│   │   ├── data-validator.js  # Utilidad para validar JSON
│   │   └── utils.js           # Funciones comunes (formato, helpers)
│   └── images/
│       ├── placeholders/       # Imágenes por defecto
│       └── uploads/            # Thumbnails generadas
├── data/
│   └── films.json             # Base de datos de cortometrajes y equipo
├── docs/
│   └── architecture.md        # Documentación técnica complementaria
├── tests/
│   └── data-schema.test.js    # Tests de estructura JSON (Jest)
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions → Deploy to GH Pages
├── tailwind.config.js         # Configuración Tailwind (production build)
├── package.json               # Dependencias y scripts (opcional)
└── README.md                  # Documentación del proyecto
```

## 📊 Estructura de Datos (films.json)
```json
{
  "films": [
    {
      "id": "unique-film-id",
      "title": "Título del Corto",
      "description": "Descripción detallada del cortometraje",
      "vimeoUrl": "https://vimeo.com/video-id",
      "thumbnailUrl": "url-de-la-miniatura",
      "releaseDate": "2024-01-15",
      "duration": "5:30",
      "director": "Nombre del Director",
      "genre": ["Drama", "Experimental"],
      "featured": true,
      "recommendedFilms": ["film-id-1", "film-id-2"]
    }
  ],
  "teamMembers": [
    {
      "name": "Nombre del Miembro",
      "role": "Director/Productor/etc",
      "bio": "Biografía breve",
      "image": "url-de-la-foto",
      "social": {
        "instagram": "@username",
        "twitter": "@username",
        "vimeo": "vimeo.com/username"
      }
    }
  ]
}
```

## 🎨 Especificaciones de Diseño
### Colores y Tipografía
- **Background**: `#111418` (tema oscuro)
- **Texto**: Blanco `#ffffff`
- **Acentos**: `#293038` (bordes y botones)
- **Fuentes**: Work Sans (principal), Noto Sans (secundaria)

### Componentes Principales
- **Header**: Logo + Navegación + Búsqueda
- **Hero Section**: Banner principal con imagen destacada
- **Film Grid**: Grid responsivo para mostrar cortometrajes
- **Film Cards**: Tarjetas con thumbnail y hover effects

## 📋 Plan de Desarrollo (5 Fases)

### 🔨 Fase 1: Estructura Base y Configuración
**Objetivo**: Preparar el entorno y estructura básica
- [ ] Inicializar repositorio Git y subir a GitHub
- [ ] Configurar **branch `main`** y proteger rama
- [ ] Crear estructura de carpetas del proyecto (ver arriba)
- [ ] Añadir **`.editorconfig`** y **Prettier** para formateo consistente
- [ ] Configurar GitHub repository para Pages (`main` → `/` root)
- [ ] Añadir **Tailwind CDN** para prototipado rápido
- [ ] Añadir **package.json** con scripts:
  - `dev`: `tailwindcss -i ./src/input.css -o ./assets/css/tailwind.css --watch`
  - `build`: `tailwindcss -i ./src/input.css -o ./assets/css/tailwind.css --minify`
- [ ] Crear archivo `films.json` con estructura base y 1 ejemplo
- [ ] Implementar **data-validator.js** para validar estructura JSON (AJV)
- [ ] Diseñar sistema de rutas para GitHub Pages (`index.html#about`, `index.html?film=id`)
- [ ] Crear template HTML base con Tailwind CSS

### 🏠 Fase 2: Página Principal (index.html)
**Objetivo**: Implementar la página principal basada en main.html
- [ ] Migrar diseño del mockup a HTML Tailwind
- [ ] **main.js**: Cargar datos desde `films.json`
- [ ] Renderizar **Hero Section** dinámica (random o film.featured=true)
- [ ] Renderizar **Film Grid** (primeros 6 `featured=true`)
- [ ] Implementar **search bar** con filtrado instantáneo (`input` event)
- [ ] Añadir **paginación o botón “Ver más”** (cargar resto bajo demanda)
- [ ] Gestionar estado de la URL (`?film=`) para abrir `short-film.html`
- [ ] Incluir **lazy loading** de thumbnails (`loading="lazy"`)
- [ ] Implementar **dark / light switch** (prefers-color-scheme)

### 🎬 Fase 3: Página de Detalle de Cortometrajes
**Objetivo**: Crear template para mostrar detalles individuales
- [ ] Extraer `filmId` desde query string o hash
- [ ] **film-detail.js**: Buscar film en `films.json`
- [ ] Incrustar **Vimeo player** (SDK o `<iframe>` responsive)
- [ ] Mostrar metadatos: título, director, duración, fecha, género
- [ ] Añadir botones **Compartir** (Twitter, WhatsApp) con enlace directo
- [ ] Renderizar **Recommended Films** basado en `recommendedFilms` o género
- [ ] Añadir **CTA “Ver en Vimeo”** en nueva pestaña
- [ ] Implementar atajos de teclado (← →) para navegar entre films
- [ ] Añadir **Microdata Schema.org** para videos (`VideoObject`)

### 👥 Fase 4: Página About Us
**Objetivo**: Mostrar información del equipo de Producciones Imperfecta
- [ ] **about.js**: Cargar `teamMembers` desde JSON
- [ ] Crear sección **Historia** con markdown embebido en JSON
- [ ] Grid de miembros con foto, rol, bio breve y enlaces sociales
- [ ] Añadir **modal** o acordeón para bio completa
- [ ] Incluir formulario **Contacto** (Formspree / EmailJS) operativo en GH Pages
- [ ] Optimizar imágenes del equipo (200x200 webp)

### 🚀 Fase 5: Optimización y Deployment
**Objetivo**: Optimizar y publicar en GitHub Pages
- [ ] Ejecutar `npm run build` para generar CSS minificado
- [ ] Minificar HTML (`npm run minify-html` → html-minifier)
- [ ] Configurar **deploy.yml**:
  ```yaml
  name: Deploy to GitHub Pages
  on:
    push:
      branches: [main]
  jobs:
    build-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: 20
        - run: npm ci
        - run: npm run build
        - uses: peaceiris/actions-gh-pages@v4
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: ./
  ```
- [ ] Añadir `sitemap.xml` y `robots.txt`
- [ ] Lighthouse audit ≥ 90 en Performance + Accessibility
- [ ] Compatible con PWA (manifest + service worker simple)
- [ ] Configurar dominio personalizado (opcional)

## 🔧 Funcionalidades Técnicas

### Sistema de Navegación
- **SPA-like**: Navegación sin recargas usando JavaScript
- **URLs amigables**: `?page=about`, `?film=film-id`
- **Breadcrumbs**: Navegación clara para el usuario

### Gestión de Contenido
- **JSON centralizado**: Todos los datos en `films.json`
- **Hot reload**: Cambios en JSON se reflejan inmediatamente
- **Validación**: Scripts para verificar integridad de datos

### Optimizaciones
- **Lazy loading**: Imágenes se cargan al hacer scroll
- **Caching**: Estrategias para mejorar velocidad
- **Minificación**: CSS y JS optimizados para producción

## 📱 Consideraciones Responsive

### Breakpoints
- **Mobile**: < 640px (diseño apilado)
- **Tablet**: 640px - 1024px (grid 2 columnas)
- **Desktop**: > 1024px (grid 3+ columnas)

### Adaptaciones Móviles
- Header colapsable con menú hamburguesa
- Grid de una columna en móviles
- Player de video responsivo
- Tipografía escalable

## 🎯 Criterios de Éxito
1. **Funcionalidad**: Navegación fluida entre páginas
2. **Diseño**: Fiel al mockup proporcionado
3. **Performance**: Carga rápida en todas las páginas
4. **Mantenibilidad**: Fácil actualización vía JSON
5. **GitHub Pages**: Deployment automático funcionando
6. **Responsive**: Perfecto funcionamiento en móviles

## 🔄 Mantenimiento Post-Launch
- **Añadir nuevos cortos**: Editar `films.json`
- **Actualizar equipo**: Modificar sección `teamMembers`
- **Cambios visuales**: Editar CSS personalizado
- **Analytics**: Integrar Google Analytics (opcional)

## 📅 Timeline Estimado
- **Fase 1**: 1 día
- **Fase 2**: 2 días  
- **Fase 3**: 2 días
- **Fase 4**: 1 día
- **Fase 5**: 1 día

**Total**: 7 días de desarrollo 

## 🔧 Guías Técnicas Adicionales

### Estándares de Código
- **ESLint + Prettier**: Estilo de código consistente
- Commits con convención **Conventional Commits**
- Branch naming: `feature/`, `fix/`, `docs/`, `chore/`

### Accesibilidad (a11y)
- Contrast ratio ≥ 4.5:1
- Navegación completa con teclado
- Texto alternativo en imágenes
- `aria-label` en botones de icono

### SEO Básico
- Meta description dinámico (title + synopsis)
- Etiquetas OpenGraph y Twitter Card
- JSON-LD `VideoObject` y `Organization`

### Validación de Datos
- **AJV**: esquema JSON (`schema/film.schema.json`)
- Tests automáticos (`npm test`) para detectar inconsistencia de datos

### Mantenimiento
- Nueva versión → actualizar `CHANGELOG.md` (git-cliff)
- Script `npm run lint:json` para comprobar JSON antes de commit 