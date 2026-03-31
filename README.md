# 📰 Blog Informativo SEO - Next.js 16

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://blog-informativo-seo.vercel.app)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=for-the-badge&logo=lighthouse&logoColor=white)](#)

Proyecto de alto rendimiento enfocado en **SEO Avanzado** y **Core Web Vitals**, desarrollado bajo estándares de ingeniería para maximizar la visibilidad en motores de búsqueda.

## 🚀 Demo en Vivo
Puedes ver el proyecto desplegado y validar las métricas en tiempo real aquí:
🔗 **[https://blog-informativo-seo.vercel.app](https://blog-informativo-seo.vercel.app)**

---

## 📊 Resultados de Auditoría (Lighthouse en Producción)

El proyecto alcanza el **"Perfect Score" (100/100)** en todas las categorías de Google Lighthouse.

| Categoría         | Puntaje | Estado |
| :--------------   | :-----: | :----: |
| **Performance**   |   100   |   🟢   |
| **Accessibility** |   100   |   🟢   |
| **Best Practices**|   100   |   🟢   |
| **SEO**           |   100   |    🟢  |

---

## 📊 Validación de Datos Enriquecidos (Rich Results Test)

Se ha verificado la correcta implementación de esquemas de **Schema.org** para habilitar funcionalidades avanzadas en las SERPs de Google.

| Vista      | Elemento Validado         | Resultado  |
| :------    | :------------------------ | :--------  |
| **Home**   | `ItemList` (Carrusel)     | ✅ Válido  |
| **Detail** | `BlogPosting` (Noticias)  | ✅ Válido  |

---

## 🛠️ Cómo correr el proyecto localmente
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `npm run dev` para el entorno de desarrollo.
4. Para validar el rendimiento real (SSR), ejecuta: `npm run build` y luego `npm run start`.

## 🧠 Decisiones de Arquitectura

### 1. Pure Server-Side Architecture
Para este proyecto, se optó por una arquitectura **100% basada en React Server Components (RSC)**. 
* **Resultado:** El bundle de JavaScript enviado al cliente es prácticamente inexistente (0 KB de lógica de componentes), lo que garantiza un **FCP (First Contentful Paint)** e **Interactive Time** inmediatos.

### 2. Escalabilidad con Atomic Design
El código está estructurado siguiendo los principios de **Atomic Design**, lo que permite una transición fluida hacia la interactividad. 
* **Preparación para el Futuro:** La arquitectura permite integrar componentes de cliente (`'use client'`) como "islas" de interactividad sin comprometer el renderizado del servidor de las vistas principales.

### 3. SEO Técnico de Nivel Experto
* **Metadata Dinámica:** Implementación de `generateMetadata` con `metadataBase` para asegurar etiquetas canónicas y Open Graph 100% válidas.
* **Datos Estructurados (JSON-LD):** Inyección de esquemas para facilitar la generación de Rich Snippets.
* **Optimización de Imágenes:** Uso de `next/image` con estrategias de `priority` y `fetchPriority` para el manejo crítico del **LCP**.

## 💻 Stack Tecnológico
* **Framework:** Next.js 16.2.1 (App Router)
* **Library:** React 19.2.4
* **Estilos:** Tailwind CSS 4.0
* **Lenguaje:** TypeScript 5.0 (Strict Mode)

---

## 👨‍💻 Autor
**Carlos Andrés Ocaña Morillo** - Systems Engineer
[LinkedIn Profile](https://www.linkedin.com/in/carlos-andr%C3%A9s-oca%C3%B1a-morillo-634273252/)