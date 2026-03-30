// src/components/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { JSX } from 'react';

/**
 * Propiedades para el componente ArticleCard.
 * Se definen localmente siguiendo el principio de Co-location,
 * ya que solo le pertenecen a este componente visual.
 */
interface ArticleCardProps {
  article: Article;
}

/**
 * Molécula: ArticleCard
 * 
 * Este componente representa una tarjeta informativa para el listado de blogs.
 * Implementa optimizaciones de Next.js para el rendimiento (LCP) y 
 * accesibilidad (Aria-labels) para mejorar el SEO y la experiencia de usuario.
 * 
 * @param {ArticleCardProps} props - Propiedades del componente.
 * @returns {JSX.Element} El componente renderizado de la tarjeta.
 */
export const ArticleCard = ({ article }: ArticleCardProps): JSX.Element => {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Contenedor de Imagen con Aspect Ratio controlado */}
      <div className="relative w-full aspect-video bg-gray-200">
        <Image 
          src={article.image}
          alt={`Miniatura del artículo: ${article.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          // Optimización de LCP: Carga prioritaria solo para el primer elemento visible
          priority={article.id === 1}
          fetchPriority={article.id === 1 ? "high" : "auto"}
        />
      </div>
      {/* Contenido textual del artículo */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-400 mb-4 text-sm line-clamp-2">{article.description}</p>
        {/* Enlace semántico con mejoras de accesibilidad */}
        <Link 
          href={`/articles/${article.slug}`}
          className="text-blue-400 hover:underline font-medium inline-flex items-center"
          aria-label={`Leer el artículo completo sobre ${article.title}`}
        >
          Leer más 
          <span className="ml-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};