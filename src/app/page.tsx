import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import articulosData from '@/data/articles.json';
import { Articulo } from '@/types';

export const metadata: Metadata = {
  title: 'Blog de actualidad, economía y política - Artículos Informativos',
  description: 'Encuentra los mejores artículos sobre desarrollo web, Next.js y optimización para motores de búsqueda.',
};

export default function HomePage() {

  const articulos: Articulo[] = articulosData as Articulo[];

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': articulos.map((art, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://blog-informativo-seo.app/articles/${art.slug}`
    }))
  };
  return (
    <main className="max-w-4xl mx-auto p-6">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <h1 className="text-4xl font-bold mb-8">Últimos Artículos</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {articulos.map((articulo) => (
          <article key={articulo.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            <div className="relative w-full aspect-video bg-gray-200">
              <Image 
                src={articulo.image}
                alt={`Miniatura del artículo: ${articulo.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={articulo.id === 1}
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{articulo.title}</h2>
              <p className="text-gray-400 mb-4 text-sm">{articulo.description}</p>
              
              <Link 
                href={`/articles/${articulo.slug}`}
                className="text-blue-400 hover:underline font-medium"
                aria-label={`Leer el artículo completo sobre ${articulo.title}`}
              >
                Leer más →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}