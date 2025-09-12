import { getBlogPosts, BlogPost } from '@/lib/api';
import BlogList from './bloglist'; // client component

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return <BlogList posts={posts} />;
}
