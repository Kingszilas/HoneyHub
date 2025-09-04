import { blogPosts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">The Hive Blog</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Sweet stories, healthy recipes, and the latest buzz from the world of honey.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} id={post.id.toString()} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="honey blog post"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{post.excerpt}</CardDescription>
                <Button asChild variant="link" className="p-0 text-primary self-start mt-4">
                  <Link href="#">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
