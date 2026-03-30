import { Metadata } from 'next';
import articlesData from '@/data/articles.json';
import { Article } from '@/types';
import { ArticleCard } from './components/ArticleCard';
import { JSX } from 'react';

/**
 * Metadatos estáticos para la página de inicio.
 * Define el título y la descripción base para optimización en motores de búsqueda (SEO).
 */
export const metadata: Metadata = {
  title: 'Blog de actualidad, economía y política - Artículos Informativos',
  description: 'Encuentra los mejores artículos sobre desarrollo web, Next.js y optimización para motores de búsqueda.',
};

/**
 * Componente principal de la página de inicio (HomePage).
 * Se encarga de listar los artículos disponibles y de inyectar los datos 
 * estructurados (JSON-LD) para mejorar el posicionamiento SEO.
 * * @returns {JSX.Element} El layout principal con el listado de artículos.
 */
export default function HomePage(): JSX.Element {

  /**
   * Lista de artículos obtenida desde la fuente de datos local.
   * Se tipa explícitamente para garantizar la integridad de las propiedades.
   */
  const articles: Article[] = articlesData as Article[];

  /**
   * Esquema JSON-LD de tipo ItemList.
   * Proporciona a los buscadores una lista estructurada de los artículos 
   * presentes en la página, permitiendo la generación de carruseles en los resultados.
   */
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': articles.map((art, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://blog-informativo-seo.app/articles/${art.slug}`
    }))
  };
  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Inyección de datos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {/* Encabezado semántico principal */}
      <h1 className="text-4xl font-bold mb-8">Últimos Artículos</h1>
      {/* Contenedor Grid para las tarjetas de artículos.
          Se delega la responsabilidad visual al componente especializado ArticleCard.
      */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}