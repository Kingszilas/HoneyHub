import { client, BlogPost as ContentfulBlogPost } from './contentful';

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.date'], // legfrissebbek előre
  });

  return entries.items.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    image: `https:${item.fields.image.fields.file.url}`,
    author: item.fields.author,
    date: item.fields.date,
  }));
}
