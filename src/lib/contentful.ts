import { createClient } from 'contentful';
import type { Document as RichTextDocument } from '@contentful/rich-text-types';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: RichTextDocument;
  content: RichTextDocument;
  image: string;
  author: string;
  date: string;
}
