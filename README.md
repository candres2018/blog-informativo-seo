# Prueba Técnica: Blog Informativo con Next.js Enfocado en SEO

* **Author:** [Carlos Andrés Ocaña Morillo](https://www.linkedin.com/in/carlos-andr%C3%A9s-oca%C3%B1a-morillo-634273252/)

## 🛠️ Cómo correr el proyecto
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar dependencias.
3. Ejecutar `npm run dev` para el entorno de desarrollo.
4. Para simular el entorno de producción (y ver el SSR real), corre: `npm run build` y luego `npm run start`.

## 🧠 Decisiones Técnicas Tomadas
* **Next.js App Router:** Elegí el App Router en lugar de Pages Router porque adopta los React Server Components por defecto. Esto hace que las páginas sean SSR por naturaleza sin código extra.
* **TypeScript:** Garantiza la integridad de los datos simulados y evita errores en la inyección de metadatos.

## 🌐 Estrategia de Rendering (SSR)
* Las páginas de listado y detalle se renderizan 100% en el servidor. Al desactivar JavaScript en el navegador, el contenido sigue estando totalmente presente en el HTML inicial. Esto garantiza que cualquier web crawler (Googlebot, Bing, etc.) indexe el texto sin esperas.

## 📈 Consideraciones SEO
* **Metadata Dinámica:** Implementé `generateMetadata` para extraer dinámicamente el título y descripción de los artículos simulados, previniendo duplicados de meta tags.
* **Datos Estructurados (JSON-LD):** Inyecté un esquema de tipo `BlogPosting` para facilitarle a Google la comprensión del contenido y aspirar a fragmentos enriquecidos (Rich Snippets).
* **Core Web Vitals:** Se utilizó `next/image` con propiedades de prioridad (`priority`) para las imágenes "Above the Fold" (arriba del pliegue) para proteger el LCP y evitar cambios bruscos de diseño (CLS).

## 🚀 Optimización y Rendimiento (Core Web Vitals)

El proyecto ha sido optimizado para alcanzar métricas de alto rendimiento, logrando un puntaje de **95-100 en todas las categorías de Lighthouse**.

### Estrategias aplicadas:
* **LCP (Largest Contentful Paint):** Optimizado mediante el uso de `priority` y `fetchPriority="high"` en imágenes críticas, junto con la implementación de `preconnect` para el CDN de imágenes.
* **SEO & Metadata:** Implementación de metadatos dinámicos mediante `generateMetadata` y uso de datos estructurados (JSON-LD) para mejorar la indexación.
* **Arquitectura:** Uso de **Next.js 16 Server Components** para minimizar el bundle de JavaScript enviado al cliente.
* **Accesibilidad:** Cumplimiento total de estándares ARIA y contraste de color, logrando un 100/100 constante.

## 💻 Stack Tecnológico
* **Framework:** Next.js 16 (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Métricas:** Lighthouse / Core Web Vitals
* **Métricas:** Rich Results Test - Google Search Console - Home/Detail

## 📊 Resultados Lighthouse (Desktop)
| Categoría      | Puntaje |
| :------------- | :------ |
| Performance    | 95-100  |
| Accessibility  | 100     |
| Best Practices | 100     |
| SEO            | 100     |

## 📊 Resultados Rich Results Test (Google Search Console)
|    Vista    | Elemento               | Resultado |
| :---------- | :--------------------- | :-------- |
| Home        | Carrusel               | Válido    |
| Detail      | Artículo de Noticias   | Válido    |

*Nota: Las variaciones de 2-3 puntos en Performance en entorno local se deben al overhead de hidratación de React y factores del sistema de archivos (Windows Slow Filesystem).*