import { JSX } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import articlesData from '@/data/articles.json';
import { Article } from '@/types';

/**
 * Interfaz para las propiedades de la página de detalle.
 * En Next.js 16, params es una Promesa en los componentes de servidor.
 */
interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Función auxiliar para recuperar un artículo por su slug.
 * Simula una consulta a base de datos de forma síncrona sobre el JSON local.
 * 
 * @param {string} slug - El identificador único del artículo.
 * @returns {Article | undefined} El artículo encontrado o undefined.
 */
function getArticle(slug: string): Article | undefined {
  return (articlesData as Article[]).find((art) => art.slug === slug);
}

/**
 * Genera metadatos dinámicos para mejorar el SEO individual de cada artículo.
 * Implementa Open Graph para asegurar que el artículo se vea bien al ser compartido.
 * 
 * @param {PageProps} props - Propiedades que contienen el slug de la ruta.
 * @returns {Promise<Metadata>} Objeto de metadatos procesado por Next.js.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; 
  const article = getArticle(slug);

  if (!article) {
    return { 
      title: 'Artículo no encontrado | Mi Blog',
      description: 'El contenido solicitado no está disponible actualmente.'
    };
  }

  return {
    title: `${article.title} | Mi Blog`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
      type: 'article',
      authors: ['Carlos Ocaña'],
    },
  };
}

/**
 * Vista de detalle del artículo.
 * Utiliza Server-Side Rendering (SSR) para garantizar que el contenido esté 
 * presente en el HTML inicial para los rastreadores de búsqueda.
 * 
 * @param {PageProps} props - Contiene el slug obtenido de la URL dinámica.
 * @returns {Promise<JSX.Element>} El componente de la página de detalle.
 */
export default async function ArticlePage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const article = getArticle(slug);

  // Manejo de error 404 si el slug no coincide con ningún dato
  if (!article) {
    notFound();
  }

  /**
   * Datos estructurados (JSON-LD) para el esquema BlogPosting.
   * Ayuda a Google a entender que este contenido es un artículo de blog 
   * y atribuye la autoría correctamente.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.description,
    'image': article.image,
    'datePublished': `${article.publishedAt}T08:00:00-05:00`,
    'url': `https://blog-informativo-seo.app/articles/${article.slug}`,
    'author': {
      '@type': 'Person',
      'name': 'Carlos Ocaña',
      'url': 'https://www.linkedin.com/in/carlos-andr%C3%A9s-oca%C3%B1a-morillo-634273252/'
    },
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Inyección de Schema.org para Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Encabezado Semántico H1 */}
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        {/* Metadatos visuales del artículo */}
        <p className="text-gray-400 mb-6">
          Publicado el: <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        </p>

        {/* Imagen del artículo con optimización de carga crítica */}
        <div className="relative w-full aspect-video bg-gray-200 mb-8">
          <Image
            src={article.image}
            alt={`Imagen representativa de ${article.title}`}
            fill
            className="object-cover rounded-lg"
            priority // Prioriza la descarga de esta imagen por estar "Above the fold"
            fetchPriority="high"
          />
        </div>

        {/* Cuerpo del artículo con espaciado legible */}
        <div className="prose lg:prose-xl max-w-none mb-10">
          <p className="text-lg leading-relaxed text-gray-300">
            {article.content}
          </p>
        </div>

        {/* Navegación de retorno con estilos de CTA */}
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Volver a la página principal de artículos"
        >
          ← Volver al inicio
        </Link>
      </article>
    </main>
  );
}