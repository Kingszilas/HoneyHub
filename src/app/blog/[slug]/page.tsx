// app/blog/[slug]/page.tsx
import { getBlogPosts, BlogPost } from '@/lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import Image from 'next/image';

// Static Site Generation: előre generálja a slug-oldalakat
export async function generateStaticParams() {
  const posts: BlogPost[] = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

interface BlogPostPageProps {
  params: { slug: string };
}

// Rich Text egyedi render, hogy a Contentful formázás pontos legyen
const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: any, children: any) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => (
      <h2 className="text-2xl font-semibold mb-3">{children}</h2>
    ),
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: any) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => <li className="mb-2">{children}</li>,
    [BLOCKS.QUOTE]: (_node: any, children: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">{children}</blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} className="text-blue-600 hover:underline">{children}</a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { url, description } = node.data.target.fields.file;
      return <img src={`https:${url}`} alt={description} className="my-4 rounded-md" />;
    },
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts: BlogPost[] = await getBlogPosts();
  const post = posts.find(p => p.slug === params.slug);

  if (!post || !post.content) {
    return (
      <div className="container mx-auto py-16 text-center text-xl">
        Blog post not found.
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 md:px-0 py-16 max-w-5xl">
      {/* Kép */}
      <div className="relative w-full h-48 md:h-64 mb-6 rounded-lg overflow-hidden shadow-md">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      {/* Csempe tartalom */}
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        {/* Meta adatok */}
        <div className="text-muted-foreground mb-4 flex flex-col md:flex-row md:justify-between text-sm">
          <span>{post.date}</span>
          <span>{post.author}</span>
        </div>

        {/* Cím */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

        {/* Tartalom – itt jön a Rich Text */}
        <div className="prose prose-lg max-w-none">
          {documentToReactComponents(post.content as Document, richTextOptions)}
        </div>
      </div>
    </article>
  );
}
