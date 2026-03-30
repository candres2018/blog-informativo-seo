import { notFound } from 'next/navigation';
import Image from 'next/image';
import articulosData from '@/data/articles.json';
import { Articulo } from '@/types';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
}

function getArticulo(slug: string): Articulo | undefined {
  return (articulosData as Articulo[]).find((art) => art.slug === slug);
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; 
  const articulo = getArticulo(slug);

  if (!articulo) {
    return { title: 'Artículo no encontrado' };
  }

  return {
    title: `${articulo.title} | Mi Blog`,
    description: articulo.description,
    openGraph: {
      title: articulo.title,
      description: articulo.description,
      images: [articulo.image],
    },
  };
}

export default async function ArticuloPage({ params }: PageProps) {
  const { slug } = await params;
  const articulo = getArticulo(slug);

  if (!articulo) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': articulo.title,
    'description': articulo.description,
    'image': articulo.image,
    'datePublished': `${articulo.publishedAt}T08:00:00-05:00`,
    'url': `https://blog-informativo-seo.app/articles/${articulo.slug}`,
    'author': {
      '@type': 'Person',
      'name': 'Carlos Ocaña',
      'url':'https://www.linkedin.com/in/carlos-andr%C3%A9s-oca%C3%B1a-morillo-634273252/'
    },
  };

  return (
    <main className="max-w-3xl mx-auto p-6">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>

        {/* Título del artículo */}
        <h1 className="text-4xl font-bold mb-4">{articulo.title}</h1>
        
        {/* Fecha de publicación del artículo */}
        <p className="text-gray-400 mb-6">
          Publicado el: <time dateTime={articulo.publishedAt}>{articulo.publishedAt}</time>
        </p>

        {/* Imagen referente al artículo */}
        <div className="relative w-full aspect-video bg-gray-200">
          <Image
            src={articulo.image}
            alt={`Imagen representativa de ${articulo.title}`}
            fill
            className="object-cover rounded-lg"
            priority
            fetchPriority="high"
          />
        </div>

        {/* Contenido del artículo */}
        <div className="prose lg:prose-xl max-w-none">
          <p className="text-lg leading-relaxed text-gray-400">
            {articulo.content}
          </p>
        </div>

        <br />

        {/* Volver al listado de artículos */}
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Volver al inicio
        </Link>

      </article>

    </main>
  );
}