"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { BlogPost } from "@/lib/api";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('blog.title')}</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{typeof post.excerpt === 'string' 
                                                            ? post.excerpt 
                                                            : documentToReactComponents(post.excerpt)}
                </CardDescription>
                <Button asChild variant="link" className="p-0 text-primary self-start mt-4">
                  <Link href={`/blog/${post.slug}`}>{t('blog.readMore')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
