# BuscarAutos - Frontend

## Instrucciones para correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con:

```env
NEXT_PUBLIC_API_URL=https://buscarautos-api.netlify.app/.netlify/functions/server/api
```

También se puede usar el backend en local: https://github.com/alba-97/buscarautos-api

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## Decisiones técnicas

### Framework y Herramientas

- **Next.js**: Elegido por el rendimiento, optimización de imágenes, enrutamiento dinámico y SEO.
- **TypeScript**: Para type safety y mejor experiencia de desarrollo.
- **TailwindCSS**: Para estilizado rápido y consistente sin necesidad de CSS adicional.

### Arquitectura y Organización

- **Componentes**: Separados en archivos individuales para mejor mantenibilidad.
- **Interfaces**: Definidas en una carpeta separada reutilización.
- **Servicios**: Llamadas a API en `services/api.ts`.
- **Hooks personalizados**: Como `useDebounce` para optimizar llamadas a la API.

### Características Implementadas

1. **Búsqueda y Filtros**:

   - Búsqueda por texto con debounce de 500ms
   - Filtrado por marca
   - Rango de precios con sliders e inputs numéricos

2. **Paginación**:

   - 6 items por página
   - Navegación anterior/siguiente
   - Scroll automático al cambiar de página

3. **UI/UX**:

   - Loading states con spinner para mejor feedback
   - Diseño responsive
   - Navegación entre listado y detalle

4. **Optimizaciones**:

   - Debounce en búsqueda para reducir llamadas a la API
   - Carga paralela de datos iniciales (marcas y rango de precios)
